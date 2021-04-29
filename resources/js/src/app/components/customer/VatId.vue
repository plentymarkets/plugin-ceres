<template>
    <div
        class="input-group flex-nowrap"
        data-model="vatNumber"
        v-if="showInput"
    >
        <div class="input-unit w-auto input-group-prepend" v-if="isEU">
            <span class="input-group-text h-100 border-0" v-if="vatCodes.length === 1" id="basic-addon1">{{ vatCodes[0] }}</span>
            <select class="custom-select" v-if="vatCodes.length > 1" v-model="vatPrefix">
                <option v-for="(vatCode, index) in vatCodes" :value="vatCode" :key="index">{{ vatCode }}</option>
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
            >
            <label :for="'txtVatNumber' + _uid">
                {{ transformTranslation("Ceres::Template.addressVatNumber", "de", "billing_address.vatNumber") }}
            </label>
        </div>
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
        isRequired: Boolean,
        showInput: Boolean
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
            this.vatPrefix = this.selectedCountry?.vatCodes && this.selectedCountry?.vatCodes[0] ? this.selectedCountry.vatCodes[0] : "";
            return this.selectedCountry?.vatCodes ? this.selectedCountry.vatCodes : [];
        },

        isEU()
        {
            return this.vatCodes?.length > 0;
        },

        selectedCountry()
        {
            return this.$store.state.localization.shippingCountries.find(country => country.id === this.selectedCountryId);
        }
    },

    watch:
    {
        value(newValue)
        {
            this.setValues(newValue);
        },

        showInput()
        {
            if (!this.showInput)
            {
                this.deleteValue();
            }
        },

        vatNumber()
        {
            this.emitChange();
        },

        vatPrefix()
        {
          this.emitChange();
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

        deleteValue()
        {
            this.vatNumber = "";
            this.vatPrefix = this.selectedCountry?.vatCodes && this.selectedCountry?.vatCodes[0] ? this.selectedCountry.vatCodes[0] : "";
        },

        emitChange()
        {
            const value = !!this.vatNumber ? this.vatPrefix + this.vatNumber : "";
            this.$emit('input', value);
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

            this.vatCodes?.forEach(vatCode => {
                if (value.startsWith(vatCode) && vatCode.length > result.length) {
                    result = vatCode;
                }
            });

            return result;
        }
    }
}
</script>
