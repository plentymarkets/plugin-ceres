Vue.component("shipping-profile-select", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    computed: Vuex.mapState({
        shippingProfileList: state => state.checkout.shipping.shippingProfileList,
        shippingProfileId: state => state.checkout.shipping.shippingProfileId,
        showError: state => state.checkout.validation.shippingProfile.showError,
        isBasketLoading: state => state.basket.isBasketLoading
    }),

    /**
     * Add a shipping provider
     * Initialise the event listener
     */
    created()
    {
        this.$options.template = this.template;
        this.$store.commit("setShippingProfileValidator", this.validate);
    },

    methods: {
        /**
         * Method on shipping profile changed
         */
        onShippingProfileChange(shippingProfileId)
        {
            this.$store.dispatch("selectShippingProfile", this.shippingProfileList.find(shippingProfile => shippingProfile.parcelServicePresetId === shippingProfileId))
                .then(data =>
                {
                    document.dispatchEvent(new CustomEvent("afterShippingProfileChanged", {detail: this.shippingProfileId}));
                },
                error =>
                {
                    console.log("error");
                });

            this.validate();
        },

        validate()
        {
            this.$store.commit("setShippingProfileShowError", !(this.shippingProfileId > 0));
        }
    }
});
