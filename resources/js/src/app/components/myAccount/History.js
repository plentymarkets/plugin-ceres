Vue.component("history", {

    props: [
        "template",
        "orderListData",
        "ordersPerPage",
        "isReturnActive",
        "contactHasReturns"
    ],

    data()
    {
        return {
            returnsFirstOpened: false,
            orderList: this.orderListData
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        returnsTabsOpened()
        {
            if (!this.returnsFirstOpened)
            {
                this.returnsFirstOpened = true;

                vueEventHub.$emit("returns-first-opening");
            }
        },

        onOrderListChanged(newOrderList)
        {
            console.log("onOrderListChanged", newOrderList);
            this.orderList = newOrderList;
        }
    }
});
