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

        var countries = [
            {value: "Andorra", data: "AD"},
            {value: "tets", data: "t1"},
            {value: "Test", data: "tt"},
            {value: "Test", data: "tt"},
            {value: "Test", data: "tt"},
            {value: "Test", data: "tt"},
            {value: "Test", data: "tt"},
            {value: "Test", data: "tt"},
            {value: "Zimbabwe", data: "ZZ"}
        ];
        var self = this;

        $(".search-input").autocomplete({
            lookup: countries,
            width: $(".search-box-shadow-frame").width(),
            onSelect: function(suggestion)
            {
                self.itemSearch.searchString = suggestion.value;
            },
            beforeRender: function()
            {
                $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
            }
        });

        $(window).resize(function()
        {
            $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
        });
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
        }
    }
});
