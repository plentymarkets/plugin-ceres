var FilterService = require("services/ItemFilterService");

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

        this.selected = FilterService.getFilterValuesByName(this.facet.names[0].name);
    }
});
