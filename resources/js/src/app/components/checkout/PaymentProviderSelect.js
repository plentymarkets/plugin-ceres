var ApiService = require("services/ApiService");
var CheckoutService = require("services/CheckoutService");

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
            CheckoutService.setMethodOfPaymentId(this.selectedPaymentProvider);
        },

        /**
         * Add the event listener
         */
        addEventListener: function()
        {
            ApiService.listen(
                "eventName",
                function(paymentProviderList)
                {
                    this.paymentProviderList = paymentProviderList;
                }.bind(this));
        }
    }
});
