var ResourceService = require("services/ResourceService");

Vue.component("shop-language-select", {

    props: [
        "countryFlagPrefix",
        "template"
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
        this.$options.template = this.template;

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
