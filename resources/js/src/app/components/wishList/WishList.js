const ResourceService = require("services/ResourceService");
const ApiService = require("services/ApiService");

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
        removeWishListItem(variationId)
        {
            ApiService.delete("/rest/io/itemWishList/" + this.variationId);
            // TODO handle done and error
        }
    }
});
