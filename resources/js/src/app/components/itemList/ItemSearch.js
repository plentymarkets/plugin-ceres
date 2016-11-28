var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-search", {

    template: "#vue-item-search",

    props: [],

    data: function()
    {
        return {
            searchString: "",
            itemList: {}
        };
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
    },

    methods:
    {
        search: function()
        {
            ItemListService.setSearchString(this.searchString);
        }
    }
});
