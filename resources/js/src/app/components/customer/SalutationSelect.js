var ResourceService = require("services/ResourceService");
var AddressFieldService = require("services/AddressFieldService");

Vue.component("salutation-select", {

    props: [
        "template",
        "addressData",
        "addressType"
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
            if (AddressFieldService.isAddressFieldEnabled(this.addressData.countryId, this.addressType, "name1")) {
                this.currentSalutation = this.salutations.complete.de;
            }
            else {
                this.currentSalutation = this.salutations.withoutCompany.de;
            }
        }
        else if (AddressFieldService.isAddressFieldEnabled(this.addressData.countryId, this.addressType, "name1")) {
            this.currentSalutation = this.salutations.complete.en;
        }
        else {
            this.currentSalutation = this.salutations.withoutCompany.en;
        }
    },

    ready: function () {
        this.addressData.addressSalutation = 0;
    }
});
