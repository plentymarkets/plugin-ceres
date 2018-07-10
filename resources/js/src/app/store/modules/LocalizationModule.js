import ApiService from "services/ApiService";
import {isNullOrUndefined}from "../../helper/utils";

const state =
    {
        shippingCountries: [],
        shippingCountryId: null
    };

const mutations =
    {
        setShippingCountries(state, shippingCountries)
        {
            state.shippingCountries = shippingCountries;
        },

        setShippingCountryId(state, shippingCountryId)
        {
            if (shippingCountryId !== state.shippingCountryId)
            {
                document.dispatchEvent(new CustomEvent("afterShippingCountryChanged", {detail: shippingCountryId}));
            }

            state.shippingCountryId = shippingCountryId;
        }
    };

const actions =
    {
        initLocalization({commit}, {localizationData})
        {
            commit("setShippingCountries", localizationData.activeShippingCountries);
            commit("setShippingCountryId", localizationData.currentShippingCountryId);
        },

        selectShippingCountry({commit, state}, shippingCountryId)
        {
            return new Promise((resolve, reject) =>
            {
                const oldShippingCountryId = state.shippingCountryId;

                commit("setShippingCountryId", shippingCountryId);
                ApiService.post("/rest/io/shipping/country", {shippingCountryId})
                    .done(data =>
                    {
                        if (isNullOrUndefined(oldShippingCountryId) || oldShippingCountryId !== data)
                        {
                            window.location.reload();
                        }
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        commit("setShippingCountryId", oldShippingCountryId);
                        reject(error);
                    });
            });
        }
    };

export default
{
    state,
    mutations,
    actions
};
