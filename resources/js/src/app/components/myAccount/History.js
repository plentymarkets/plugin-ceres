Vue.component("history", {

    props: [
        "template",
        "orderList",
        "ordersPerPage"
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
