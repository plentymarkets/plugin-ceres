var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    template: "#vue-item-list",

    props: [
        "testData"
    ],

    data: function()
    {
        return {
            itemList: {},
            itemSearch: {}
        };
    },

    created: function()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("itemSearch", this);

        ItemListService.setSearchParams(document.location.search);
    }
});
