import Vue from "vue";
import OrderHistory from "./OrderHistory";
import OrderReturnHistory from "./OrderReturnHistory";

export default Vue.component("history", {

    components:
    {
        OrderHistory,
        OrderReturnHistory
    },

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
