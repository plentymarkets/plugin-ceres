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

        sliceWishListItem(state, index, wishListItem)
        {

        },

        removeWishListItem(state, wishListItem)
        {
            if (state.wishListItem.indexOf(wishListItem) >= 0)
                state.wishListItem.splice(state.wishListItem.indexOf(wishListItem), 1);
        },

        removeWishListId(state, id)
        {
            if (state.wishListIds.indexOf(id) >= 0)
                state.wishListIds.splice(state.wishListIds.indexOf(id), 1);
        },

        addWishListItemToIndex(state, wishListItem, index)
        {
            state.wishListItems.splice(index, 0, wishListItem);
        }
    };

const actions =
    {
        initWishListItems({commit}, ids)
        {
            if (ids && ids[0])
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
            }
        },

        removeWishListItem({commit}, wishListItem, index)
        {
            commit("removeWishListItem", wishListItem);

            ApiService.delete("/rest/io/itemWishList/" + wishListItem.data.variation.id)
                .done(data =>
                {
                    commit("removeWishListId", wishListItem);
                })
                .fail(error =>
                {
                    commit("addWishListItemToIndex", wishListItem, index);
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
