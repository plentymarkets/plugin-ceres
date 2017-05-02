var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

import UrlService from "services/UrlService";

Vue.component("items-per-page", {

    props: [
        "columnsPerPage",
        "rowsPerPage",
        "template"
    ],

    data: function()
    {
        return {
            itemSearch: {},
            paginationValues: []
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        this.initPaginationValues();
        ResourceService.bind("itemSearch", this);
        this.setSelectedValueByUrl();
    },

    methods:
    {
        itemsPerPageChanged: function()
        {
            ItemListService.setItemsPerPage(this.itemSearch.items);
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
                    this.itemSearch.items = urlParams.items;
                }
                else
                {
                    this.itemSearch.items = App.config.defaultItemsPerPage;
                }
            }
            else
            {
                this.itemSearch.items = App.config.defaultItemsPerPage;
            }

            ItemListService.setItemsPerPage(this.itemSearch.items);
        },

        initPaginationValues: function()
        {
            for (var rowKey in this.rowsPerPage)
            {
                this.paginationValues.push(this.rowsPerPage[rowKey] * this.columnsPerPage);
            }
        }
    }
});
