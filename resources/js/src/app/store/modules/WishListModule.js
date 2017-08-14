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
            const index = state.wishListItems.indexOf(wishListItem);

            if (index >= 0)
                state.wishListItems.splice(index, 1);
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
            return new Promise((resolve, reject) =>
            {
                if (ids && ids[0])
                {
                    commit("setWishListIds", ids);

                    ApiService.get("/rest/io/variations/", {variationIds: ids, template: "Ceres::WishList.WishList"})
                        .done(data =>
                        {
                            commit("setWishListItems", data.documents);
                            resolve();
                        })
                        .fail(() =>
                        {
                            reject();
                        });
                }
                else
                {
                    resolve();
                }
            });
        },

        removeWishListItem({commit}, id, wishListItem, index)
        {
            return new Promise((resolve, reject) =>
            {
                if (wishListItem)
                {
                    commit("removeWishListItem", wishListItem);
                }

                ApiService.delete("/rest/io/itemWishList/" + id)
                    .done(data =>
                    {
                        commit("removeWishListId", wishListItem);
                        resolve();
                    })
                    .fail(error =>
                    {
                        if (index)
                        {
                            commit("addWishListItemToIndex", wishListItem, index);
                        }
                        reject();
                    });
            });
        },

        addToWishList({commit}, id)
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.post("/rest/io/itemWishList", {variationId: id})
                    .done(() =>
                    {
                        resolve();
                    })
                    .fail(() =>
                    {
                        reject();
                    });
            });
        }
    };

const getters =
    {
        wishListCount: state => state.wishListIds.length
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
