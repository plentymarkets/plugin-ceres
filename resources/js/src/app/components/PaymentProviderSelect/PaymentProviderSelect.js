var MonetaryFormatService = require('services/MonetaryFormatService');
var APIService = require('services/APIService');

Vue.component('payment-provider-select',
{
    template: '#vue-payment-provider-select',

    props: ['paymentProviderList'],

    data: function () {
        return {
            selectedPaymentProvider: {}
        }
    },

    created: function ()
    {
        this.addEventListener();
    },

    methods:
    {
        onPaymentProviderChange: function()
        {
            APIService.put("/rest/payment_method/" + this.selectedPaymentProvider);
        },

        formatPrice: function (price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
        },

        addEventListener: function ()
        {
            //listen on APIService events and handle new data
        }
    }
});
