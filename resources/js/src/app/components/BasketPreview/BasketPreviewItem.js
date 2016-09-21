var BasketService         = require('services/BasketService');
var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');
var ModalService          = require('services/ModalService');

Vue.component('basket-preview-item', {

    template: '#vue-basket-preview-item',

    props: [
        "baseUrl"
    ],

    data: function()
    {
        return {
            basket     : {},
            basketItems: []
        };
    },

    ready: function()
    {
        ResourceService.bind( "basket", this );
        ResourceService.bind( "basketItems", this );
    },

    methods: {
        calcPrice: function(basketItem)
        {
            var currency = basketItem.variation.variationRetailPrice.currency;
            var price    = basketItem.quantity * basketItem.variation.variationRetailPrice.price;

            return MonetaryFormatService.formatMonetary(price, currency);
        },

        getBasePrice: function(basketItem)
        {
            var currency = basketItem.variation.variationRetailPrice.currency;
            var price    = basketItem.variation.variationRetailPrice.basePrice;

            return MonetaryFormatService.formatMonetary(price, currency);
        },

        deleteItem: function(basketItem, event)
        {
            var _self = this;

            if ($(event.currentTarget).hasClass('btn-link'))
            {
                this.toggleDeleteBtnClass(event.currentTarget);
                $(event.currentTarget).find('.message').text('Jetzt löschen');
            }
            else
            {
                $('.previewItem-' + basketItem.variationId).toggleClass('wait');

                BasketService.deleteBasketItem(basketItem);
            }
        },

        toggleDeleteBtnClass: function(element)
        {
            $(element).toggleClass('btn-link');
            $(element).toggleClass('btn-danger');
        },

        getImage: function(variationId)
        {
            var path = '';

            // TODO: check for occurences
            //for (var i = 0; i < this.items[variationId].variationImageList.length; i++)
            //{
            //    if (this.items[variationId].variationImageList[i].path !== '')
            //    {
            //        path = this.items[variationId].variationImageList[i].path;
            //    }
            //}
            return this.baseUrl + "/" + path;
        },

        updateBasketItemQuantity: function(basketItem, value)
        {
            var _self = this;

            if (basketItem.quantity > 1 || value == 1)
            {
                basketItem.quantity = basketItem.quantity + value;
                $(this.$el.nextElementSibling).toggleClass('wait');

                BasketService.updateBasketItem(basketItem)
                    .done(function()
                    {
                        $(_self.$el.nextElementSibling).toggleClass('wait');
                    });
            }
        },

        checkName: function(variationId, name)
        {
            // TODO: check for occurences
            //if (name !== '')
            //{
            //    return name + " " + this.items[variationId].variationBase.variationName;
            //}
            //return this.items[variationId].itemDescription.name1 + " " + this.items[variationId].variationBase.variationName;
            return "";
        },

        setLinkToItem: function(variationId)
        {
            // TODO: check for occurences
            //var urlContent = this.items[variationId].itemDescription.urlContent.split("/");
            //var i          = urlContent.length - 1;
            //
            //return "/" + urlContent[i] + "/" + this.items[variationId].itemBase.id + "/" + this.items[variationId].variationBase.id;
        }
    }
});
