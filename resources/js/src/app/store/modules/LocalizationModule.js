import { isNullOrUndefined } from "../../helper/utils";
import { setUrlParam } from "../../services/UrlService";

const ApiService = require("../../services/ApiService");

const state = () => ({
    shippingCountries: [],
    shippingCountryId: null,
    euShippingCountries: []
});

const mutations =
    {
        setShippingCountries(state, shippingCountries)
        {
            state.shippingCountries = shippingCountries;
        },

        setEuShippingCountries(state, euShippingCountries)
        {
            state.euShippingCountries = euShippingCountries;
        },

        setShippingCountryId(state, shippingCountryId)
        {
            if (shippingCountryId !== state.shippingCountryId && !App.isSSR)
            {
                document.dispatchEvent(new CustomEvent("afterShippingCountryChanged", { detail: shippingCountryId }));
            }

            state.shippingCountryId = shippingCountryId;
        }
    };

const actions =
    {
        selectShippingCountry({ commit, state }, { shippingCountryId, openBasketPreview })
        {
            return new Promise((resolve, reject) =>
            {
                const oldShippingCountryId = state.shippingCountryId;

                commit("setShippingCountryId", shippingCountryId);
                ApiService.post("/rest/io/shipping/country", { "shippingCountryId": shippingCountryId })
                    .done(data =>
                    {
                        if (isNullOrUndefined(oldShippingCountryId) || oldShippingCountryId !== data)
                        {
                            if (openBasketPreview)
                            {
                                setUrlParam({ openBasketPreview: 1 });
                            }

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

const getters =
    {
        getCountryName: state => countryId =>
        {
            if (countryId > 0)
            {
                let country = state.shippingCountries.find(country => country.id === countryId);

                if (isNullOrUndefined(country))
                {
                    country = state.euShippingCountries.find(country => country.id === countryId);
                }

                if (!isNullOrUndefined(country))
                {
                    return country.currLangName;
                }
            }

            return "";
        },
        getStateName: state => (countryId, stateId) =>
        {
            if (stateId > 0 && countryId > 0)
            {
                const country = state.shippingCountries.find(country => country.id === countryId);

                if (country)
                {
                    const state = country.states.find((countryState) => countryState.id === stateId);

                    return state.name;
                }
                return "";
            }
            return "";
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
