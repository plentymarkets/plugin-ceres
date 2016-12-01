var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    template: "#vue-item-list",

    data: function()
    {
        return {
            itemList: {}
        };
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ItemListService.setSearchParams(document.location.search);
    }
});
