const ResourceService = require("services/ResourceService");

Vue.component("payment-provider-select", {

    props: [
        "template"
    ],

    data()
    {
        return {
            checkout: {},
            checkoutValidation: {paymentProvider: {}}
        };
    },

    /**
     * Initialise the event listener
     */
    created()
    {
        this.$options.template = this.template;

        ResourceService.bind("checkout", this);
        ResourceService.bind("checkoutValidation", this);

        this.checkoutValidation.paymentProvider.validate = this.validate;

        this.initDefaultPaymentProvider();
    },

    watch:
    {
        checkout()
        {
            let paymentExist = false;

            for (const i in this.checkout.paymentDataList)
            {
                if (this.checkout.paymentDataList[i].id === this.checkout.methodOfPaymentId)
                {
                    paymentExist = true;
                }
            }

            if (!paymentExist)
            {
                this.checkout.methodOfPaymentId = 0;
                this.initDefaultPaymentProvider();
            }
        }
    },

    methods: {
        /**
         * Event when changing the payment provider
         */
        onPaymentProviderChange()
        {
            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(() =>
                {
                    document.dispatchEvent(new CustomEvent("afterPaymentMethodChanged", {detail: this.checkout.methodOfPaymentId}));
                });

            this.validate();
        },

        validate()
        {
            this.checkoutValidation.paymentProvider.showError = !(this.checkout.methodOfPaymentId > 0);
        },

        initDefaultPaymentProvider()
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
