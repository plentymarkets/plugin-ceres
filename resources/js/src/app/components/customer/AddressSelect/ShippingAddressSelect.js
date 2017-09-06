Vue.component("shipping-address-select", {

    template: `
        <address-select
            v-ref:shipping-address-select
            template="#vue-address-select"
            v-on:address-changed="addressChanged"
            address-type="2"
            :address-list="addressList"
            :selected-address-id="selectedAddressId"
            :country-name-map="countryNameMap">
        </address-select>
    `,

    props: [
        "addressList",
        "selectedAddressId",
        "countryNameMap"
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
        this.addressList.unshift({id: -99});

        this.$store.dispatch("initDeliveryAddress", {id: this.selectedAddressId, addressList: this.addressList});

        // if there is no selection for delivery address, the dummy entry will be selected
        if (this.selectedAddressId === 0)
        {
            this.selectedAddressId = -99;
            this.$store.dispatch("selectDeliveryAddress", {id: -99});
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
            this.$store.dispatch("selectDeliveryAddress", selectedAddress)
                .then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterDeliveryAddressChanged", {detail: this.deliveryAddressId}));
                    },
                    error =>
                    {

                    }
                );
        }
    }
});
