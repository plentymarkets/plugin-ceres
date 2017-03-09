var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-filter", {

    props: [
        "template",
        "facet"
    ],

    data: function()
    {
        return {
            searchParams: [],
            isLoading: false
        };
    },

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter";

        ResourceService.bind("searchParams", this);
    },

    ready: function()
    {
        ResourceService.bind("isLoading", this);
    },

    methods:
    {
        updateFacet: function()
        {
            ItemListService.setFacets(this.searchParams.facetParams);
            ItemListService.getItemList();
        }
    }
});
