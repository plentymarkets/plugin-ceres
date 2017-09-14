Vue.component("order-return", {

    props: [
        "orderData",
        "template"
    ],

    data()
    {
        return {
        };
    },

    created()
    {
        this.$options.template = this.template;

        console.log(this.orderData);
    }
});
