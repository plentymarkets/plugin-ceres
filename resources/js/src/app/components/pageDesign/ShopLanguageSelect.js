var ResourceService = require("services/ResourceService");

Vue.component("shop-language-select", {

    template: "#vue-shop-language-select",

    props:
    [
        "countryFlagPrefix"
    ],

    data: function()
    {
        return {
            localization: {},
            languageList: []
        };
    },

    created: function()
    {
        ResourceService.bind("localization", this);

        for (var i in this.localization.activeShopLanguageList)
        {
            var languageKey = this.localization.activeShopLanguageList[i];
            var languageName = Translations.Template[languageKey];
            var language =
                {
                    key: languageKey,
                    name: languageName,
                    flagClass: this.countryFlagPrefix + languageKey
                };

            this.languageList.push(language);
        }
    }
});
