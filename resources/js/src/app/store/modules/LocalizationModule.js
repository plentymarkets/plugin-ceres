import ApiService from "services/ApiService";
import { isNullOrUndefined } from "../../helper/utils";

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
                document.dispatchEvent(new CustomEvent("afterShippingCountryChanged", { detail: shippingCountryId }));
            }

            state.shippingCountryId = shippingCountryId;
        }
    };

const actions =
    {
        selectShippingCountry({ commit, state }, shippingCountryId)
        {
            return new Promise((resolve, reject) =>
            {
                const oldShippingCountryId = state.shippingCountryId;

                commit("setShippingCountryId", shippingCountryId);
                ApiService.post("/rest/io/shipping/country", { shippingCountryId })
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

const getters =
    {
        getCountryName: state => countryId =>
        {
            if (countryId > 0)
            {
                const country = state.shippingCountries.find(country => country.id === countryId);

                if (!isNullOrUndefined(country))
                {
                    return country.currLangName;
                }
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
