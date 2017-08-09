const ResourceService       = require("services/ResourceService");

Vue.component("basket-preview", {

    props: [
        "template"
    ],

    data()
    {
        return {
            basket: {},
            basketItems: []
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    /**
     * Bind to basket and bind the basket items
     */
    ready()
    {
        ResourceService.bind("basket", this);
        ResourceService.bind("basketItems", this);
    }
});
