var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');
var ModalService          = require('services/ModalService');

Vue.component('basket-item-list', {

    template: '#vue-basket-item-list',

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

        deleteItem       : function(basketItem)
        {
            var self = this;

            ResourceService
                .getResource( 'basketItems' )
                .remove(basketItem );
        },

        calcPrice        : function(basketItem)
        {
            var currency = basketItem.variation.variationRetailPrice.currency;
            var priceSum = basketItem.quantity * basketItem.variation.variationRetailPrice.price;

            return MonetaryFormatService.formatMonetary(priceSum, currency);
        },

        formatRetailPrice: function(basketItem)
        {
            var currency    = basketItem.variation.variationRetailPrice.currency;
            var retailPrice = basketItem.variation.variationRetailPrice.price;

            return MonetaryFormatService.formatMonetary(retailPrice, currency);
        }
    }
});
