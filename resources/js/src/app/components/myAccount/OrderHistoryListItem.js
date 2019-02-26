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
        orderId:
        {
            type: Number,
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
                .get("/rest/io/order/template?template=" + this.orderDetailsTemplate + "&orderId=" + this.orderId)
                .done(orderDetails =>
                {
                    this.orderDetails = orderDetails;
                });
        },

        getOrderDocument()
        {
            // $router->get('order-document/{documentId}', 'IO\Controllers\DocumentController@download');
        }
    }
});
