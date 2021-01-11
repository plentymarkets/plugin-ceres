<template>
    <div
        class="input-unit"
        data-model="vatNumber"
        v-if="isEU">
        <input aria-describedby="basic-addon1" type="text" name="vatNumber" :id="'txtVatNumber' + _uid" v-model="vatValue" data-autofocus>
        <label :for="'txtVatNumber' + _uid">
            {{ transformTranslation("Ceres::Template.addressVatNumber", "de", "billing_address.vatNumber") }} {{ vatPrefix }}
        </label>
    </div>
</template>

<script>
export default
{
    name: "vat-id",

    props:
    {
        selectedCountryId: Number,
        initialValue: String,
        isRequired: Boolean
    },

    data()
    {
        return {
            vatValue: ""
        }
    },

    computed:
    {
        vatId()
        {
            const vatId = this.isEU ? this.vatPrefix + this.vatValue : "";

            return vatId;
        },

        vatPrefix()
        {
            const selectedCountry = this.$store.state.localization.shippingCountries.find(country => country.id === this.selectedCountryId);
            
            return selectedCountry.vatCode;
        },

        isEU()
        {
            return !!this.vatPrefix && this.vatPrefix.length > 0;
        }
    },

    watch:
    {
        vatId(newvatId, oldvatId)
        {
            this.$emit('input', newvatId);
        }
    },

    created()
    {
        if (this.initialValue && this.initialValue.length > 0)
        {
            const initialPrefix = this.initialValue.slice(0, 2);
            const initialValue = this.initialValue.slice(2);

            if(initialPrefix === this.vatPrefix)
            {
                this.vatValue = initialValue;
            }
        } 
    },

    methods:
    {
        transformTranslation(translationKey, locale, addressKey)
        {
            const translation = this.$translate(translationKey);

            return translation + (this.isRequired ? "*" : "");
        }
    }
}
</script>