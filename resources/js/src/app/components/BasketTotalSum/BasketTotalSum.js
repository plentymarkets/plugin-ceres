var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('basket-total-sum', {

    props: [
        "basketData",
        "showFull"
    ],

    template: '#vue-basket-total-sum',

    data: function()
    {
        return {
            basket: {}
        };
    },

    ready: function()
    {
      ResourceService.bind( "basket", this );
    },

    methods: {
        formatPrice: function(price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
        }
    }

});
