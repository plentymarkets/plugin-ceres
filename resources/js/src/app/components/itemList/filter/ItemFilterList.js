Vue.component("vue-item-filter-list", {

    props: [
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter-list";
    }
});
