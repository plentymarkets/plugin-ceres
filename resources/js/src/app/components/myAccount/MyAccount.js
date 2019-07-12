Vue.component("my-account", {

    template: `
    <div>
        <slot>
        </slot>
    </div>
    `,

    props: {
        deliveryAddressList:
        {
            type: Array,
            default: () =>
                []
        },
        selectedDeliveryAddress:
        {
            type: Number,
            default: -99
        },
        billingAddressList:
        {
            type: Array,
            default: () =>
                []
        },
        selectedBillingAddress:
        {
            type: Number,
            default: 0
        }
    },

    created()
    {
        this.$store.dispatch("initBillingAddress", { id: this.selectedBillingAddress, addressList: this.billingAddressList });
        this.$store.dispatch("initDeliveryAddress", { id: this.selectedDeliveryAddress, addressList: this.deliveryAddressList });
    }
});
