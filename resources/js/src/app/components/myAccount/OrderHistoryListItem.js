import Vue from "vue";
const ApiService = require("../../services/ApiService");

Vue.component("order-history-list-item", {

    props:
    {
        template:
        {
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
            default: true
        },
        allowReturn:
        {
            type: Boolean,
            default: true
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
                            data: {
                                showAllOrderItems: this.showAllOrderItems,
                                allowPaymentProviderChange: this.allowPaymentProviderChange,
                                allowReturn: this.allowReturn
                            },
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
