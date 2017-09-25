// import ApiService from "services/ApiService";

const state =
    {
        activeShippingCountries: [],
        activeShopLanguageList: [],
        shippingCountryId: null,
        shopLanguage: null,
        countryFlagPrefix: null
    };

const mutations =
    {
        setActiveShippingCountries(state, activeShippingCountries)
        {
            state.activeShippingCountries = activeShippingCountries;
        },

        setActiveShopLanguageList(state, activeShopLanguageList)
        {
            state.activeShopLanguageList = activeShopLanguageList;
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
            commit("setActiveShippingCountries", localizationData.activeShippingCountries);
            commit("setActiveShopLanguageList", localizationData.activeShopLanguageList);
            commit("setShippingCountryId", localizationData.currentShippingCountryId);
            commit("setShopLanguage", localizationData.shopLanguage);
            commit("setCountryFlagPrefix", countryFlagPrefix);
        },

        selectShippingCountry({commit, state}, shippingCountryId)
        {
            return new Promise((resolve, reject) =>
            {
                // const oldShippingCountryId = state.shippingCountryId;

                commit("setShippingCountryId", shippingCountryId);
                // ApiService.post("TODO", {TODO})
                //     .done(data =>
                //     {
                //         resolve(data);
                //     })
                //     .fail(error =>
                //     {
                //         commit("removeWishListId", oldShippingCountryId);
                //         reject(error);
                //     });
            });
        }
    };

const getters =
    {
        languageList(sate)
        {
            const languageList = [];

            for (const index in sate.activeShopLanguageList)
            {
                const languageKey = sate.activeShopLanguageList[index];
                const languageName = Translations.Template[languageKey];
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
