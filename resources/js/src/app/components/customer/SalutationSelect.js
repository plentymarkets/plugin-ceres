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
                        },
                        {
                            value: "Familie",
                            id   : 3
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
                        },
                        {
                            value: "Family",
                            id   : 3
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
                        },
                        {
                            value: "Familie",
                            id   : 3
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
                            value: "Family",
                            id   : 3
                        }
                    ]
                }
            },
            currentSalutation: {}
        };
    },

    computed: Vuex.mapState({
        shopLanguage: state => state.localization.shopLanguage
    }),

    /**
     * Get the shipping countries
     */
    created()
    {
        this.$options.template = this.template;

        if (this.shopLanguage === "de")
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
            this.$emit("input", {field: "addressSalutation", value});

            if (this.addressData.addressSalutation !== 2 && typeof this.addressData.name1 !== "undefined" && this.addressData.name1 !== "")
            {
                this.$emit("input", {field: "name1", value: ""});
            }
        }
    }
});
