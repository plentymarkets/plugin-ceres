Vue.component("order-list-item", {

    props:
    {
        template: {
            type: String,
            default: "#vue-order-list-item"
        },
        orderDetailsTemplate:
        {
            type: String,
            default: "Ceres::Checkout.OrderDetails"
        }
    },

    data()
    {
        return {

        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
    }
});
