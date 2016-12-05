var ResourceService = require("services/ResourceService");

Vue.component("basket-totals", {

    template: "#vue-basket-totals",

    props: [
        "config"
    ],

    data: function()
    {
        return {
            basket: {}
        };
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
