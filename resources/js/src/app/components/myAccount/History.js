Vue.component("history", {

    props: {
        template: String,
        ordersPerPage: Number,
        isReturnActive: Boolean,
        contactHasReturns: Boolean
    },

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

                vueEventHub.$emit("returns-first-opening");
            }
        }
    }
});
