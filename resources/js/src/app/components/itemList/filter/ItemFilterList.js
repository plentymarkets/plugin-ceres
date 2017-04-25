var ResourceService = require("services/ResourceService");

import UrlService from "services/UrlService";

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
        ResourceService.bind("facets", this);

        this.$options.template = this.template || "#vue-item-filter-list";

        var urlParams = UrlService.getUrlParams(document.location.search);

        if (urlParams.facets)
        {
            ResourceService.getResource("facetParams").set(urlParams.facets.split(","));
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
