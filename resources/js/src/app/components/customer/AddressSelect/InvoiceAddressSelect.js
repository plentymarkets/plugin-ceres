Vue.component("invoice-address-select", {

    template: `
        <address-select 
            v-ref:invoice-address-select
            template="#vue-address-select"
            v-on:address-changed="addressChanged"
            address-type="1"
            :address-list="addressList"
            :selected-address-id="selectedAddressId"
            :show-error='showError'
            :country-name-map="countryNameMap">
        </address-select>
    `,

    props: [
        "addressList",
        "hasToValidate",
        "selectedAddressId",
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
    ready()
    {
        if (App.isCheckoutView && this.addressList.length <= 0)
        {
            this.$refs.invoiceAddressSelect.showInitialAddModal();
        }
        else if (this.addressList.length)
        {
            this.addressChanged(this.addressList[0]);
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
            this.$store.dispatch("selectBillingAddress", selectedAddress)
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
            this.showError = this.billingAddressId <= 0;
        }
    }
});
