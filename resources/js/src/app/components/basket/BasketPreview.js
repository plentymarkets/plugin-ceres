var ResourceService       = require("services/ResourceService");

Vue.component("basket-preview", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            basket: {},
            basketItems: []
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Bind to basket and bind the basket items
     */
    mounted: function()
    {
        this.$nextTick(() =>
        {
            ResourceService.bind("basket", this);
            ResourceService.bind("basketItems", this);
        });
    }
});
