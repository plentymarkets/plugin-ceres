var ResourceService = require("services/ResourceService");

Vue.component("shipping-address-select", {

    template: "<address-select template=\"#vue-address-select\" v-on:address-changed=\"addressChanged\" address-type=\"2\" :address-list=\"addressList\" :selected-address-id=\"selectedAddressId\"></address-select>",

    props: [
        "addressList",
        "selectedAddressId"
    ],

    data: function()
    {
        return {
            checkout: {}
        };
    },

    /**
     * Initialise the event listener
     */
    created: function()
    {
        ResourceService.bind("checkout", this);

        if (!this.addressList)
        {
            this.addressList = [];
        }

        // Adds the dummy entry for "delivery address same as invoice address"
        this.addressList.unshift({
            id: -99
        });

        // if there is no selection for delivery address, the dummy entry will be selected
        if (this.selectedAddressId === 0)
        {
            this.selectedAddressId = -99;
            this.checkout.deliveryAddressId = -99;
            ResourceService.getResource("checkout").set(this.checkout);
        }
    },

    methods: {
        /**
         * Update the delivery address
         * @param selectedAddress
         */
        addressChanged: function(selectedAddress)
        {
            this.checkout.deliveryAddressId = selectedAddress.id;
            ResourceService.getResource("checkout")
                .set(this.checkout)
                .done(function()
                {
                    document.dispatchEvent(new CustomEvent("afterDeliveryAddressChanged", {detail: this.checkout.deliveryAddressId}));
                }.bind(this));
        }
    }
});
