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
            selectedElement: "",
            itemList: {}
        };
    },

    created: function()
    {
        this.selectedElement = this.paginationValues[0];
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
    },

    methods:
    {
        itemsPerPageChanged: function()
        {
            ItemListService.setItemsPerPage(this.selectedElement);
        }
    }
});
