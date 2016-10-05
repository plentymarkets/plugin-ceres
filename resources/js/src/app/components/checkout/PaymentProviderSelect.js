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
     * Initialise the event listener
     */
    created: function()
    {
        this.addEventListener();
    },

    methods: {
        /**
         * Event when changing the payment provider
         * TODO
         */
        onPaymentProviderChange: function()
        {
            APIService.put("/rest/payment_method/" + this.selectedPaymentProvider);
        },

        /**
         * Format the price
         * @param price
         * @param currency
         * @returns {*}
         */
        formatPrice: function(price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
        },

        /**
         * Add the event listener
         */
        addEventListener: function()
        {
            // Listen for ApiService events and handle new data
        }
    }
});
