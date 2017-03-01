var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            itemList: {},
            itemSearch: {},
            filteredItemList: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("itemSearch", this);
        ResourceService.bind("filteredItemList", this);

        ItemListService.setSearchParams(document.location.search);
    }
});
