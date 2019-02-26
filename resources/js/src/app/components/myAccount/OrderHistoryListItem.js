Vue.component("order-history-list-item", {

    props:
    {
        template: {
            type: String,
            default: "#vue-order-list-item"
        },
        orderDetailsTemplate:
        {
            type: String,
            default: "Ceres::MyAccount.Partials.OrderHistoryItemDetails"
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
        loadOrderDetailTemplate()
        {
        }
    }
});
