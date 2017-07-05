var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-filter", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "facet"
    ],

    data: function()
    {
        return {
            facetParams: [],
            isLoading: false
        };
    },

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter";
        ResourceService.bind("facetParams", this);
    },

    mounted: function()
    {
        this.$nextTick(() =>
        {
            ResourceService.bind("isLoading", this);
        });
    },

    methods:
    {
        updateFacet: function()
        {
            ResourceService.getResource("facetParams").set(this.facetParams);
            ItemListService.setFacets(this.facetParams);
            ItemListService.getItemList();
        }
    }
});
