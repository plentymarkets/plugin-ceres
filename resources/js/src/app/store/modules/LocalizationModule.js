import ApiService from "services/ApiService";
import TranslationService from "services/TranslationService";

const state =
    {
        shippingCountries: [],
        shopLanguageList: [],
        shippingCountryId: null,
        shopLanguage: null,
        countryFlagPrefix: null
    };

const mutations =
    {
        setShippingCountries(state, shippingCountries)
        {
            state.shippingCountries = shippingCountries;
        },

        setShopLanguageList(state, shopLanguageList)
        {
            state.shopLanguageList = shopLanguageList;
        },

        setShippingCountryId(state, shippingCountryId)
        {
            if (shippingCountryId !== state.shippingCountryId)
            {
                document.dispatchEvent(new CustomEvent("afterShippingCountryChanged", {detail: shippingCountryId}));
            }

            state.shippingCountryId = shippingCountryId;
        },

        setShopLanguage(state, shopLanguage)
        {
            state.shopLanguage = shopLanguage;
        },

        setCountryFlagPrefix(state, countryFlagPrefix)
        {
            state.countryFlagPrefix = countryFlagPrefix;
        }
    };

const actions =
    {
        initLocalization({commit}, {localizationData, countryFlagPrefix})
        {
            commit("setShippingCountries", localizationData.activeShippingCountries);
            commit("setShopLanguageList", localizationData.activeShopLanguageList);
            commit("setShippingCountryId", localizationData.currentShippingCountryId);
            commit("setShopLanguage", localizationData.shopLanguage);
            commit("setCountryFlagPrefix", countryFlagPrefix);
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
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        commit("removeWishListId", oldShippingCountryId);
                        reject(error);
                    });
            });
        }
    };

const getters =
    {
        languageList(sate)
        {
            const languageList = [];

            for (const index in sate.shopLanguageList)
            {
                const languageKey = sate.shopLanguageList[index];
                const languageName = TranslationService.translate("Ceres::Template." + languageKey);

                // TODO get css class from config
                const language =
                    {
                        key: languageKey,
                        name: languageName,
                        flagClass: "flag-icon-" + languageKey
                    };

                languageList.push(language);
            }

            return languageList;
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
