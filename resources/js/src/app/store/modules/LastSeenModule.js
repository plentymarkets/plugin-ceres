import { isDefined } from "../../helper/utils";

const ApiService = require("../../services/ApiService");

const state = () => ({
    containers: {},
    isLastSeenItemsLoading: false,
    lastSeenItems: []
});

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
        addLastSeenItem({ commit, state }, variationId)
        {
            if (!state.isLastSeenItemsLoading)
            {
                return new Promise((resolve, reject) =>
                {
                    commit("setIsLastSeenItemsLoading", true);

                    ApiService.put(`/rest/io/item/last_seen/${variationId}`)
                        .done(response =>
                        {
                            commit("setIsLastSeenItemsLoading", false);
                            if (isDefined(response.lastSeenItems))
                            {
                                commit("setLastSeenItems", response.lastSeenItems.documents);
                                commit("setLastSeenItemContainers", response.containers);
                                commit("setIsLastSeenItemsLoading", false);
                            }

                            resolve(response?.lastSeenItems?.documents);
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

        getLastSeenItems({ commit })
        {
            if (!state.isLastSeenItemsLoading)
            {
                return new Promise((resolve, reject) =>
                {
                    commit("setIsLastSeenItemsLoading", true);
                    ApiService.get("/rest/io/item/last_seen")
                        .done(response =>
                        {
                            if (isDefined(response) && isDefined(response.lastSeenItems))
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
        }
    };

export default
{
    state,
    actions,
    mutations
};
