var ResourceService = require("services/ResourceService");

Vue.component("item-list", {

    props: [
        "template",
        "itemList"
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
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("isLoading", this);
    }
});
