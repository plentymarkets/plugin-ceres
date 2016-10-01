var PaginationService = require('services/PaginationService');
var URI = require('urijs');

Vue.component('list-controls', {

    template: '#vue-list-controls',

    props: {
        defaultSorting    : String,
        defaultItemsPerPage: String,
        totalCount: String
    },

    data: function()
    {
        return {
            sortBy: "",
            itemsPerPage: 0,
            itemRange: ""
        };
    },

    ready: function()
    {
        this.sortBy = this.getQueryStringValue("itemSorting") || this.defaultSorting;

        this.itemsPerPage = parseInt(this.getQueryStringValue("items_per_page") || this.defaultItemsPerPage);
        this.updateSelectedItemsPerPage();

        var page = parseInt(this.getQueryStringValue("page"));
        if (!page)
        {
            page = 1;
        }
        var from = ((page - 1) * this.itemsPerPage) + 1;
        var till = page * this.itemsPerPage;
        if (till > this.totalCount)
        {
            till = this.totalCount;
        }
        this.itemRange = from + " - " + till;
    },

    methods: {

        currentURL: function()
        {
            return window.location.href.split('?')[0];
        },

        getQueryStringValue: function(key)
        {
            var location = window.location.href;
            var index = location.indexOf("?");
            if (index >= 0)
            {
                var queryString = location.substring(index + 1);
                var query = URI.parseQuery(queryString);
                return query[key];
            }
            else
            {
                return null;
            }
        },

        updateSelectedItemsPerPage: function()
        {
            PaginationService.itemsPerPage = this.itemsPerPage;
        }
    }
});
