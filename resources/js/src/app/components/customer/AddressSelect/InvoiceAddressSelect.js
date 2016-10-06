var CheckoutService = require("services/CheckoutService");

Vue.component("invoice-address-select", {

    template: "<address-select v-on:address-changed=\"addressChanged\" address-type=\"1\" :address-list=\"addressList\" :selected-address-id=\"selectedAddressId\"></address-select>",

    props: ["addressList", "selectedAddressId"],

    /**
     * init event listener
     */
    created: function()
    {
        this.addEventListener();
        CheckoutService.init();
    },

    methods: {
        /**
         * add event listener
         */
        addEventListener: function()
        {
            // listen on APIService events and handle new data
        },

        /**
         * update the billing address
         * @param selectedAddress
         */
        addressChanged: function(selectedAddress)
        {
            CheckoutService.setBillingAddressId(selectedAddress.id);
        }
    }
});
