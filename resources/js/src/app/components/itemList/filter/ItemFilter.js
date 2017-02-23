Vue.component("item-filter", {

    props: [
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template | "vue-item-filter";
    }
});
