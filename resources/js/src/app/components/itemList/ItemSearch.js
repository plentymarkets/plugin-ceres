import UrlService from "services/UrlService";

Vue.component("item-search", {

    props: [
        "template"
    ],

    data()
    {
        return {
            currentSearchString: ""
        };
    },

    computed: Vuex.mapState({
        searchString: state => state.itemList.searchString
    }),

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        this.initAutocomplete();

        const urlParams = UrlService.getUrlParams(document.location.search);

        this.$store.commit("setItemListSearchString", urlParams.query);
        this.currentSearchString = urlParams.query;
    },

    methods:
    {
        search()
        {
            if (document.location.pathname === "/search")
            {
                this.$store.dispatch("searchItems", this.currentSearchString);
            }
            else
            {
                window.open("/search?query=" + this.currentSearchString, "_self", false);
            }
        },

        initAutocomplete()
        {
            $(".search-input").autocomplete({
                serviceUrl: "/rest/io/item/search/autocomplete",
                paramName: "query",
                params: {template: "Ceres::ItemList.Components.ItemSearch", variationShowType: App.config.variationShowType},
                width: $(".search-box-shadow-frame").width(),
                zIndex: 1070,
                maxHeight: 310,
                minChars: 2,
                preventBadQueries: false,
                onSelect: suggestion =>
                {
                    this.$store.commit("setItemListSearchString", suggestion.value);
                    this.currentSearchString = suggestion.value;
                    this.search();
                },
                beforeRender()
                {
                    $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
                },
                transformResult: response =>
                {
                    return this.transformSuggestionResult(response);
                }
            });

            $(window).resize(() =>
            {
                $(".autocomplete-suggestions").width($(".search-box-shadow-frame").width());
            });
        },

        transformSuggestionResult(result)
        {
            result = JSON.parse(result);
            const suggestions =
                {
                    suggestions: $.map(result.data.documents, dataItem =>
                    {
                        const value = this.$options.filters.itemName(dataItem.data.texts, App.config.itemName);

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
