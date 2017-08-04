const ApiService = require("services/ApiService");

Vue.component("wish-list", {

    props: [
        "template",
        "wishListIds"
    ],

    data()
    {
        return {
            wishListItems: [],
            isLoading: false
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
        removeWishListItem(wishListItem, index)
        {
            ApiService.delete("/rest/io/itemWishList/" + wishListItem.data.variation.id)
                .done(data =>
                {
                    // remove this in done to prevent no items in this list label to be shown
                    this.wishListIds.splice(this.wishListIds.indexOf(wishListItem.data.variation.id), 1);
                })
                .fail(error =>
                {
                    this.wishListItems.splice(index, 0, wishListItem);
                });

            this.wishListItems.splice(index, 1);
        },

        getWishListItems()
        {
            if (this.wishListIds[0])
            {
                this.isLoading = true;

                ApiService.get("/rest/io/variations/", {variationIds: this.wishListIds, template: "Ceres::WishList.WishList"})
                    .done(data =>
                    {
                        this.wishListItems = data.documents;

                        this.isLoading = false;
                    })
                    .fail(() =>
                    {
                        this.isLoading = false;
                    });
            }
        }
    }
});
