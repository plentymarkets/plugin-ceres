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
            // eslint-disable-next-line
            default: () => {} 
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
        this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 5);
    },

    methods:
    {
        toggleShowAllOrderItems()
        {
            this.showAllOrderItems = !this.showAllOrderItems;

            if (this.showAllOrderItems)
            {
                this.itemsToRender = this.returnOrder.order.orderItems;
            }
            else
            {
                this.itemsToRender = this.returnOrder.order.orderItems.slice(0, 5);
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
