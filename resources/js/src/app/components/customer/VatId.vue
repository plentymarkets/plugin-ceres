<template>
    <div
        class="input-unit"
        data-model="vatNumber"
        v-if="vatPrefix && vatPrefix.length > 0">
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
        isRequired: Boolean
    },

    data()
    {
        return {
            vatValue: ""
        }
    },

    computed: {
        vatId()
        {
            const vatId = this.vatPrefix && this.vatPrefix.length > 0 ? this.vatPrefix + this.vatValue : "";
            return vatId;
        },

        vatPrefix()
        {
            const selectedCountry = this.$store.state.localization.shippingCountries.find(country => country.id === this.selectedCountryId);
            
            return selectedCountry.vatCode;
        }
    },

    watch: {
        vatId(newvatId, oldvatId)
        {
            const vatId = this.vatPrefix && this.vatPrefix.length > 0 ? newvatId : "";
            this.$emit('input', vatId);
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