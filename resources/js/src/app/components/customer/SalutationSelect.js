import { isNullOrUndefined } from "../../helper/utils";
import TranslationService from "../../services/TranslationService";
import Vue from "vue";

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
        },
        defaultSalutation: {
            type: String,
            default: "male"
        }
    },

    data()
    {
        return {
            salutations: [
                {
                    key: "male",
                    name: "addressSalutationMale"
                },
                {
                    key: "female",
                    name: "addressSalutationFemale"
                },
                {
                    key: "diverse",
                    name: "addressSalutationDiverse"
                },
                {
                    key: "company",
                    name: "addressSalutationCompany"
                }
            ]
        };
    },

    computed:
    {
        currentSalutation()
        {
            const countryId = parseInt(this.addressData.countryId) || 1;
            const addressKey = parseInt(this.addressType) === 1 ? "billing_address" : "delivery_address";
            const countryKey = countryId === 12 ? "gb" : "de";

            const salutations = this.salutations.map(salutation =>
            {
                return {
                    key: salutation.key,
                    name: TranslationService.translate("Ceres::Template." + salutation.name)
                };
            });

            if (this.enabledAddressFields[countryKey].includes(`${addressKey}.name1`))
            {
                return salutations;
            }

            return salutations.filter(salutation => salutation.key !== "company");
        }
    },

    /**
     * Get the shipping countries
     */
    created()
    {
        this.$options.template = this.template;

        let selectedSalutation = this.defaultSalutation;

        if (isNullOrUndefined(selectedSalutation))
        {
            selectedSalutation = this.currentSalutation[0].key;
        }

        this.emitInputEvent(selectedSalutation);
    },

    methods:
    {
        emitInputEvent(value)
        {
            this.$emit("input", { field: "gender", value: value });
            this.$emit("input", { field: "name1", value: "" });
            this.$emit("input", { field: "name2", value: "" });
            this.$emit("input", { field: "name3", value: "" });
            this.$emit("input", { field: "vatNumber", value: "" });
            this.$emit("input", { field: "contactPerson", value: "" });
        },

        checkGenderCompany(gender)
        {
            if (gender === "company")
            {
                return (this.addressData.name1 !== null) || (this.addressData.name1 !== "");
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
                const selectedSalutation = this.addressData.gender;

                // cleanse the current selected salutation, if it's not longer included in the choice
                if (!newVal.map(salutation => salutation.key).includes(selectedSalutation))
                {
                    this.emitInputEvent(newVal[0].key);
                }
            }
        }
    }
});
