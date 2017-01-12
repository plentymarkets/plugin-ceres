var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("items-per-page", {

    props: [
        "paginationValues",
        "template"
    ],

    data: function()
    {
        return {
            itemSearch: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("itemSearch", this);
    },

    methods:
    {
        itemsPerPageChanged: function()
        {
            ItemListService.setItemsPerPage(this.itemSearch.itemsPerPage);
        }
    }
});
