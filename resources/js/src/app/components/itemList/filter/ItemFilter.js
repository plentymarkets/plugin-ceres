Vue.component("item-filter", {

    props: [
        "template",
        "facet"
    ],

    data: function()
    {
        return {
            selected: []
        };
    },

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter";
    }
});
