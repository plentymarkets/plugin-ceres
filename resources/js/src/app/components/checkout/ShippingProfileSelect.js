var ResourceService = require("services/ResourceService");

Vue.component("shipping-profile-select", {

    template: "#vue-shipping-profile-select",

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
