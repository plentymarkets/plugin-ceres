<template>
    <div
        class="input-group flex-nowrap"
        data-model="vatNumber"
        v-if="isEU && isPrefixValid">
        <div class="input-unit w-auto input-group-prepend">
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
    <div v-else-if="value && !isPrefixValid" class="input-group flex-nowrap">
        <div class="input-unit flex-fill w-auto error">
            <input
                type="text"
                name="vatNumber"
                :id="'txtVatNumber' + _uid"
                :value="value"
                disabled
            >
            <label :for="'txtVatNumber' + _uid">
                {{ transformTranslation("Ceres::Template.addressVatNumber", "de", "billing_address.vatNumber") }}
            </label>
        </div>
        <button @click="deleteValue()" class="input-unit w-auto">
            <span>{{ $translate("Ceres::Template.addressDelete") }}</span>
            <span class="fa fa-trash-o ml-1"></span>
        </button>
    </div>
</template>

<script>
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
            isPrefixValid: true
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
        },

        selectedCountryId(countryId)
        {
            // only delete values if vatPrefix is not valid for country
            if (!this.vatCodes.find(vatCode => this.value.startsWith(vatCode)))
            {
                this.deleteValue();
            }
        },
    },

    created()
    {
        this.setValues(this.value);
    },

    methods:
    {
        transformTranslation(translationKey, locale, addressKey)
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
            const vatPrefix = this.vatCodes.find(vatCode => value.startsWith(vatCode));
            this.isPrefixValid = !!vatPrefix;

            if (this.isPrefixValid)
            {
                this.vatPrefix = vatPrefix;
                this.vatNumber = value.slice(vatPrefix.length);
            }
            else if (value.length <= 0 && this.isEU)
            {
                // this case is here so the value can be empty but the input is still shown
                this.isPrefixValid = true;
                this.vatPrefix = this.vatCodes[0];
                this.vatNumber = "";
            }
        }
    }
}
</script>