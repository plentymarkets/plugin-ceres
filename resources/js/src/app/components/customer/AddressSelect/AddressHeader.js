import Vue from "vue";

export default Vue.component("address-header", {

    props: {
        template: {
            type: String,
            default: "#vue-address-header"
        },
        address: {
            type: Object,
            required: true
        },
        addressFields:
        {
            type: Array,
            default: () =>
            {
                return [
                    "email",
                    "title",
                    "contactPerson",
                    "name1",
                    "name2",
                    "name3",
                    "name4",
                    "address1",
                    "address2",
                    "address3",
                    "address4",
                    "postalCode",
                    "town",
                    "country"
                ];
            }
        }
    },

    methods:
    {
        getCountryName(countryId)
        {
            return this.$store.getters.getCountryName(countryId);
        },

        isAddressFieldEnabled(fieldName)
        {
            return this.addressFields.includes(fieldName);
        }
    },

    filters:
    {
        optionType(selectedAddress, typeId)
        {
            // TODO DUPLICATE (Address Select) - move to vuex
            if (selectedAddress && selectedAddress.options)
            {
                for (const optionType of selectedAddress.options)
                {
                    if (optionType.typeId === typeId)
                    {
                        return optionType.value;
                    }
                }
            }

            return "";
        }
    }
});
