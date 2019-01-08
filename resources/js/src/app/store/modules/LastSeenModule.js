import ApiService from "services/ApiService";
import {isDefined}from "../../helper/utils";

const state =
    {
        lastSeenItems: [],
        isLastSeenItemsLoading: false,
        containers: {}
    };

const mutations =
    {
        setLastSeenItems(state, lastSeenItems)
        {
            state.lastSeenItems = lastSeenItems;
        },

        setIsLastSeenItemsLoading(state, isLoading)
        {
            state.isLastSeenItemsLoading = isLoading;
        },

        setLastSeenItemContainers(state, containers)
        {
            state.containers = containers;
        }
    };

const actions =
    {
        addLastSeenItem({commit, state}, variationId)
        {
            if (!state.isLastSeenItemsLoading)
            {
                return new Promise((resolve, reject) =>
                {
                    commit("setIsLastSeenItemsLoading", true);

                    ApiService.put("/rest/io/item/last_seen/" + variationId + "?items=" + App.config.itemLists.lastSeenNumber || 4)
                        .done(response =>
                        {
                            if (isDefined(response.lastSeenItems))
                            {
                                commit("setLastSeenItems", response.lastSeenItems.documents);
                                commit("setLastSeenItemContainers", response.containers);
                                commit("setIsLastSeenItemsLoading", false);
                                resolve(response.lastSeenItems.documents);
                            }
                            else
                            {
                                resolve(null);
                            }
                        })
                        .fail(error =>
                        {
                            commit("setIsLastSeenItemsLoading", false);
                            reject(error);
                        });
                });
            }

            return null;
        },

        getLastSeenItems({commit})
        {
            if (!state.isLastSeenItemsLoading)
            {
                return new Promise((resolve, reject) =>
                {
                    commit("setIsLastSeenItemsLoading", true);

                    ApiService.get("/rest/io/item/last_seen", {items: App.config.itemLists.lastSeenNumber}, {keepOriginalResponse: true})
                        .done(response =>
                        {
                            if (isDefined(response.data) && isDefined(response.data.lastSeenItems))
                            {
                                commit("setLastSeenItems", response.data.lastSeenItems.documents);
                                commit("setLastSeenItemContainers", response.data.containers);
                                commit("setIsLastSeenItemsLoading", false);

                                resolve(response.data.lastSeenItems.documents);
                            }
                            else
                            {
                                resolve(null);
                            }
                        })
                        .fail(error =>
                        {
                            commit("setIsLastSeenItemsLoading", false);
                            reject(error);
                        });
                });
            }

            return null;
        }
    };

export default
{
    state,
    actions,
    mutations
};
