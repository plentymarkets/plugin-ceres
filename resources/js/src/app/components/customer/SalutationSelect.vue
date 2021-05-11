<template>
    <select :value="addressData.gender" data-testing="salutation-select" class="custom-select" @change="emitInputEvent($event.target.value)" data-autofocus>
        <option
            :value="salutation.key"
            :selected="addressData.gender === salutation.key && checkGenderCompany(salutation.key)"
            v-for="(salutation, index) in currentSalutation"
            :key="index">
            {{ salutation.name }}
        </option>
    </select>
</template>

<script>
import { isNullOrUndefined } from "../../helper/utils";

export default {

    name: "salutation-select",

    props:
    {
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
            default: App.config.addresses.defaultSalutation
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
                    name: this.$translate("Ceres::Template." + salutation.name)
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
            const isNewGenderPersonal = this.getIsGenderPersonal(value)
            const isOldGenderPersonal = this.getIsGenderPersonal(this.addressData.gender)
            
            this.$emit("input", { field: "gender", value: value });

            // just reset the input fields, when switching the gender between a personal one and company
            if (isNewGenderPersonal !== isOldGenderPersonal)
            {
                this.$emit("input", { field: "name1", value: "" });
                this.$emit("input", { field: "name2", value: "" });
                this.$emit("input", { field: "name3", value: "" });
                this.$emit("input", { field: "vatNumber", value: "" });
                this.$emit("input", { field: "contactPerson", value: "" });
            }
        },

        checkGenderCompany(gender)
        {
            if (gender === "company")
            {
                return (this.addressData.name1 !== null) || (this.addressData.name1 !== "");
            }
            return true;
        },

        getIsGenderPersonal(gender)
        {
            return ["male", "female", "diverse"].includes(gender);
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
}
</script>
