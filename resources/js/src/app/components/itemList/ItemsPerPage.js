var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");
var UrlService = require("services/UrlService");

Vue.component("items-per-page", {

    props: [
        "paginationValues",
        "template"
    ],

    data: function()
    {
        return {
            itemSearch: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("itemSearch", this);

        this.setSelectedValueByUrl();
    },

    methods:
    {
        itemsPerPageChanged: function()
        {
            ItemListService.setItemsPerPage(this.itemSearch.itemsPerPage);
            ItemListService.setPage(1);
            ItemListService.getItemList();
        },

        setSelectedValueByUrl: function()
        {
            var urlParams = UrlService.getUrlParams(document.location.search);

            if (urlParams.items)
            {
                if (this.paginationValues.indexOf(urlParams.items) > -1)
                {
                    this.itemSearch.itemsPerPage = urlParams.items;
                }
                else
                {
                    this.itemSearch.itemsPerPage = App.config.defaultItemsPerPage;
                }
            }
            else
            {
                this.itemSearch.itemsPerPage = App.config.defaultItemsPerPage;
            }

            ItemListService.setItemsPerPage(this.itemSearch.itemsPerPage);
        }
    }
});
