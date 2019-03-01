Vue.component("order-return-history-list-item", {

    props: {
        template:
        {
            type: String,
            default: "#vue-order-return-history-list-item"
        },
        appearance:
        {
            type: String,
            default: "primary"
        },
        returnOrder:
        {
            type: Object,
            // eslint-disable-next-line
            default: () => {} 
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
            itemsToRender: [],
            showAllOrderItems: false
        };
    },

    created()
	{
        this.$options.template = this.template;
        this.itemsToRender = this.returnOrder.order.orderItems.slice(0, this.itemsPerList);
    },

    methods:
    {
        toggleShowAllOrderItems()
        {
            if (this.showAllOrderItems)
            {
                this.itemsToRender = this.returnOrder.order.orderItems;
            }
            else
            {
                this.itemsToRender = this.returnOrder.order.orderItems.slice(0, this.itemsPerList);
            }

            this.showAllOrderItems = !this.showAllOrderItems;
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
