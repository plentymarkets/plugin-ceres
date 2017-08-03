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

        this.getWishListItems();
    },

    methods:
    {
        removeFromList(basketItem, index)
        {
            this.basketItems.splice(index, 1);
        },
        
        removeWishListItem(variationId)
        {
            ApiService.delete("/rest/io/itemWishList/" + variationId);
            // TODO handle done and error
        },

        getWishListItems()
        {
            ApiService.get("/rest/io/variations/", {variationIds: this.wishListIds, template: "Ceres::WishList.WishList"});
        }
    }
});
