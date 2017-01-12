Vue.component("coupon", {

    template: "#vue-coupon",

    props: [
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

});
