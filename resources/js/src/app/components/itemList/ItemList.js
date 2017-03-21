var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    props: [
        "categoryId",
        "template"
    ],

    data: function()
    {
        return {
            itemList: {},
            isLoading: false,
            filterListState: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ItemListService.setCategoryId(this.categoryId);
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("isLoading", this);
    }
});
