var BasketService         = require('services/BasketService');
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('basket-button', {

    activate: function(done)
    {
        var self = this;
        BasketService.watch(function(data)
        {
            self.$set('basket', data.basket);
        });
        BasketService.init(jQuery.parseJSON(this.basketData))
            .done(function()
            {
                done();
            });
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
