var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');
var ModalService          = require('services/ModalService');

Vue.component('basket-preview', {

    template: '#vue-basket-preview',

    props: [
        "basketData",
        "baseUrl"
    ],

    data: function()
    {
        return {
            basket: {},
            basketItems: []
        };
    },
    
    ready: function()
    {
        ResourceService.bind( "basket", this );
        ResourceService.bind( "basketItems", this );
    },

    computed:
    {
        itemTotalSum: function ()
        {
            return MonetaryFormatService.formatMonetary(this.basket.itemSum, "EUR");
        },
        basketTotalSum: function ()
        {
            return MonetaryFormatService.formatMonetary(this.basket.basketAmount, "EUR");
        },
        shippingTotalSum: function ()
        {
            return MonetaryFormatService.formatMonetary(this.basket.shippingAmount, "EUR");
        }
    },

    methods:
    {

    }
});
