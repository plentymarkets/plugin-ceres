var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

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
            ItemListService.setSearchString(this.searchString);
            // redirect if wrong url
            // change url
            // fire call
            // update item list

            this.getItemList();
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
