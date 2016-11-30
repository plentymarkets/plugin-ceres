var ResourceService = require("services/ResourceService");

Vue.component("payment-provider-select", {

    template: "#vue-payment-provider-select",

    data: function()
    {
        return {
            checkout: {},
            waiting: false
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
            this.waiting = true;

            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(
                    function()
                    {
                        this.waiting = false;
                    }.bind(this));
        }
    }
});
