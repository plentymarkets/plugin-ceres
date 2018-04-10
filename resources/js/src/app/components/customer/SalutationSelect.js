import AddressFieldService from "services/AddressFieldService";

Vue.component("salutation-select", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "addressData",
        "addressType"
    ],

    data()
    {
        return {
            salutations      : {
                complete      : {
                    de: [
                        {
                            value: "Herr",
                            id   : 0
                        },
                        {
                            value: "Frau",
                            id   : 1
                        },
                        {
                            value: "Firma",
                            id   : 2
                        }
                    ],
                    en: [
                        {
                            value: "Mr.",
                            id   : 0
                        },
                        {
                            value: "Ms.",
                            id   : 1
                        },
                        {
                            value: "Company",
                            id   : 2
                        }
                    ]
                },
                withoutCompany: {
                    de: [
                        {
                            value: "Herr",
                            id   : 0
                        },
                        {
                            value: "Frau",
                            id   : 1
                        }
                    ],
                    en: [
                        {
                            value: "Mr.",
                            id   : 0
                        },
                        {
                            value: "Ms.",
                            id   : 1
                        }
                    ]
                }
            },
            currentSalutation: {}
        };
    },

    /**
     * Get the shipping countries
     */
    created()
    {
        this.$options.template = this.template;

        if (App.language === "de")
        {
            if (AddressFieldService.isAddressFieldEnabled(this.addressData.countryId, this.addressType, "name1"))
            {
                this.currentSalutation = this.salutations.complete.de;
            }
            else
            {
                this.currentSalutation = this.salutations.withoutCompany.de;
            }
        }
        else if (AddressFieldService.isAddressFieldEnabled(this.addressData.countryId, this.addressType, "name1"))
        {
            this.currentSalutation = this.salutations.complete.en;
        }
        else
        {
            this.currentSalutation = this.salutations.withoutCompany.en;
        }
    },

    methods:
    {
        emitInputEvent(value)
        {
            const gender = this.mapSalutationIdToGender(value);

            this.$emit("input", {field: "gender", value: gender});
            this.$emit("input", {field: "addressSalutation", value: value});
            this.$emit("input", {field: "name1", value: ""});
        },

        mapSalutationIdToGender(id)
        {
            if (id === 0)
            {
                return "male";
            }
            else if (id === 1)
            {
                return "female";
            }
            return null;

        },

        checkGenderCompany(id)
        {
            if (id === 2)
            {
                const gender = this.mapSalutationIdToGender(id);

                return (gender === null && this.addressData.name1 !== null) || (gender === null && this.addressData.name1 !== "");
            }
            return true;
        }
    }
});
