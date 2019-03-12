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
            state.wishListIds = wishListIds.map(Number);
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
        initWishListItems({ commit }, ids)
        {
            return new Promise((resolve, reject) =>
            {
                if (ids && ids[0])
                {
                    commit("setWishListIds", ids);

                    ApiService.get("/rest/io/variations/", { variationIds: ids, template: "Ceres::WishList.WishList" })
                        .done(data =>
                        {
                            commit("setWishListItems", data.documents);
                            resolve(data);
                        })
                        .fail(error =>
                        {
                            reject(error);
                        });
                }
                else
                {
                    resolve();
                }
            });
        },

        removeWishListItem({ commit }, { id, wishListItem, index })
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
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        if (index)
                        {
                            commit("addWishListItemToIndex", wishListItem, index);
                        }
                        reject(error);
                    });
            });
        },

        addToWishList({ commit }, id)
        {
            return new Promise((resolve, reject) =>
            {
                commit("addWishListId", id);
                ApiService.post("/rest/io/itemWishList", { variationId: id })
                    .done(data =>
                    {
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        commit("removeWishListId", id);
                        reject(error);
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
