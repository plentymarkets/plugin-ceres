import Vue from "vue";
import { mapState } from "vuex";
import AddressSelect from "./AddressSelect";

export default Vue.component("shipping-address-select", {

    components:
    {
        AddressSelect
    },

    template: `
        <address-select
            ref:shipping-address-select
            template="#vue-address-select"
            @address-changed="addressChanged"
            address-type="2"
            :optional-address-fields="optionalAddressFields"
            :required-address-fields="requiredAddressFields"
            :default-salutation="defaultSalutation"
            :padding-classes="paddingClasses"
            :padding-inline-styles="paddingInlineStyles"
            data-testing="delivery-address-select">
        </address-select>
    `,

    props:
    {
        optionalAddressFields:
        {
            type: Object,
            default: () =>
            {
                return {};
            }
        },
        requiredAddressFields:
        {
            type: Object,
            default: () =>
            {
                return {};
            }
        },
        defaultSalutation:
        {
            type: String,
            default: App.config.addresses.defaultSalutation
        },
        hasAnyPostOfficePreset:
        {
            type: Boolean,
            default: false
        },
        hasAnyParcelBoxPreset:
        {
            type: Boolean,
            default: false
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        }
    },

    computed: mapState({
        deliveryAddressId: state => state.address.deliveryAddressId
    }),

    mounted()
    {
        if (App.templateType === "my-account")
        {
            if (this.hasAnyParcelBoxPreset)
            {
                this.$store.commit("setParcelBoxAvailability", true);
            }
            if (this.hasAnyPostOfficePreset)
            {
                this.$store.commit("setPostOfficeAvailability", true);
            }
        }
    },

    methods:
    {
        /**
         * Update the delivery address
         * @param selectedAddress
         */
        addressChanged(selectedAddress)
        {
            this.$store.dispatch("selectAddress", { selectedAddress, addressType: "2" })
                .then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterDeliveryAddressChanged", { detail: this.deliveryAddressId }));
                    },
                    error =>
                    {

                    }
                );
        }
    }
});
