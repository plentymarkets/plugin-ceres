var ResourceService = require("services/ResourceService");

Vue.component("payment-provider-select", {

    props: [
        "template"
    ],

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
        this.$options.template = this.template;

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
