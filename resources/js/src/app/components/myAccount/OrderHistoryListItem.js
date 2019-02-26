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
            orderDetails: ""
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
                    this.orderDetails = orderDetails;

                    const compiled = Vue.compile(this.$refs.orderDetailsContainer.outerHTML);
                    const component = new Vue({
                        store: window.ceresStore,
                        render: compiled.render,
                        staticRenderFns: compiled.staticRenderFns
                    });

                    component.$mount(this.$refs.orderDetailsContainer);
                });
        },

        getOrderDocument()
        {
            // $router->get('order-document/{documentId}', 'IO\Controllers\DocumentController@download');
        }
    }
});
