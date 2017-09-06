Vue.component("shipping-profile-select", {

    props: [
        "template"
    ],

    computed: Vuex.mapState({
        shippingProfileList: state => state.checkout.shipping.shippingProfileList,
        shippingProfileId: state => state.checkout.shipping.shippingProfileId,
        showError: state => state.checkout.validation.shippingProfile.showError
    }),

    /**
     * Add a shipping provider
     * Initialise the event listener
     */
    created: function()
    {
        this.$options.template = this.template;
        this.$store.commit("setShippingProfileValidator", this.validate);
    },

    methods: {
        /**
         * Method on shipping profile changed
         */
        onShippingProfileChange: function()
        {
            this.$store.dispatch("selectShippingProfile", this.shippingProfileList.find(shippingProfile => shippingProfile.parcelServiceId === shippingProfileId))
                .then(data =>
                {
                    // TODO handle new chekcout object
                    document.dispatchEvent(new CustomEvent("afterShippingProfileChanged", {detail: this.shippingProfileId}));
                },
                error =>
                {
                    console.log("error");
                });

            this.validate();
        },

        validate: function()
        {
            this.$store.commit("setShippingProfileShowError", !(this.shippingProfileId > 0));
        }
    }
});
