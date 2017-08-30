Vue.component("order-properties", {

    props: [
        "template",
        "item"
    ],

    created()
    {
        this.$options.template = this.template;
    }
});
