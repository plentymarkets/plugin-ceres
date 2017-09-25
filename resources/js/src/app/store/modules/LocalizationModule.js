const state =
    {
        activeShippingCountries: [],
        activeShopLanguageList: [],
        currentShippingCountryId: null,
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

        setCurrentShippingCountryId(state, currentShippingCountryId)
        {
            state.currentShippingCountryId = currentShippingCountryId;
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
            commit("setCurrentShippingCountryId", localizationData.currentShippingCountryId);
            commit("setShopLanguage", localizationData.shopLanguage);
            commit("setCountryFlagPrefix", countryFlagPrefix);
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
