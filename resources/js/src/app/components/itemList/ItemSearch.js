var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-search", {

    template: "#vue-item-search",

    data: function()
    {
        return {
            searchString: "",
            itemSearch: {}
        };
    },

    ready: function()
    {
        ResourceService.bind("itemSearch", this);
        this.initAutocomplete();
    },

    methods:
    {
        search: function()
        {
            if (document.location.pathname === "/search")
            {
                ItemListService.setSearchString(this.itemSearch.searchString);
            }
            else
            {
                window.open("/search?searchString=" + this.itemSearch.searchString, "_self", false);
            }
        },

        initAutocomplete: function()
        {
            var self = this;

            $(".search-input").autocomplete({
                serviceUrl: "/rest/item/search/autocomplete",
                paramName: "searchString",
                width: $(".search-box-shadow-frame").width(),
                onSelect: function(suggestion)
                {
                    self.itemSearch.searchString = suggestion.value;
                },
                beforeRender: function()
                {
                    $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
                },
                transformResult: function(response)
                {
                    console.log(response);
                }
            });

            $(window).resize(function()
            {
                $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
            });
        }
    }
});
