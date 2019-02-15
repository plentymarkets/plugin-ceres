Vue.component("my-account", {

    template: `
    <div>
        <slot>
        </slot>
    </div>
    `,

    props: {
        deliveryAddressList: Array,
        selectedDeliveryAddress: Number,
        billingAddressList: Array,
        selectedBillingAddress: Number
    },

    created()
    {
        this.$store.dispatch("initBillingAddress", { id: this.selectedBillingAddress, addressList: this.billingAddressList });
        this.$store.dispatch("initDeliveryAddress", { id: this.selectedDeliveryAddress, addressList: this.deliveryAddressList });
    }
});
