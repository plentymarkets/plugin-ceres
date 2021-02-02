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
                :value="vatNumber"
                data-autofocus
                data-testing="vat-id"
                @input="onVatNumberChange($event)"
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
            const regex = new RegExp(/([^\d]*)(\d*)/);
            const values = regex.exec(this.value);

            if (!this.selectedCountry.vatCodes.find(vatCode => vatCode === values[1]))
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
            this.$emit('input', this.vatPrefix + this.vatNumber);
        },

        deleteValue()
        {
            this.vatNumber = "";
            this.vatPrefix = this.selectedCountry.vatCodes && this.selectedCountry.vatCodes[0] ? this.selectedCountry.vatCodes[0] : "";

            this.emitChange();
        },

        onVatNumberChange(event)
        {
            // Remove letters from value
            event.target.value = event.target.value.replace(/[^\d]/g,'')

            this.$emit('input', this.vatPrefix + event.target.value);
        },

        setValues(value)
        {
            if (value && value.length > 0)
            {
                // Splits value in numbers and letters
                const regex = new RegExp(/([^\d]*)(\d*)/);
                const values = regex.exec(value);

                this.isPrefixValid = !!this.vatCodes.find(code => code === values[1]);

                if (this.isPrefixValid)
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
            else
            {
                this.isPrefixValid = true;
            }
        }
    }
}
</script>