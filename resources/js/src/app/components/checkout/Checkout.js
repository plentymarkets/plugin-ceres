Vue.component("checkout", {

    props: [
        "template",
        "checkout"
    ],

    created: function()
    {
        this.$options.template = this.template;

        this.$store.dispatch("setCheckout", this.checkout);
    },

    methods:
    {
    }
});
