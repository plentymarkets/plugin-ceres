import UrlService from "services/UrlService";
import TranslationService from "services/TranslationService";

Vue.component("item-search", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    data()
    {
        return {
            currentSearchString: "",
            preventSearch: false
        };
    },

    computed: Vuex.mapState({
        searchString: state => state.itemList.searchString
    }),

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.initAutocomplete();

            const urlParams = UrlService.getUrlParams(document.location.search);

            this.$store.commit("setItemListSearchString", urlParams.query);
            this.currentSearchString = urlParams.query;
        });
    },

    methods:
    {
        search()
            {
            if (this.currentSearchString.length &&
                    !this.preventSearch)
                {
                if (document.location.pathname === "/search")
                    {
                    this.updateTitle(this.currentSearchString);
                    this.$store.dispatch("searchItems", this.currentSearchString);
                }
                else
                    {
                    var searchBaseURL = "";

                    if (App.defaultLanguage != App.language)
                        {
                        searchBaseURL = "/" + App.language + "/search?query=";
                    }
                    else
                        {
                        searchBaseURL = "/search?query=";
                    }
                    window.open(searchBaseURL + this.currentSearchString, "_self", false);
                }
            }
            else
                {
                this.preventSearch = false;
            }
        },

        openItem(suggestion)
            {
            this.preventSearch = true;
            window.open(this.$options.filters.itemURL(suggestion.data), "_self", false);
        },

        updateTitle(searchString)
            {
            document.querySelector("#searchPageTitle").innerHTML = TranslationService.translate("Ceres::Template.itemSearchResults") + " " + searchString;
            document.title = TranslationService.translate("Ceres::Template.itemSearchResults") + " " + searchString + " | " + App.config.header.companyName;
        },

        initAutocomplete()
            {
            $(".search-input").autocomplete({
                serviceUrl: "/rest/io/item/search/autocomplete",
                paramName: "query",
                params: {template: "Ceres::ItemList.Components.ItemSearch"},
                width: $(".search-box-shadow-frame").width(),
                zIndex: 1070,
                maxHeight: 310,
                minChars: 2,
                preventBadQueries: false,
                onSelect: suggestion =>
                    {
                    this.$store.commit("setItemListSearchString", suggestion.value);
                    this.currentSearchString = suggestion.value;

                    if (App.config.search.forwardToSingleItem)
                        {
                        this.openItem(suggestion);
                    }
                    else
                        {
                        this.search();
                    }
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
                        const value = this.$options.filters.itemName(dataItem.data);

                        return {
                            value: value,
                            data : dataItem.data
                        };
                    })
                };

            return suggestions;
        }
    }
});
