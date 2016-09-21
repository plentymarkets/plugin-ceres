var BasketService         = require('services/BasketService');
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('basket-total-sum', {

    props: [
        "basketData",
        "showFull"
    ],

    activate: function(done)
    {
        var self = this;
        BasketService.watch(function(data)
        {
            self.$set('basket', data.basket);
        });
        BasketService.init(this.basketData).done(function()
        {
            done();
        });
    },

    template: '#vue-basket-total-sum',

    data: function()
    {
        return {
            basket: {}
        };
    },

    methods: {
        formatPrice: function(price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
        }
    }

});
