var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");
var ItemListService = require("services/ItemListService");

Vue.component("item-filter-list", {

    props: [
        "template",
        "facets"
    ],

    data: function()
    {
        return {
            isActive: false
        };
    },

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter-list";
        ResourceService.bind("facets", this);

        var urlParams = UrlService.getUrlParams(document.location.search);

        if (urlParams.facets)
        {
            // ResourceService.getResource("facetParams").set(urlParams.facets.split(","));
            ItemListService.setFacets(urlParams.facets.split(","));
        }
    },

    methods:
    {
        toggleOpeningState: function()
        {
            window.setTimeout(function()
            {
                this.isActive = !this.isActive;
            }.bind(this), 300);
        }
    }
});
