var ResourceService = require("services/ResourceService");

Vue.component("salutation-select", {

    props: [
        "template",
        "addressData",
        "enabledFields"
    ],

    data: function () {
        return {
            localization: {},
            salutations: {
                complete: {
                    de: [
                        {value: "Herr", id: 0},
                        {value: "Frau", id: 1},
                        {value: "Firma", id: 2},
                        {value: "Familie", id: 3}
                    ],
                    en: [
                        {value: "Mr.", id: 0},
                        {value: "Ms.", id: 1},
                        {value: "Company", id: 2},
                        {value: "Family", id: 3}
                    ]
                },
                withoutCompany: {
                    de: [
                        {value: "Herr", id: 0},
                        {value: "Frau", id: 1},
                        {value: "Familie", id: 3}
                    ],
                    en: [
                        {value: "Mr.", id: 0},
                        {value: "Ms.", id: 1},
                        {value: "Family", id: 3}
                    ]
                }
            },
            currentSalutation: {}
        };
    },

    /**
     * Get the shipping countries
     */
    created: function () {

        this.$options.template = this.template;

        ResourceService.bind("localization", this);
        this.shopLanguage = this.localization.shopLanguage;

        if (this.shopLanguage === "de") {
            if (this.isCompanyEnabled(this.enabledFields)) {
                this.currentSalutation = this.salutations.complete.de;
            }
            else {
                this.currentSalutation = this.salutations.withoutCompany.de;
            }
        }
        else if (this.isCompanyEnabled(this.enabledFields)) {
            this.currentSalutation = this.salutations.complete.en;
        }
        else {
            this.currentSalutation = this.salutations.withoutCompany.en;
        }
    },

    ready: function () {
        this.addressData.addressSalutation = 0;
    },

    methods: {
        isCompanyEnabled: function (enabledFields) {

            for (var i = 0; i < enabledFields.length; i++) {
                if (enabledFields[i] === "billing_address.name1" || enabledFields[i] === "delivery_address.name1") {
                    return true;
                }
            }

            return false;
        }
    }
});
