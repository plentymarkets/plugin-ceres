var ResourceService = require("services/ResourceService");

Vue.component("shipping-profile-select", {

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
     * Add a shipping provider
     * Initialise the event listener
     */
    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("checkout", this);
    },

    methods: {
        /**
         * Method on shipping profile changed
         */
        onShippingProfileChange: function()
        {
            ResourceService.getResource("checkout").set(this.checkout);
        }
    }
});
