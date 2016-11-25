// var APIService = require("services/APIService");
// var ResourceService = require("services/ResourceService");
// var NotificationService = require("services/NotificationService");

Vue.component("item-list", {

    template: "#vue-item-list",

    props: [],

    data: function()
    {
        return {};
    },

    ready: function()
    {
        // ResourceService.bind("itemList", this);
        // var queryParams = this.getQueryParams(document.location.search);
    },

    methods:
    {
        getQueryParams: function(searchString)
        {
            var tokens;
            var params = {};
            var regex = /[?&]?([^=]+)=([^&]*)/g;

            searchString = searchString.split("+").join(" ");

            // eslint-disable-next-line
            while (tokens = regex.exec(searchString))
            {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }

            return params;
        },

        getItemList: function()
        {
            var searchParams =
                {
                    searchString: "searchString",
                    searchParams:
                    {
                        itemsPerPage: 10,
                        orderBy: "orderBy",
                        orderByKey: "orderByKey"
                    },
                    page: 1
                };

            APIService.get("rest/item/search", searchParams)
                .done(function(response)
                {
                    ResourceService.getResource("itemList").set(response);
                })
                .fail(function(response)
                {
                    // TODO
                    NotificationService.error("Error").closeAfter(5000);
                });
        }
    }
});
