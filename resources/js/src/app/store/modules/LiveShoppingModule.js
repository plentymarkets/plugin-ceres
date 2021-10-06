const ApiService = require("../../services/ApiService");

const state = () => ({
    liveShoppingOffers: {}
});

const mutations =
    {
        setLiveShoppingOffer(state, { uid, liveShoppingOffer })
        {
            Vue.set(state.liveShoppingOffers, uid, liveShoppingOffer);
        }
    };

const actions =
    {
        retrieveLiveShoppingOffer({ commit }, { liveShoppingId, sorting, uid })
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.get("/rest/io/live-shopping/" + liveShoppingId + "?sorting=" + sorting)
                    .done(liveShoppingOffer =>
                    {
                        if (liveShoppingOffer.item)
                        {
                            commit("setLiveShoppingOffer", { uid, liveShoppingOffer });
                        }
                        else
                        {
                            commit("setLiveShoppingOffer", { uid, liveShoppingOffer: null });
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

export default
{
    state,
    actions,
    mutations
};
