var ResourceService = require("services/ResourceService");

Vue.component("payment-provider-select", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            checkout: {},
            checkoutValidation: {paymentProvider: {}}
        };
    },

    /**
     * Initialise the event listener
     */
    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("checkout", this);
        ResourceService.bind("checkoutValidation", this);

        this.checkoutValidation.paymentProvider.validate = this.validate;
    },

    methods: {
        /**
         * Event when changing the payment provider
         */
        onPaymentProviderChange: function()
        {
            ResourceService.getResource("checkout").set(this.checkout);

            this.validate();
        },

        validate: function()
        {
            this.checkoutValidation.paymentProvider.showError = !(this.checkout.methodOfPaymentId > 0);
        }
    }
});
