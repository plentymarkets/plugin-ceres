var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            itemList: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ItemListService.setSearchParams(document.location.search);
    }
});
