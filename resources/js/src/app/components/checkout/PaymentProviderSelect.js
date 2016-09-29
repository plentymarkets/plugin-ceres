var APIService            = require('services/APIService');
var CheckoutService = require('services/CheckoutService')

Vue.component('payment-provider-select', {

        template: '#vue-payment-provider-select',

        props: ['paymentProviderList'],

        data: function()
        {
            return {
                selectedPaymentProvider: {}
            };
        },

        created: function()
        {
            this.addEventListener();
        },

        methods: {
            onPaymentProviderChange: function()
            {
                CheckoutService.setMethodOfPaymentId(this.selectedPaymentProvider);
            },

            addEventListener: function()
            {
                //listen on APIService events and handle new data
            }
        }
    });
