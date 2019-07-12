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
        vueEventHub.$on("select-all-items", () => this.selectItem());
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

            this.$store.commit("updateOrderReturnItems", { quantity: parseInt(this.returnCount), orderItem: this.orderItem });
        },

        selectItem()
        {
            this.isChecked = true;

            this.updateValue();
        },

        updateValue()
        {
            if (this.isChecked)
            {
                this.returnCount = this.orderItem.quantity;
            }
            else
            {
                this.returnCount = 0;
            }

            this.$store.commit("updateOrderReturnItems", { quantity: parseInt(this.returnCount), orderItem: this.orderItem });
        }
    }
});
