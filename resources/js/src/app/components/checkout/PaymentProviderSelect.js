var APIService = require("services/APIService");

Vue.component("payment-provider-select", {

    template: "#vue-payment-provider-select",

    props: ["paymentProviderList"],

    data: function()
    {
        return {
            selectedPaymentProvider: {}
        };
    },

    /**
     * init event listener
     */
    created: function()
    {
        this.addEventListener();
    },

    methods: {
        /**
         * event on payment provider change
         * TODO
         */
        onPaymentProviderChange: function()
        {
            CheckoutService.setMethodOfPaymentId(this.selectedPaymentProvider);
        },

        /**
         * add event listener
         */
        addEventListener: function()
        {
            // listen on APIService events and handle new data
        }
    }
});
