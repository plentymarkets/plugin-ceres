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
            if (document.location.pathname == "/search")
            {
                ItemListService.setSearchString(this.searchString);
            }
            else
            {
                window.open("/search?searchString=" + this.searchString, "_self", false);
            }
        }
    }
});
