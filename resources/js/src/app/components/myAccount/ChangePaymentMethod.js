const ModalService        = require("services/ModalService");
const ApiService          = require("services/ApiService");

Vue.component("change-payment-method", {

    props: [
        "template",
        "currentOrder",
        "allowedPaymentMethods",
        "changePossible"
    ],

    data()
    {
        return {
            changePaymentModal: {},
            encodedPaymentMethods: {},
            paymentMethod: 0,
            isPending: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    /**
     * Initialize the change payment modal
     */
    ready()
    {
        this.changePaymentModal = ModalService.findModal(this.$els.changePaymentModal);
        this.encodedPaymentMethods = JSON.parse(this.allowedPaymentMethods);
    },

    methods:
    {
        checkChangeAllowed()
        {
            ApiService.get("/rest/io/order/payment", {orderId: this.currentOrder.order.id, paymentMethodId: this.paymentMethod})
                .done(response =>
                {
                    this.changePossible = response;
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

        closeModal()
        {
            this.changePaymentModal.hide();
            this.isPending = false;
        },

        updateOrderHistory(updatedOrder)
        {
            // this.currentOrder = updatedOrder;
            this.checkChangeAllowed();

            this.closeModal();
        },

        changePaymentMethod()
        {
            this.isPending = true;

            ApiService.post("/rest/io/order/payment", {orderId: this.currentOrder.order.id, paymentMethodId: this.paymentMethod})
                .done(response =>
                {
                    document.dispatchEvent(new CustomEvent("historyPaymentMethodChanged", {detail: {oldOrder: this.currentOrder, newOrder: response}}));

                    this.updateOrderHistory(response);
                })
                .fail(() =>
                {
                    this.closeModal();
                });
        }
    }

});
