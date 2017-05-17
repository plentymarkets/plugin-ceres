var ResourceService = require("services/ResourceService");

Vue.component("salutation-select", {

    props: [
        "template",
        "addressData"
    ],

    data: function()
    {
        return {
            localization: {},
            salutations: {
                de: ["Herr", "Frau", "Firma", "Familie"],
                en: ["Mr.", "Ms.", "Company", "Family"]
            },
            currentSalutation: {}
        };
    },

    /**
     * Get the shipping countries
     */
    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("localization", this);
        this.shopLanguage = this.localization.shopLanguage;

        if (this.shopLanguage === "de")
        {
            this.currentSalutation = this.salutations.de;
        }
        else
        {
            this.currentSalutation = this.salutations.en;
        }
    }
});
