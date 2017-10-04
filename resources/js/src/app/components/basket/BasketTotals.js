var ResourceService = require("services/ResourceService");

Vue.component("basket-totals", {

    props: [
        "config",
        "template"
    ],

    data: function()
    {
        return {
            basket: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Bind to basket
     */
    ready: function()
    {
        ResourceService.bind("basket", this);
    },

    methods:
    {
        /**
         * TODO
         * @param name
         * @returns {boolean}
         */
        showProperty: function(name)
        {
            return !this.config || this.config.indexOf(name) >= 0 || this.config.indexOf("all") >= 0;
        }
    }
});
