<template>
    <div v-if="value && !isPrefixValid && isEU" class="input-group flex-nowrap">
        <div class="input-unit flex-fill w-auto error">
            <input
                type="text"
                name="vatNumber"
                :id="'txtVatNumber' + _uid"
                :value="value"
                data-testing="wrong-vat-id"
                disabled
            >
            <label :for="'txtVatNumber' + _uid">
                {{ transformTranslation("Ceres::Template.addressVatNumber", "de", "billing_address.vatNumber") }}
            </label>
        </div>
        <button @click="deleteValue()" class="input-unit w-auto" data-testing="delete-wrong-vat-id">
            <span>{{ $translate("Ceres::Template.addressDelete") }}</span>
            <span class="fa fa-trash-o ml-1"></span>
        </button>
    </div>
    <div
        class="input-group flex-nowrap"
        data-model="vatNumber"
        v-else>
        <div class="input-unit w-auto input-group-prepend" v-if="isEU">
            <span class="input-group-text h-100 border-0" v-if="vatCodes.length === 1" id="basic-addon1">{{ vatCodes[0] }}</span>
            <select class="custom-select" v-if="vatCodes.length > 1" v-model="vatPrefix" @change="emitChange()">
                <option v-for="(vatCode, index) in vatCodes" :value="vatCode">{{ vatCode }}</option>
            </select>
        </div>
        <div class="input-unit flex-fill w-auto" v-validate:text="isRequired">
            <input
                aria-describedby="basic-addon1"
                type="text"
                name="vatNumber"
                :id="'txtVatNumber' + _uid"
                v-model="vatNumber"
                data-autofocus
                data-testing="vat-id"
                @input="emitChange()"
            >
            <label :for="'txtVatNumber' + _uid">
                {{ transformTranslation("Ceres::Template.addressVatNumber", "de", "billing_address.vatNumber") }}
            </label>
        </div>
    </div>
</template>

<script>
import { isNullOrUndefined } from '../../helper/utils';
export default
{
    name: "vat-id",

    props:
    {
        selectedCountryId: Number,
        value: String,
        isRequired: Boolean
    },

    data()
    {
        return {
            vatNumber: "",
            vatPrefix: "",
            isPrefixValid: false
        }
    },

    computed:
    {
        vatCodes()
        {
            this.vatPrefix = this.selectedCountry.vatCodes && this.selectedCountry.vatCodes[0] ? this.selectedCountry.vatCodes[0] : "";
            return this.selectedCountry.vatCodes;
        },

        selectedCountry()
        {
            return this.$store.state.localization.shippingCountries.find(country => country.id === this.selectedCountryId);
        },

        isEU()
        {
            return this.vatCodes?.length > 0;
        }

    },

    watch:
    {
        value(newValue)
        {
            this.setValues(newValue);
        }
    },

    created()
    {
        this.setValues(this.value);
    },

    methods:
    {
        transformTranslation(translationKey)
        {
            const translation = this.$translate(translationKey);

            return translation + (this.isRequired ? "*" : "");
        },

        emitChange()
        {
            const value = !!this.vatNumber ? this.vatPrefix + this.vatNumber : "";

            this.$emit('input', value);
        },

        deleteValue()
        {
            this.vatNumber = "";
            this.vatPrefix = this.selectedCountry.vatCodes && this.selectedCountry.vatCodes[0] ? this.selectedCountry.vatCodes[0] : "";

            this.emitChange();
        },

        setValues(value)
        {
            const vatPrefix = this.getVatPrefix(value);
            this.isPrefixValid = !!vatPrefix;

            if (this.isPrefixValid)
            {
                this.vatPrefix = vatPrefix;
                this.vatNumber = value.slice(vatPrefix.length);
            }
            else
            {
                this.vatNumber = value;
            }
        },

        /**
         * @param value
         * @returns {string} - Returns the best matching vat code
         */
        getVatPrefix(value)
        {
            let result = "";

            this.vatCodes.forEach(vatCode => {
                if (value.startsWith(vatCode) && vatCode.length > result.length) {
                    result = vatCode;
                }
            });

            return result;
        }
    }
}
</script>
