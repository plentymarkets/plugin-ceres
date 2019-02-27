import TranslationService from "services/TranslationService";

Vue.component("order-return-history-list-item", {

    props: {
        template:
        {
            type: String,
            default: "#vue-order-return-history-list-item"
        },
        returnOrder:
        {
            type: Object,
            default: function()
            {
                return {};
            }
        },
        itemsPerList:
        {
            type: Number,
            default: 5
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
        this.$options.template = this.template;
        // this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 4);
        this.itemsToRender = this.returnOrder.order.orderItems.slice(0, this.itemsPerList);
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
