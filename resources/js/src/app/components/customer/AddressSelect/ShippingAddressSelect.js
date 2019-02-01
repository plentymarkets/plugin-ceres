Vue.component("shipping-address-select", {

    delimiters: ["${", "}"],

    template: `
        <address-select
            ref:shipping-address-select
            template="#vue-address-select"
            @address-changed="addressChanged"
            address-type="2"
            :optional-address-fields="optionalAddressFields"
            :required-address-fields="requiredAddressFields">
        </address-select>
    `,

    props: {
        optionalAddressFields: {
            type: Object,
            default: () =>
            {
                return {};
            }
        },
        requiredAddressFields: {
            type: Object,
            default: () =>
            {
                return {};
            }
        }
    },

    computed: Vuex.mapState({
        deliveryAddressId: state => state.address.deliveryAddressId
    }),

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
