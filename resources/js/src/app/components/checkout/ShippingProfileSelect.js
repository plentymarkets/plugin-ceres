var ResourceService = require("services/ResourceService");

Vue.component("shipping-profile-select", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            checkout: {},
            checkoutValidation: {shippingProfile: {}}
        };
    },

    /**
     * Add a shipping provider
     * Initialise the event listener
     */
    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("checkout", this);
        ResourceService.bind("checkoutValidation", this);

        this.checkoutValidation.shippingProfile.validate = this.validate;
    },

    methods: {
        /**
         * Method on shipping profile changed
         */
        onShippingProfileChange: function()
        {
            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(function()
                {
                    document.dispatchEvent(new CustomEvent("afterShippingProfileChanged", {detail: this.checkout.shippingProfileId}));
                }.bind(this));

            this.validate();
        },

        validate: function()
        {
            this.checkoutValidation.shippingProfile.showError = !(this.checkout.shippingProfileId > 0);
        }
    }
});
