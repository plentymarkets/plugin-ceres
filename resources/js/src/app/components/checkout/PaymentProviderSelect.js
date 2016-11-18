var ResourceService = require("services/ResourceService");

Vue.component("payment-provider-select", {

    template: "#vue-payment-provider-select",

    data: function()
    {
        return {
            checkout: {}
        };
    },

    /**
     * Initialise the event listener
     */
    created: function()
    {
        ResourceService.bind("checkout", this);
    },

    methods: {
        /**
         * Event when changing the payment provider
         */
        onPaymentProviderChange: function()
        {
            ResourceService.getResource("checkout").set(this.checkout);
        }
    }
});
