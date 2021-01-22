<template>
    <div
        class="input-group"
        data-model="vatNumber"
        v-if="isEU">
        <div class="input-unit border-0 w-auto input-group-prepend">
            <span class="input-group-text h-100" v-if="vatCodes.length === 1" id="basic-addon1">{{ vatPrefix }}</span>
            <select v-if="vatCodes.length > 1" v-model="vatPrefix" @change="emitChange($event)">
                <option v-for="(vatCode, index) in vatCodes" :value="vatCode.vatCode">{{ vatCode.vatCode }}</option>
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
                @input="emitChange($event)"
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
        isRequired: Boolean
    },

    data()
    {
        return {
            vatNumber: "",
            vatPrefix: ""
        }
    },

    computed:
    {
        vatCodes()
        {
            const selectedCountry = this.$store.state.localization.shippingCountries.find(country => country.id === this.selectedCountryId);
            
            this.vatPrefix = selectedCountry.vatCodes && selectedCountry.vatCodes[0] ? selectedCountry.vatCodes[0].vatCode : "";
            return selectedCountry.vatCodes;
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
        transformTranslation(translationKey, locale, addressKey)
        {
            const translation = this.$translate(translationKey);

            return translation + (this.isRequired ? "*" : "");
        },
        
        emitChange(event)
        {
            this.$emit('input', this.vatPrefix + this.vatNumber);
        },

        setValues(value)
        {
            if (value && value.length > 0)
            {
                const prefix = value.slice(0, 2);
                const number = value.slice(2);

                this.vatPrefix = prefix;
                this.vatNumber = number;
            } 
        }
    }
}
</script>