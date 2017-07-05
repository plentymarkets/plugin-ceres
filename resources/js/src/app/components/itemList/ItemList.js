var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    delimiters: ["${", "}"],

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

    mounted: function()
    {
        this.$nextTick(() =>
        {
            ResourceService.bind("itemList", this);
            ResourceService.bind("isLoading", this);
        });
    }
});
