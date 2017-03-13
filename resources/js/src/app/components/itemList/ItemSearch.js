var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");
var UrlService = require("services/UrlService");

Vue.component("item-search", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            searchString: "",
            itemSearch: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        ResourceService.bind("itemSearch", this);
        this.initAutocomplete();

        var urlParams = UrlService.getUrlParams(document.location.search);

        this.itemSearch.query = urlParams.query;

        if (this.itemSearch.query)
        {
            ItemListService.updateSearchString(this.itemSearch.query);
        }
    },

    methods:
    {
        search: function()
        {
            if (document.location.pathname === "/search")
            {
                ItemListService.setSearchString(this.itemSearch.query);
                ItemListService.getItemList();
            }
            else
            {
                window.open("/search?query=" + this.itemSearch.query, "_self", false);
            }
        },

        initAutocomplete: function()
        {
            var self = this;

            $(".search-input").autocomplete({
                serviceUrl: "/rest/io/item/search/autocomplete",
                paramName: "query",
                params: {template: "Ceres::ItemList.Components.ItemSearch"},
                width: $(".search-box-shadow-frame").width(),
                zIndex: 1070,
                maxHeight: 310,
                minChars: 2,
                preventBadQueries: false,
                onSelect: function(suggestion)
                {
                    self.itemSearch.query = suggestion.value;
                    self.search();
                },
                beforeRender: function()
                {
                    $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
                },
                transformResult: function(response)
                {
                    return self.transformSuggestionResult(response);
                }
            });

            $(window).resize(function()
            {
                $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
            });
        },

        transformSuggestionResult: function(result)
        {
            result = JSON.parse(result);
            var suggestions =
                {
                    suggestions: $.map(result.data.documents, function(dataItem)
                    {
                        var value = dataItem.data.texts[0].name1;

                        return {
                            value: value,
                            data : value
                        };
                    })
                };

            return suggestions;
        }
    }
});
