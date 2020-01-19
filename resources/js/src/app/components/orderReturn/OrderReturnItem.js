import Vue from "vue";

Vue.component("order-return-item", {

    props: {
        template:
        {
            type: String,
            default: "#vue-order-return-item"
        },
        orderItem:
        {
            type: Object,
            required: true
        },
        itemDetailsData:
        {
            type: Array,
            default: () => []
        },
        isNet:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
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
        },

        variation()
        {
            return this.$store.getters.getOrderItemVariation(this.orderItem.itemVariationId);
        },

        amount()
        {
            return this.orderItem.amounts.find((amount) => !amount.isSystemCurrency) || this.orderItem.amounts[0];
        }
    },

    methods:
    {
        updateQuantity(quantity)
        {
            this.returnCount = quantity;
            if (this.returnCount > this.orderItem.quantity)
            {
                this.returnCount = this.orderItem.quantity;
            }
            else if (this.returnCount < 0)
            {
                this.returnCount = 0;
            }

            this.$store.commit("updateOrderReturnItems", { quantity: parseInt(this.returnCount), orderItem: this.orderItem });
        },

        selectItem()
        {
            this.returnCount = this.orderItem.quantity;
        },

        isDataFieldVisible(value)
        {
            return this.itemDetailsData.includes(value);
        }
    }
});
