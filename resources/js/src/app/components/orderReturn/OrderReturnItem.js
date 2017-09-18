Vue.component("order-return-item", {

    props: [
        "orderItem",
        "template"
    ],

    data()
	{
        return {
            isChecked: false,
            returnCount: 0
        };
    },

    created()
	{
        this.$options.template = this.template;
    },

    computed:
    {
        orderItemImage()
		{
            return this.$store.getters.getOrderItemImage(this.orderItem.itemVariationId);
        },

        orderItemURL()
		{
            return this.$store.getters.getOrderItemURL(this.orderItem.itemVariationId);
        }
    },

    methods:
    {
        validateValue()
		{
            if (this.returnCount > this.orderItem.quantity)
			{
                this.returnCount = this.orderItem.quantity;
            }
            else if (this.returnCount <= 0)
			{
                this.returnCount = 1;
            }

            this.$store.commit("updateOrderReturnItems", {orderItemQuantity: parseInt(this.returnCount), orderItem: this.orderItem});
        },

        updateValue(event)
		{
            if (event.currentTarget.checked)
			{
                this.returnCount = 1;
            }
            else
			{
                this.returnCount = 0;
            }

            this.$store.commit("updateOrderReturnItems", {orderItemQuantity: parseInt(this.returnCount), orderItem: this.orderItem});
        }
    }
});
