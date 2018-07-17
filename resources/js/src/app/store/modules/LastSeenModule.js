import ApiService from "services/ApiService";
import {isDefined}from "../../helper/utils";

const state =
    {
        lastSeenItems: [],
        lastSeenItemsLoading: false
    };

const mutations =
    {
        setLastSeenItems(state, lastSeenItems)
        {
            state.lastSeenItems = lastSeenItems;
        },

        setLastSeenItemsLoading(state, isLoading)
        {
            state.lastSeenItemsLoading = isLoading;
        }
    };

const actions =
    {
        addLastSeenItem({commit}, variationId)
        {
            return new Promise((resolve, reject) =>
            {
                commit("setLastSeenItemsLoading", true);

                ApiService.put("/rest/io/item/last_seen/" + variationId)
                    .done(response =>
                    {
                        commit("setLastSeenItems", response.documents);
                        commit("setLastSeenItemsLoading", false);
                        resolve(response.documents);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        },

        getLastSeenItems({commit})
        {
            return new Promise((resolve, reject) =>
            {
                const params = {items: App.config.itemLists.lastSeenNumber};

                commit("setLastSeenItemsLoading", true);

                ApiService.get("/rest/io/item/last_seen", params, {keepOriginalResponse: true})
                    .done(response =>
                    {
                        if (isDefined(response.data))
                        {
                            commit("setLastSeenItems", response.data.documents);
                            commit("setLastSeenItemsLoading", false);
                            resolve(response.data.documents);
                        }
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        }
    };

export default
{
    state,
    actions,
    mutations
};
