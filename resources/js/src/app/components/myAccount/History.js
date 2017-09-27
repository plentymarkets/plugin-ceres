Vue.component("history", {

    props: [
        "template",
        "orderList",
        "ordersPerPage",
        "isReturnActive"
    ],

    data()
    {
        return {
            returnsFirstOpened: false
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

                this.$broadcast("returns-first-opening");
            }
        }
    }
});
