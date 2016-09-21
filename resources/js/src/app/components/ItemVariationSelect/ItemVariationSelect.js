var ApiService          = require('services/ApiService');
var NotificationService = require('services/NotificationService');
var HTMLCache           = require('services/VariationsHTMLCacheService');
var BasketService       = require('services/BasketService');

/**
 * possible preselection values:
 * undefined || false
 * true
 * variantID
 */


/**
*
*   CURRENTLY NOT IN USE!!!
*   NEEDS RECOGNITION OF UNIT-COMBINATION-ID
*
*/


Vue.component('item-variation-select', {

    template: '#vue-item-variation-select',

    props   : [
        "itemId",
        "preselection",
        "itemIsInBasket"
    ],

    data    : function()
    {
        return {
            variationAttributes     : {},
            variantionSelectionModel: [],
            oldAttributeValueList   : [],
            basketItems             : [],
            attributeNames          : []
        };
    },

    created : function()
    {
        this.oldVariationId = this.preselection;
        this.loadVariationAttributes();
        this.variations = {};
        this.initWindowEventHandling();
    },

    activate: function(done)
    {
        var self = this;
        BasketService.watch(function(data)
        {
            self.$set('basketItems', data.basketItems);
        });
        BasketService.init().done(function()
        {
            done();
        });
    },

    methods : {
        loadVariationAttributes: function()
        {
            var self = this;
            // request item variations
            ApiService.get("/rest/item_variation_select/" + this.itemId)
                .done(function(response)
                {
                    // catch possible empty response
                    if (!response
                        || (response && response.data === null)
                        || (response && response["selectionValues"].length === 0))
                    {
                        return;
                    }
                    self.variationAttributes = response["selectionValues"];
                    self.variations          = response["variations"];
                    self.attributeNames      = response["attributeNames"];

                    var attributes          = Object.keys(self.variationAttributes);
                    var setOnInitialization = {};

                    // where the magic begins
                    if (!self.preselection)
                    {
                        return;
                    }
                    else
                    {
                        // if preselection is true, select first entries for all attributes
                        if (typeof self.preselection === 'boolean')
                        {
                            for (var attribute in self.variationAttributes)
                            {
                                self.variantionSelectionModel.push({
                                    attributeId     : attribute,
                                    attributeValueId: Object.keys(self.variationAttributes[attribute])[0]
                                });
                            }
                        }
                        else
                        {
                            // if preselection not found or there are no variations, initialize select element with
                            // "please take a choice" option
                            if (!self.variations[self.preselection] || self.variations[self.preselection].length <= 0)
                            {
                                self.preselection = false;
                                return;
                            }

                            var variationPreselected = self.variations[self.preselection];
                            // individual selection via variation ID. Searching for values.
                            for (var i = 0, leng = variationPreselected.length; i < leng; i++)
                            {
                                while (self.variantionSelectionModel.length !== leng)
                                {
                                    self.variantionSelectionModel.push({attributeId: null, attributeValueId: null});
                                }
                                // toString() is needed to initialize select element model. Doesn't work with integer.
                                self.variantionSelectionModel[i].attributeId      = variationPreselected[i].attributeId.toString();
                                self.variantionSelectionModel[i].attributeValueId = variationPreselected[i].attributeValueId.toString();
                            }
                        }

                    }

                }).fail(function(error)
            {
                console.warn(error);
                return false;
            });
        },
        matchVariation         : function(currentSelection)
        {
            var hits = 0;
            var currentVariation;
            for (var variationID in this.variations)
            { // iterate all variations
                currentVariation = this.variations[variationID];
                for (var i = 0, leng = currentVariation.length; i < leng; i++)
                {
                    /*
                     Increase "hit" with "variationID", if fitting attribute was found.
                     The amount of this addition divided by length of current variation acn match a variation ID.
                     */
                    if (currentVariation[i].attributeId === currentSelection[i].attributeId
                        && currentVariation[i].attributeValueId === currentSelection[i].attributeValueId)
                    {
                        hits += parseInt(variationID);
                    }
                }
                hits = (hits / leng);
                /*
                 if "hit", divided by length of attributes of one variation, matches the current variation ID,
                 we found our variation
                 */
                if (hits === parseInt(variationID))
                {
                    break;
                }
                else
                {
                    hits = 0;
                }
            }
            return hits;
        },
        onSelectChange         : function()
        {
            var self                = this;
            var convertedAttributes = [];
            // convert attribute values to integer
            for (var attr in this.variantionSelectionModel)
            {
                if (self.variantionSelectionModel[attr] === "-1")
                {
                    return;
                }

                convertedAttributes.push({
                    attributeId     : parseInt(this.variantionSelectionModel[attr].attributeId),
                    attributeValueId: parseInt(this.variantionSelectionModel[attr].attributeValueId)
                });
            }
            var matchingVariationId = this.matchVariation(convertedAttributes);

            if (matchingVariationId > 0)
            {
                if (this.itemIsInBasket)
                {
                    var currentBasketItem;

                    for (var i = 0, len = this.basketItems.length; i < len; i++)
                    {
                        if (this.oldVariationId === this.basketItems[i].variationId)
                        {
                            currentBasketItem = this.basketItems[i];
                        }
                    }

                    if (currentBasketItem)
                    {
                        BasketService.updateBasketItem(
                            {
                                id         : currentBasketItem.id,
                                variationId: matchingVariationId,
                                quantity   : currentBasketItem.quantity
                            });
                    }
                }
                else
                {
                    window.history.replaceState({id: this.oldVariationId, itemId: this.itemId, reload: "true"}, "testitem", "/test/" + this.itemId + "/" + this.oldVariationId);
                    window.history.pushState({id: matchingVariationId, itemId: this.itemId, reload: "true"}, "testitem", "/test/" + this.itemId + "/" + matchingVariationId);

                    this.loadVariation(this.itemId, matchingVariationId)
                }
            }
        },

        loadVariation: function(itemId, variationId)
        {
            // var cachedHTML = HTMLCache.getFromCache(itemId, variationId);
            //
            // if(cachedHTML === undefined)
            // {
            var success =
                    function(response)
                    {
                        var found = $(response).find("#page-body");
                        $("#page-body").html(found);
                        new Vue({el: 'body'});

                        HTMLCache.addToCache(itemId, variationId, found);
                    };

            jQuery.get("/test/" + itemId + "/" + variationId, "", success, "html");
            // }
            // else
            // {
            //     $("#page-body").html(cachedHTML);
            //     new Vue({el: 'body'});
            // }
        }
    }
});
