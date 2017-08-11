import ApiService from "services/ApiService";

const state =
    {
        wishListIds: [],
        wishListItems: []
    };

const mutations =
    {
        setWishListItems(state, wishListItems)
        {
            state.wishListItems = wishListItems;
        },

        setWishListIds(state, wishListIds)
        {
            state.wishListIds = wishListIds;
        },

        removeWishListItem(state, wishListItem)
        {
            if (state.wishListItem.indexOf(wishListItem) >= 0)
                state.wishListItem.splice(state.wishListItem.indexOf(wishListItem), 1);

            if (state.wishListIds.indexOf(wishListItem.data.variation.id) >= 0)
                state.wishListIds.splice(state.wishListIds.indexOf(wishListItem.data.variation.id), 1);
        }
    };

const actions =
    {
        initWishListItems({commit}, ids)
        {
            commit("setWishListIds", ids);

            ApiService.get("/rest/io/variations/", {variationIds: ids, template: "Ceres::WishList.WishList"})
                .done(data =>
                {
                    commit("setWishListItems", data.documents);
                })
                .fail(() =>
                {
                });
        },

        removeWishListItem({commit}, wishListItem)
        {
            ApiService.delete("/rest/io/itemWishList/" + id)
                .done(data =>
                {
                    // remove this in done to prevent no items in this list label to be shown
                    commit("removeWishListItem", wishListItem);
                })
                .fail(error =>
                {
                    // this.wishListItems.splice(index, 0, wishListItem);
                });
        }
    };

const getters =
    {
        wishListCount: state => state.wishListItems.length
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
