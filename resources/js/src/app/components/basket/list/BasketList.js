var ResourceService       = require("services/ResourceService");

Vue.component("basket-list", {

    props: [
        "size",
        "template"
    ],

    data: function()
    {
        return {
            basketItems: []
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Bind to basket and show the items in a small or large list
     */
    ready: function()
    {
        ResourceService.bind("basketItems", this);
        this.size = this.size || "large";

        if (this.size === "small")
        {
            ResourceService.watch("basket", function(newValue)
            {
                document.dispatchEvent(new CustomEvent("afterBasketChanged", {detail: newValue}));
            });
        }
    }
});
