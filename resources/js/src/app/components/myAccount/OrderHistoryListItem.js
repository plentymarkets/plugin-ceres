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
        },
        allowPaymentProviderChange:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
            waiting: false,
            isDataLoaded: false,
            showAllOrderItems: false
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
            if (!this.waiting && !this.isDataLoaded)
            {
                this.waiting = true;

                ApiService
                    .get("/rest/io/order/template?template=" + this.orderDetailsTemplate + "&orderId=" + this.order.id)
                    .done(orderDetails =>
                    {
                        const compiled = Vue.compile(orderDetails);
                        const component = new Vue({
                            data: { showAllOrderItems: this.showAllOrderItems, allowPaymentProviderChange: this.allowPaymentProviderChange },
                            store: window.ceresStore,
                            render: compiled.render,
                            staticRenderFns: compiled.staticRenderFns
                        });

                        component.$mount(this.$refs.orderDetailsContainer);

                        this.isDataLoaded = true;
                    })
                    .always(() =>
                    {
                        this.waiting = true;
                    });
            }
        }
    }
});
