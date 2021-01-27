<template>
    <div
        class="input-group flex-nowrap"
        data-model="vatNumber"
        v-if="isEU">
        <div class="input-unit w-auto input-group-prepend">
            <span class="input-group-text h-100" v-if="vatCodes.length === 1" id="basic-addon1">{{ vatCodes[0] }}</span>
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
            
            this.vatPrefix = selectedCountry.vatCodes && selectedCountry.vatCodes[0] ? selectedCountry.vatCodes[0] : "";
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
                // Splits value in numbers and letters
                const regex = new RegExp(/([^\d]*)(\d*)/);
                const values = regex.exec(value);
                const isPrefixValid = this.vatCodes.find(code => code === values[1]);

                if (isPrefixValid)
                {
                    this.vatPrefix = values[1];
                    this.vatNumber = values[2];
                }
                else
                {
                    // if vat prefix isn't included in this.vatCodes it's an invalid input
                    // and we fill the whole vat id to make the wrong input visible for the customer.
                    this.vatNumber = value;
                }
            } 
        }
    }
}
</script>