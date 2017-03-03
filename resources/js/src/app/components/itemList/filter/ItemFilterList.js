var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");

Vue.component("item-filter-list", {

    props: [
        "template",
        "facets",
        "categoryId"
    ],

    created: function()
    {
        ResourceService.bind("facets", this);

        this.$options.template = this.template || "#vue-item-filter-list";

        var urlParams = UrlService.getUrlParams(document.location.search);

        if (urlParams.facets)
        {
            ResourceService.getResource("facetParams").set(urlParams.facets.split(","));
        }
    }
});
