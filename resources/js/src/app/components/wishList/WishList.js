const ResourceService = require("services/ResourceService");

Vue.component("wish-list", {

    props: [
        "template",
        "wishListIds"
    ],

    data()
    {
        return {
            basketItems: []
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        ResourceService.bind("basketItems", this);
    },

    methods:
    {
        removeFromList(basketItem, index)
        {
            this.basketItems.splice(index, 1);
        }
    }
});
