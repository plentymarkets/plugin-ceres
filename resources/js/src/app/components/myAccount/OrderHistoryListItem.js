import Vue from "vue";
import TranslationService from "../../services/TranslationService";
const ApiService = require("../../services/ApiService");

export default Vue.component("order-history-list-item", {

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

                const testing = window.ceresEnv !== "testing" ? "" : "&env=testing";

                ApiService
                    .get("/rest/io/order/template?template=" + this.orderDetailsTemplate + "&orderId=" + this.order.id + testing)
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
        },

        getWarrantyTooltip(referenceOrderId)
        {
            return TranslationService.translate("Ceres::Template.orderHistoryWarranty", { id: referenceOrderId });
        }
    }
});
