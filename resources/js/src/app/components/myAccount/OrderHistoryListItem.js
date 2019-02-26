import ApiService from "services/ApiService";

Vue.component("order-history-list-item", {

    props:
    {
        template: {
            type: String,
            default: "#vue-order-history-list-item"
        },
        orderDetailsTemplate:
        {
            type: String,
            default: "Ceres::MyAccount.Partials.OrderHistoryListItemDetails"
        },
        order:
        {
            type: Object,
            required: true
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
            ApiService
                .get("/rest/io/order/template?template=" + this.orderDetailsTemplate + "&orderId=" + this.order.id)
                .done(orderDetails =>
                {
                    const compiled = Vue.compile(orderDetails);
                    const component = new Vue({
                        store: window.ceresStore,
                        render: compiled.render,
                        staticRenderFns: compiled.staticRenderFns
                    });

                    component.$mount(this.$refs.orderDetailsContainer);
                });
        }
    }
});
