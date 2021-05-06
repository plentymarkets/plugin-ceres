import { isDefined, isNullOrUndefined } from "../../helper/utils";

const ApiService = require("../../services/ApiService");

const state =
    {
        containers: {},
        isLastSeenItemsLoading: false,
        lastSeenItems: []
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
        getLastSeenItems({ commit })
        {
            let lastSeen = window.localStorage.getItem("lastSeen");

            if (!isNullOrUndefined(lastSeen))
            {
                lastSeen = JSON.parse(lastSeen);
                const now = new Date();

                let diff = (now.getTime() - lastSeen.expire) / 1000;

                diff = diff / 60;
                if (diff > 60)
                {
                    window.localStorage.removeItem("lastSeen");
                    lastSeen = null;
                }
            }


            if (!isNullOrUndefined(lastSeen) && !state.isLastSeenItemsLoading)
            {
                return new Promise((resolve, reject) =>
                {
                    commit("setIsLastSeenItemsLoading", true);
                    ApiService.get("/rest/io/item/last_seen", { variationIds: lastSeen.value })
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
