import TranslationService from "services/TranslationService";

Vue.component("order-return-history-item", {

    props: {
        template:
        {
            type: String,
            default: "#vue-order-return-history-item"
        },
        returnOrder:
        {
            type: Object,
            default: function()
            {
                return {};
            }
        }
    },

    data()
    {
        return {
            itemsToRender: []
        };
    },

    created()
    {
        this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 4);
    },

    methods:
    {
        toggleNaming(element)
        {
            if (document.getElementById(element).innerText === TranslationService.translate("Ceres::Template.returnHistoryReturnShowMore"))
            {
                this.itemsToRender = this.returnOrder.order.orderItems;
                document.getElementById(element).innerText = TranslationService.translate("Ceres::Template.returnHistoryReturnShowLess");
            }
            else
            {
                this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 4);
                document.getElementById(element).innerText = TranslationService.translate("Ceres::Template.returnHistoryReturnShowMore");
            }
        },

        getOriginOrderId(order)
        {
            for (const orderRef of order.orderReferences)
            {
                if (orderRef.referenceType === "parent")
                {
                    return orderRef.referenceOrderId;
                }
            }

            return "-";
        }
    }
});
