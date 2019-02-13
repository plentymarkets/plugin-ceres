const ApiService = require("services/ApiService");

Vue.component("order-history-item", {

    delimiters: ["${", "}"],

    props: {
        template:
        {
            type: String,
            default: "#vue-order-history-item"
        },
        orderDetailsTemplate:
        {
            type: String,
            default: "Ceres::Checkout.OrderDetails"
        },
        order:
        {
            type: Object,
            default: () =>
            {}
        }
    },

    data()
    {
        return {
            isLoading: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        setCurrentOrder()
        {
            $("#dynamic-twig-content").html("");
            this.isLoading = true;

            Vue.nextTick(() =>
            {
                $(this.$refs.orderDetails).modal("show");
            });

            ApiService
                .get("/rest/io/order/template?template=" + this.orderDetailsTemplate + "&orderId=" + this.order.order.id)
                .done(response =>
                {
                    this.isLoading = false;
                    $("#dynamic-twig-content").html(response);
                });
        }
    }
});
