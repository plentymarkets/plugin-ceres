var ResourceService = require("services/ResourceService");

Vue.component("invoice-address-select", {

    template: "<address-select template=\"#vue-address-select\" v-on:address-changed=\"addressChanged\" address-type=\"1\" :address-list=\"addressList\" :selected-address-id=\"selectedAddressId\" class='{error: checkoutValidation.invoiceAddress.showError}'></address-select>",

    props: [
        "addressList",
        "selectedAddressId"
    ],

    data: function()
    {
        return {
            checkout: {},
            checkoutValidation: {}
        };
    },

    /**
     * Initialise the event listener
     */
    created: function()
    {
        ResourceService.bind("checkout", this);
        ResourceService.bind("checkoutValidation", this);
    },

    methods:
    {
        /**
         * Update the invoice address
         * @param selectedAddress
         */
        addressChanged: function(selectedAddress)
        {
            this.checkout.billingAddressId = selectedAddress.id;
            ResourceService.getResource("checkout").set(this.checkout);
        }
    },

    computed:
    {
        isValid: function()
        {
            this.checkoutValidation.invoiceAddress.isValid = this.selectedAddress.id > 0;
        }
    }
});
