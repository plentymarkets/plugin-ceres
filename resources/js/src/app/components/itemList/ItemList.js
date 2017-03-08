var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    props: [
        "categoryId",
        "itemList",
        "template"
    ],

    data: function()
    {
        return {
            isLoading: false,
            filterListState: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
        ResourceService.getResource("itemList").set(this.itemList);

        ItemListService.setCategoryId(this.categoryId);
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("isLoading", this);
    }
});
