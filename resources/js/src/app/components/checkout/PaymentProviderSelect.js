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

        this.initDefaultPaymentProvider();
    },

    methods: {
        /**
         * Event when changing the payment provider
         */
        onPaymentProviderChange: function()
        {
            ResourceService.getResource("checkout").set(this.checkout);
        },

        initDefaultPaymentProvider: function()
        {
            // todo get entry from config | select first payment provider
            if (this.checkout.methodOfPaymentId == 0 && this.checkout.paymentDataList.length > 0)
            {
                this.checkout.methodOfPaymentId = this.checkout.paymentDataList[0].id;

                ResourceService.getResource("checkout").set(this.checkout);
            }
        }
    }
});
