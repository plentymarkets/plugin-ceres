var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");
var UrlService = require("services/UrlService");

Vue.component("pagination", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            itemSearch : {},
            itemList   : {},
            lastPageMax: 0
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("itemSearch", this);
        ResourceService.bind("itemList", this);

        var urlParams = UrlService.getUrlParams(document.location.search);

        this.itemSearch.page = urlParams.page;
    },

    methods:
    {
        setPage: function(page)
        {
            ItemListService.setPage(page);
            ItemListService.getItemList();
        }
    },

    computed:
    {
        page: function()
        {
            return parseInt(this.itemSearch.page) || 1;
        },

        pageMax: function()
        {
            if (this.itemSearch.isLoading)
            {
                return this.lastPageMax;
            }

            var pageMax = this.itemList.total / this.itemSearch.itemsPerPage;

            if (this.itemList.total % this.itemSearch.itemsPerPage > 0)
            {
                pageMax += 1;
            }

            this.lastPageMax = parseInt(pageMax) || 1;
            return parseInt(pageMax) || 1;
        }
    }
});
