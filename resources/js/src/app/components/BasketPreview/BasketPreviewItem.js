var BasketService         = require('services/BasketService');
var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');
var ModalService          = require('services/ModalService');

Vue.component('basket-preview-item', {

    template: '#vue-basket-preview-item',

    props: [
        "basketItem"
    ],

    data: function()
    {
        return {
            waiting: false
        };
    },

    methods: {
        // TODO replace by monetary-filter
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

        deleteItem: function(basketItem)
        {
          this.waiting = true;
          var self = this;

          ResourceService
              .getResource( 'basketItems' )
              .remove(basketItem );
        },

        toggleDeleteBtnClass: function(element)
        {
            $(element).toggleClass('btn-link');
            $(element).toggleClass('btn-danger');
        },

        updateQuantity: function( quantity )
        {
            this.basketItem.quantity = quantity;
            this.waiting = true;
            var self = this;

            ResourceService
                .getResource( 'basketItems' )
                .set( this.basketItem.id, this.basketItem )
                .done( function() {
                    self.waiting = false;
                });
        }
    }
});
