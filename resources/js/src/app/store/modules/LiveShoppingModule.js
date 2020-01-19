const ApiService = require("../../services/ApiService");

const state =
    {
        liveShoppingOffers: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null, 10: null }
    };

const mutations =
    {
        setLiveShoppingOffer(state, { liveShoppingId, liveShoppingOffer })
        {
            state.liveShoppingOffers[liveShoppingId] = liveShoppingOffer;
        }
    };

const actions =
    {
        retrieveLiveShoppingOffer({ commit }, liveShoppingId)
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.get("/rest/io/live-shopping/" + liveShoppingId)
                    .done(liveShoppingOffer =>
                    {
                        if (liveShoppingOffer.item)
                        {
                            commit("setLiveShoppingOffer", { liveShoppingId, liveShoppingOffer });
                        }
                        else
                        {
                            commit("setLiveShoppingOffer", { liveShoppingId, liveShoppingOffer: null });
                        }

                        resolve(liveShoppingOffer);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        }
    };

const getters =
    {

    };

export default
{
    state,
    actions,
    mutations,
    getters
};
