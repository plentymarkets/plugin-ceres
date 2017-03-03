var ResourceService = require("services/ResourceService");
var FilterService   = require("services/ItemFilterService");

Vue.component("item-filter-tag-list", {

    props: [
        "template",
        "facets",
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
        this.$options.template = this.template || "#vue-item-filter-tag-list";
        ResourceService.bind("facetParams", this);
    },

    methods:
    {
        removeTag: function(tagId)
        {
            this.facetParams.splice(this.facetParams.indexOf(tagId.toString()), 1);
            FilterService.applyFacets(this.facetParams, this.categoryId);
        }
    },

    computed:
    {
        tagList: function()
        {
            var tagList = [];

            if (this.facetParams.length > 0)
            {
                for (var facetKey in this.facets)
                {
                    for (var facetItemKey in this.facets[facetKey].values)
                    {
                        if (this.facetParams.indexOf(this.facets[facetKey].values[facetItemKey].id.toString()) > -1)
                        {
                            tagList.push(this.facets[facetKey].values[facetItemKey]);
                        }
                    }
                }
            }

            return tagList;
        }
    }
});
