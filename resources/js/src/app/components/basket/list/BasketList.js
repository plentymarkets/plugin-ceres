var ResourceService       = require("services/ResourceService");

Vue.component("basket-list", {

    props: [
        "size",
        "template",
        "triggerEvent"
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

        if (this.triggerEvent)
        {
            ResourceService.watch("basket", function(newValue, oldValue)
            {
                if (oldValue)
                {
                    if (JSON.stringify(newValue) != JSON.stringify(oldValue))
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketChanged", {detail: newValue}));
                    }
                }
            });
        }
    }
});
