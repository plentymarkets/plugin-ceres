Vue.component("item-filter-list", {

    props: [
        "template",
        "facets"
    ],

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter-list";
    }
});
