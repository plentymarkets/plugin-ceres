Vue.component("payment-provider-select", {

    props: [
        "template"
    ],

    computed: Vuex.mapState({
        methodOfPaymentList: state => state.checkout.payment.methodOfPaymentList,
        methodOfPaymentId: state => state.checkout.payment.methodOfPaymentId,
        showError: state => state.checkout.validation.paymentProvider.showError
    }),

    /**
     * Initialise the event listener
     */
    created()
    {
        this.$options.template = this.template;
        this.$store.commit("setPaymentProviderValidator", this.validate);
    },

    watch:
    {
        // checkout()
        // {
            //  TODO take care in vuex?

            // let paymentExist = false;

            // for (const i in this.checkout.paymentDataList)
            // {
            //     if (this.checkout.paymentDataList[i].id === this.checkout.methodOfPaymentId)
            //     {
            //         paymentExist = true;
            //     }
            // }

            // if (!paymentExist)
            // {
            //     this.checkout.methodOfPaymentId = 0;
            //     this.initDefaultPaymentProvider();
            // }
        // }
    },

    methods: {
        /**
         * Event when changing the payment provider
         */
        onPaymentProviderChange(newMethodOfPayment)
        {
            this.$store.dispatch("selectMethodOfPayment", this.methodOfPaymentList.find(methodOfPayment => methodOfPayment.id === newMethodOfPayment.id))
                .then(data =>
                {
                    // TODO handle new chekcout object
                    document.dispatchEvent(new CustomEvent("afterPaymentMethodChanged", {detail: this.methodOfPaymentId}));
                },
                error =>
                {
                    console.log("error");
                });

            this.validate();
        },

        validate()
        {
            this.$store.commit("setPaymentProviderShowError", !(this.methodOfPaymentId > 0));
        }
    }
});
