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
            APIService.put("/rest/payment_method/" + this.selectedPaymentProvider);
        },

        /**
         * format the price
         * @param price
         * @param currency
         * @returns {*}
         */
        formatPrice: function(price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
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
