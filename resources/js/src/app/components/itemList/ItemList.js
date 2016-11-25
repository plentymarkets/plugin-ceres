var ResourceService = require("services/ResourceService");

Vue.component("item-list", {

    template: "#vue-item-list",

    props: [],

    data: function()
    {
        return {
            itemList: {}
        };
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
    },

    methods:
    {
    }
});
