Vue.component("coupon", {

    props: [
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    }

});
