Vue.component("history", {

    props: [
        "template",
        "orderList",
        "ordersPerPage",
        "returnsList"
    ],

    data()
    {
        return {
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
    }
});
