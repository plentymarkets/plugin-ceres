var BasketService         = require('services/BasketService');
var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('basket-button', {

    ready: function()
    {
        ResourceService.bind( "basket", this );
    },

    template: '#vue-basket-button',

    props: [
        "basketData"
    ],

    data: function()
    {
        return {
            basket: {}
        };
    },

    computed: {
        basketItemSum: function()
        {
            return MonetaryFormatService.formatMonetary(this.basket.itemSum, "EUR");
        }
    }

});
