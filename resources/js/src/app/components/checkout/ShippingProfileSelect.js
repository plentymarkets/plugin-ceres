var ResourceService = require("services/ResourceService");

Vue.component("shipping-profile-select", {

    template: "#vue-shipping-profile-select",

    props: [
        "template"
    ],

    data: function()
    {
        return {
            checkout: {},
            waiting: false
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
            this.waiting = true;

            ResourceService
                .getResource("checkout").set(this.checkout)
                .done(
                    function()
                    {
                        this.waiting = false;
                    }.bind(this));
        }
    }
});
