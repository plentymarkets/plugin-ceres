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
        this.$options.template = this.template;
        this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 4);
    },

    methods:
    {
        toggleNaming(element)
        {
            if (document.getElementById(element).innerText === Translations.Template.myAccountReturnShowMore)
            {
                this.itemsToRender = this.returnOrder.order.orderItems;
                document.getElementById(element).innerText = Translations.Template.myAccountReturnShowLess;
            }
            else
            {
                this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 4);
                document.getElementById(element).innerText = Translations.Template.myAccountReturnShowMore;
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
