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
            itemSearch: {}
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

        ItemListService.setSearchParams(document.location.search);
    }
});
