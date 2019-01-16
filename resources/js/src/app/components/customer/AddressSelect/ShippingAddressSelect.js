Vue.component("shipping-address-select", {

    delimiters: ["${", "}"],

    template: `
        <address-select
            ref:shipping-address-select
            template="#vue-address-select"
            v-on:address-changed="addressChanged"
            address-type="2">
        </address-select>
    `,

    props: [
        "selectedAddressId",
        "addressList"
    ],

    computed: Vuex.mapState({
        deliveryAddressId: state => state.address.deliveryAddressId
    }),

    created()
    {
        if (!this.addressList)
        {
            this.addressList = [];
        }
        // Adds the dummy entry for "delivery address same as invoice address"
        this.addressList.unshift({ id: -99 });
        this.$store.dispatch("initDeliveryAddress", { id: this.selectedAddressId === 0 ? -99 : this.selectedAddressId, addressList: this.addressList });
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
