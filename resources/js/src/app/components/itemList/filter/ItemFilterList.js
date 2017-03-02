var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");

Vue.component("item-filter-list", {

    props: [
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter-list";

        var urlParams = UrlService.getUrlParams(document.location.search);

        ResourceService.getResource("filterParams").set(urlParams["facets"]);
    }
});
