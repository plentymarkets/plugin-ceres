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
            facetParams: []
        };
    },

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter";
        ResourceService.bind("facetParams", this);
    },

    computed:
    {
        selectedNames: function()
        {
            if (this.facetParams.length > 0)
            {
                var names = [];

                for (var selectedFacetId in this.facetParams)
                {
                    for (var facetIndex in this.facet.values)
                    {
                        if ( this.facet.values[facetIndex].id == this.facetParams[selectedFacetId] &&
                             names.indexOf(this.facet.values[facetIndex].names[0].name) == -1)
                        {
                            names.push(this.facet.values[facetIndex].names[0].name);
                        }
                    }
                }

                return names;
            }

            return "";
        }
    },

    methods:
    {
        updateFacet: function()
        {
            FilterService.applyFacets(this.facetParams, this.categoryId);
        }
    }
});
