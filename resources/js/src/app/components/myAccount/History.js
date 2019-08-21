import Vue from "vue";

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
