Vue.component("order-return-item", {

    props: [
        "orderData",
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
        }
    }
});
