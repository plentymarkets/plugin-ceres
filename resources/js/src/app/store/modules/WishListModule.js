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
            state.wishListItems = state.wishListItems.filter(item => item !== wishListItem);
        },

        removeWishListId(state, id)
        {
            state.wishListIds = state.wishListIds.filter(wishListId => wishListId !== id);
        },

        addWishListItemToIndex(state, wishListItem, index)
        {
            state.wishListItems.splice(index, 0, wishListItem);
        },

        addWishListId(state, id)
        {
            state.wishListIds.push(id);
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

        removeWishListItem({commit}, {id, wishListItem, index})
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
                        commit("removeWishListId", id);
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
                commit("addWishListId", id);
                ApiService.post("/rest/io/itemWishList", {variationId: id})
                    .done(() =>
                    {
                        resolve();
                    })
                    .fail(() =>
                    {
                        commit("removeWishListId", id);
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
