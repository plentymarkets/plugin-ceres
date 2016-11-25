var APIService = require("services/APIService");
var ResourceService = require("services/ResourceService");
var NotificationService = require("services/NotificationService");

Vue.component("item-search", {

    template: "#vue-item-search",

    props: [],

    data: function()
    {
        return {
            searchString: "",
            itemList: {}
        };
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        // var queryParams = this.getQueryParams(document.location.search);
    },

    methods:
    {
        search: function()
        {
            // redirect if wrong url
            // change url
            // fire call
            // update item list

            this.getItemList();
        },

        getItemList: function()
        {
            var searchParams =
                {
                    searchString: this.searchString,
                    searchParams:
                    {
                        itemsPerPage: 20,
                        orderBy: "itemName",
                        orderByKey: "ASC"
                    },
                    page: 1
                };
            var self = this;

            APIService.get("rest/item/search", searchParams)
                    .done(function(response)
                    {
                        ResourceService.getResource("itemList").set(response);
                        console.log(response);
                        console.log(self.itemList);
                    })
                    .fail(function(response)
                    {
                        // TODO
                        NotificationService.error("Error").closeAfter(5000);
                    });
        },

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
        }
    }
});
