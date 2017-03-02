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

        this.initDefaultPaymentProvider();
    },

    methods: {
        /**
         * Event when changing the payment provider
         */
        onPaymentProviderChange: function()
        {
            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(function()
                {
                    document.dispatchEvent(new CustomEvent("afterPaymentMethodChanged", {detail: this.checkout.methodOfPaymentId}));
                }.bind(this));

            this.validate();
        },

        validate: function()
        {
            this.checkoutValidation.paymentProvider.showError = !(this.checkout.methodOfPaymentId > 0);
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
