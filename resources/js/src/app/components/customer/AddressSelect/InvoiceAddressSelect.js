import TranslationService from "../../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";
import { error } from "../../../services/NotificationService";
import AddressSelect from "./AddressSelect";

export default Vue.component("invoice-address-select", {

    components:
    {
        AddressSelect
    },

    template: `
        <address-select 
            ref="invoice"
            @address-changed="addressChanged"
            address-type="1"
            :show-error="showError"
            :optional-address-fields="optionalAddressFields"
            :required-address-fields="requiredAddressFields"
            :default-salutation="defaultSalutation"
            :padding-classes="paddingClasses"
            :padding-inline-styles="paddingInlineStyles"
            data-testing="billing-address-select">
        </address-select>
    `,

    props: {
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
        hasToValidate:
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
        billingAddressId: state => state.address.billingAddressId,
        billingAddressList: state => state.address.billingAddressList,
        showError: state => state.checkout.validation.invoiceAddress.showError
    }),

    /**
     * Initialise the event listener
     */
    created()
    {
        if (this.hasToValidate)
        {
            this.$store.commit("setInvoiceAddressValidator", this.validate);
        }
    },

    /**
     * If no address is related to the user, a popup will open to add an address
     */
    mounted()
    {
        this.$nextTick(() =>
        {
            if (!App.isShopBuilder && App.isCheckoutView && this.billingAddressList && this.billingAddressList.length <= 0)
            {
                this.$refs.invoice.showAddModal("initial");
            }
        });
    },

    methods:
    {
        /**
         * Update the invoice address
         * @param selectedAddress
         */
        addressChanged(selectedAddress)
        {
            this.$store.dispatch("selectAddress", { selectedAddress, addressType: "1" })
                .then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterInvoiceAddressChanged", { detail: this.billingAddressId }));
                    },
                    error =>
                    {

                    });

            if (this.hasToValidate)
            {
                this.validate();
            }
        },

        validate()
        {
            const showError = this.billingAddressId <= 0;

            this.$store.commit("setInvoiceAddressShowError", showError);

            if (showError)
            {
                error(
                    TranslationService.translate("Ceres::Template.checkoutCheckInvoiceAddress")
                );
            }
        }
    },

    watch:
    {
        billingAddressId()
        {
            if (this.hasToValidate && this.showError)
            {
                this.validate();
            }
        }
    }
});
