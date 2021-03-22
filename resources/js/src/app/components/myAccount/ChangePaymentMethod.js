const ModalService        = require("../../services/ModalService");
const ApiService          = require("../../services/ApiService");

import TranslationService from "../../services/TranslationService";
import Vue from "vue";

export default Vue.component("change-payment-method", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-change-payment-method"
        },
        currentOrder:
        {
            type: Object
        },
        allowedPaymentMethods:
        {
            type: Array
        },
        changePossible:
        {
            type: Boolean
        },
        paymentStatus:
        {
            type: String
        },
        currentTemplate:
        {
            type: String
        },
        currentPaymentMethodName:
        {
            type: String
        }
    },

    data()
    {
        return {
            compAllowedPaymentMethods: this.allowedPaymentMethods,
            changePaymentModal: {},
            paymentMethod: 0,
            isPending: false,
            showErrorMessage: false
        };
    },

    /**
     * Initialize the change payment modal
     */
    mounted()
    {
        this.$nextTick(() =>
        {
            this.changePaymentModal = ModalService.findModal(this.$refs.changePaymentModal);
        });
    },

    methods:
    {
        checkChangeAllowed()
        {
            ApiService.get("/rest/io/order/payment", { orderId: this.currentOrder.id, paymentMethodId: this.paymentMethod })
                .done(response =>
                {
                    // TODO: research - if response should be false, it returns an object
                    this.changePossible = typeof response === "object" ? response.data : response;

                    // Reload page because the order amounts could have changed because of payment method rebates or surcharges
                    window.location.reload();
                })
                .fail(() =>
                {
                    this.changePossible = false;
                });
        },

        openPaymentChangeModal()
        {
            this.changePaymentModal.show();
        },

        getPaymentStateText(paymentStates)
        {
            return TranslationService.translate(
                "Ceres::Template.orderHistoryPaymentStatus_" + paymentStates.find(paymentState => paymentState.typeId === 4).value
            );
        },

        getPaymentId(paymentIds)
        {
            const paymentId = paymentIds.find(paymentId => paymentId.typeId === 3).value;

            if (paymentId)
            {
                return paymentId;
            }

            return "";
        },

        closeModal()
        {
            this.changePaymentModal.hide();
            this.isPending = false;
        },

        updateOrderHistory(updatedOrder)
        {
            document.getElementById("payment_name_" + this.currentOrder.id).innerHTML = updatedOrder.paymentMethodName;
            document.getElementById("payment_state_" + this.currentOrder.id).innerHTML = this.getPaymentStateText(updatedOrder.order.properties);
            document.getElementById("current_payment_method_name_" + this.currentOrder.id).innerHTML = updatedOrder.paymentMethodName;

            this.checkChangeAllowed();
            this.closeModal();
        },

        updateAllowedPaymentMethods(paymentMethodId)
        {

            ApiService.get("/rest/io/order/paymentMethods", { orderId: this.currentOrder.id, paymentMethodId: paymentMethodId })
                .done(response =>
                {
                    this.compAllowedPaymentMethods = response;
                })
                .fail(() =>
                {
                });
        },

        changePaymentMethod()
        {
            this.isPending = true;

            ApiService.post("/rest/io/order/payment", { orderId: this.currentOrder.id, paymentMethodId: this.paymentMethod })
                .done(response =>
                {
                    document.dispatchEvent(new CustomEvent("historyPaymentMethodChanged", { detail: { oldOrder: this.currentOrder, newOrder: response } }));

                    this.updateOrderHistory(response);
                    this.updateAllowedPaymentMethods(this.getPaymentId(response.order.properties));
                })
                .fail(() =>
                {
                    // TODO add error msg
                });
        }
    },

    computed:
    {
        showIsSwitchableWarning()
        {
            const currentPaymentMethod = this.compAllowedPaymentMethods.find(paymentMethod =>
            {
                return paymentMethod.id === this.paymentMethod;
            });

            if (currentPaymentMethod)
            {
                return !currentPaymentMethod.isSwitchableFrom;
            }

            return false;
        }
    }

});
