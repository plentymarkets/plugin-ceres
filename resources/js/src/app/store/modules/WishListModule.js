const ApiService = require("../../services/ApiService");

const state = () => ({
    wishListIds: [],
    wishListItems: [],
    inactiveVariationIds: [],
    isWishListInitiallyLoading: false,
    isLoading: false
});

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

        setInactiveVariationIds(state, inactiveVariationIds)
        {
            state.inactiveVariationIds = inactiveVariationIds?.map(Number);
        },

        removeWishListItem(state, wishListItem)
        {
            state.wishListItems = state.wishListItems.filter(item => item !== wishListItem);
        },

        removeWishListId(state, id)
        {
            state.wishListIds = state.wishListIds.filter(wishListId => wishListId !== id);
        },

        removeInactiveVariationId(state, id)
        {
            state.inactiveVariationIds = state.inactiveVariationIds.filter(inactiveVarationId => inactiveVarationId !== id);
        },

        addWishListItemToIndex(state, wishListItem, index)
        {
            state.wishListItems.splice(index, 0, wishListItem);
        },

        addWishListId(state, id)
        {
            state.wishListIds.push(id);
        },

        setIsWishListInitiallyLoading(state)
        {
            state.isWishListInitiallyLoading = true;
        },

        setIsWishListLoading(state, isLoading)
        {
            state.isLoading = !!isLoading;
        }
    };

const actions =
    {
        initWishListItems({ commit, state })
        {
            return new Promise((resolve, reject) =>
            {
                if (!state.isWishListInitiallyLoading)
                {
                    commit("setIsWishListInitiallyLoading");
                    commit("setIsWishListLoading", true);

                    ApiService.get("/rest/io/itemWishList")
                        .done(response =>
                        {
                            commit("setInactiveVariationIds", response.inactiveVariationIds);
                            commit("setWishListItems", response.documents);
                            resolve(response);
                        })
                        .fail(error =>
                        {
                            reject(error);
                        })
                        .always(() =>
                        {
                            commit("setIsWishListLoading", false);
                        });
                }
                else
                {
                    resolve(state.wishListItems);
                }
            });
        },

        removeInactiveWishListItem({ commit }, { id })
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.del("/rest/io/itemWishList/" + id)
                    .done(data =>
                    {
                        commit("removeWishListId", id);
                        commit("removeInactiveVariationId", id);
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    })
                    .always(() =>
                    {
                        commit("setIsWishListLoading", false);
                    });
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
                ApiService.del("/rest/io/itemWishList/" + id)
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
