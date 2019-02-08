Vue.component("salutation-select", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-salutation-select"
        },
        addressData:
        {
            type: Object,
            required: true
        },
        addressType:
        {
            type: [Number, String],
            default: 1
        },
        enabledAddressFields:
        {
            type: Object,
            default: () => []
        }
    },

    data()
    {
        return {
            salutations: {
                complete: {
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
            }
        };
    },

    computed:
    {
        currentSalutation()
        {
            const countryId = parseInt(this.addressData.countryId) || 1;
            const addressKey = parseInt(this.addressType) === 1 ? "billing_address" : "delivery_address";
            const languageKey = App.language === "de" ? "de" : "en";
            const countryKey = countryId === 12 ? "gb" : "de";

            if (this.enabledAddressFields[countryKey].includes(`${addressKey}.name1`))
            {
                return this.salutations.complete[languageKey];
            }

            return this.salutations.withoutCompany[languageKey];
        }
    },

    /**
     * Get the shipping countries
     */
    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        emitInputEvent(value)
        {
            const gender = this.mapSalutationIdToGender(value);

            this.$emit("input", { field: "gender", value: gender });
            this.$emit("input", { field: "addressSalutation", value: value });
            this.$emit("input", { field: "name1", value: "" });
            this.$emit("input", { field: "name2", value: "" });
            this.$emit("input", { field: "name3", value: "" });
            this.$emit("input", { field: "vatNumber", value: "" });
            this.$emit("input", { field: "contactPerson", value: "" });
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
    },

    watch:
    {
        currentSalutation(newVal, oldVal)
        {
            if (newVal !== oldVal)
            {
                const selectedSalutation = this.addressData.addressSalutation;

                // cleanse the current selected salutation, if it's not longer included in the choice
                if (!newVal.map(salutation => salutation.id).includes(selectedSalutation))
                {
                    this.emitInputEvent(newVal[0].id);
                }
            }
        }
    }
});
