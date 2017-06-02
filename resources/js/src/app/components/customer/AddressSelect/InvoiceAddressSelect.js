var ResourceService = require("services/ResourceService");

Vue.component("invoice-address-select", {

    template: "<address-select v-ref:invoice-address-select template=\"#vue-address-select\" v-on:address-changed=\"addressChanged\" address-type=\"1\" :address-list=\"addressList\" :selected-address-id=\"selectedAddressId\" :show-error='checkoutValidation.invoiceAddress.showError'></address-select>",

    props: [
        "addressList",
        "hasToValidate",
        "selectedAddressId"
    ],

    data()
    {
        return {
            checkout: {},
            checkoutValidation: {invoiceAddress: {}}
        };
    },

    /**
     * Initialise the event listener
     */
    created()
    {
        ResourceService.bind("checkout", this);

        if (this.hasToValidate)
        {
            ResourceService.bind("checkoutValidation", this);

            this.checkoutValidation.invoiceAddress.validate = this.validate;
        }
    },

    /**
     * If no address is related to the user, a popup will open to add an address
     */
    ready()
    {
        if (App.isCheckoutView && this.addressList.length <= 0)
        {
            this.$refs.invoiceAddressSelect.showInitialAddModal();
        }
    },

    methods:
    {
        /**
         * Update the invoice address
         * @param selectedAddress
         */
        addressChanged(selectedAddress)
        {
            this.checkout.billingAddressId = selectedAddress.id;

            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(function()
                {
                    document.dispatchEvent(new CustomEvent("afterInvoiceAddressChanged", {detail: this.checkout.billingAddressId}));
                }.bind(this));

            if (this.hasToValidate)
            {
                this.validate();
            }
        },

        validate()
        {
            this.checkoutValidation.invoiceAddress.showError = this.checkout.billingAddressId <= 0;
        }
    }
});
