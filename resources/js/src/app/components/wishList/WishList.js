const ApiService = require("services/ApiService");

Vue.component("wish-list", {

    props: [
        "template",
        "wishListIds"
    ],

    data()
    {
        return {
            wishListItems: []
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        this.getWishListItems();
    },

    methods:
    {
        removeFromList(index)
        {
            this.wishListItems.splice(index, 1);
            this.wishListIds.splice(index, 1);
        },

        removeWishListItem(variationId)
        {
            ApiService.delete("/rest/io/itemWishList/" + variationId);
            // TODO handle done and error
        },

        getWishListItems()
        {
            ApiService.get("/rest/io/variations/", {variationIds: this.wishListIds, template: "Ceres::WishList.WishList"})
                .done(data =>
                {
                    this.wishListItems = data.documents;
                });
        }
    }
});
