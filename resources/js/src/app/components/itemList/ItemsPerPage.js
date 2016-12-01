var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("items-per-page", {

    template: "#vue-items-per-page",

    props: [
        "paginationValues"
    ],

    data: function()
    {
        return {
            itemSearch: {}
        };
    },

    created: function()
    {
        this.selectedElement = this.paginationValues[0];
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
