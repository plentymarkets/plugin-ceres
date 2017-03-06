var FilterService   = require("services/ItemFilterService");
var ResourceService = require("services/ResourceService");

Vue.component("item-filter", {

    props: [
        "template",
        "facet",
        "categoryId"
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

    ready: function()
    {
        ResourceService.bind("isLoading", this);
    },

    methods:
    {
        updateFacet: function()
        {
            FilterService.applyFacets(this.facetParams, this.categoryId);
        }
    }
});
