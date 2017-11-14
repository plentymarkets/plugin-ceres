Vue.component("payment-provider-select", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    computed: Vuex.mapState({
        methodOfPaymentList: state => state.checkout.payment.methodOfPaymentList,
        methodOfPaymentId: state => state.checkout.payment.methodOfPaymentId,
        showError: state => state.checkout.validation.paymentProvider.showError,
        isBasketLoading: state => state.basket.isBasketLoading
    }),

    /**
     * Initialise the event listener
     */
    created()
    {
        this.$options.template = this.template;
        this.$store.commit("setPaymentProviderValidator", this.validate);
    },

    methods: {
        /**
         * Event when changing the payment provider
         */
        onPaymentProviderChange(newMethodOfPayment)
        {
            this.$store.dispatch("selectMethodOfPayment", newMethodOfPayment.id)
                .then(data =>
                {
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
