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
            waiting: false,
            deleteConfirmed: false,
            deleteConfirmedTimeout: null
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

        deleteItem: function()
        {
            var self = this;
            if( !this.deleteConfirmed )
            {
                this.deleteConfirmed = true;
                this.deleteConfirmedTimeout = window.setTimeout(
                    function()
                    {
                        self.resetDelete();
                    },
                    5000
                );
            }
            else
            {
                this.waiting = true;
                ResourceService
                    .getResource( "basketItems" )
                    .remove( this.basketItem.id )
                    .done( function() {
                        self.resetDelete();
                    });
            }
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
        },

        resetDelete: function()
        {
            this.deleteConfirmed = false;
            if( !!this.deleteConfirmedTimeout )
            {
                window.clearTimeout( this.deleteConfirmedTimeout );
            }
        }
    }
});
