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
            isLoading: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("isLoading", this);

        ItemListService.setSearchParams(document.location.search);
    }
});
