const ModalService        = require("services/ModalService");
const ApiService          = require("services/ApiService");

Vue.component("change-payment-method", {

    props: [
        "template",
        "currentOrder",
        "allowedPaymentMethods"
    ],

    data()
    {
        return {
            isChangePossible: false,
            changePaymentModal: {},
            encodedPaymentMethods: {},
            paymentMethod: 0
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
        this.isChangePossible = this.checkChangeAllowed();

        this.encodedPaymentMethods = JSON.parse(this.allowedPaymentMethods);
    },

    methods:
    {
        checkChangeAllowed()
        {
            return true;
        },

        openPaymentChangeModal()
        {
            this.getInitialPaymentMethod();

            this.changePaymentModal.show();
        },

        closeModal()
        {
            this.changePaymentModal.hide();
        },

        updateOrderHistory(updatedOrder)
        {
            this.currentOrder = updatedOrder;

            this.closeModal();
        },

        changePaymentMethod()
        {
            ApiService.post("/rest/io/order/payment", {orderId: this.currentOrder.order.id, paymentMethodId: this.paymentMethod})
                .done(response =>
                {
                    this.updateOrderHistory(response);
                })
                .fail(() =>
                {
                    this.closeModal();
                });
        },

        getInitialPaymentMethod()
        {
            for (const index in this.currentOrder.order.properties)
            {
                if (this.currentOrder.order.properties[index].typeId === 3)
                {
                    this.paymentMethod = this.currentOrder.order.properties[index].value;
                }
            }

            return false;
        }
    }

});
