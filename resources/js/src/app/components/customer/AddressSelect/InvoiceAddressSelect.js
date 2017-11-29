Vue.component("invoice-address-select", {

    delimiters: ["${", "}"],

    template: `
        <address-select 
            ref="invoice"
            template="#vue-address-select"
            v-on:address-changed="addressChanged"
            address-type="1"
            :show-error='showError'
            :country-name-map="countryNameMap">
        </address-select>
    `,

    props: [
        "selectedAddressId",
        "addressList",
        "hasToValidate",
        "countryNameMap"
    ],

    computed: Vuex.mapState({
        billingAddressId: state => state.address.billingAddressId,
        showError: state => state.checkout.validation.invoiceAddress.showError
    }),

    /**
     * Initialise the event listener
     */
    created()
    {
        this.$store.dispatch("initBillingAddress", {id: this.selectedAddressId, addressList: this.addressList});

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
            if (App.isCheckoutView && this.addressList && this.addressList.length <= 0)
            {
                this.$refs.invoice.showInitialAddModal();
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
            this.$store.dispatch("selectAddress", {selectedAddress, addressType: "1"})
                .then(
                response =>
                {
                    document.dispatchEvent(new CustomEvent("afterInvoiceAddressChanged", {detail: this.billingAddressId}));
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
            this.$store.commit("setInvoiceAddressShowError", this.billingAddressId <= 0);
        }
    }
});
