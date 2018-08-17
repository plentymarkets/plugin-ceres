import ApiService from "services/ApiService";
import TranslationService from "services/TranslationService";
import UrlService from "services/UrlService";

Vue.component("item-search", {

    props: {
        template:
        {
            type: String,
            default: "#vue-item-search"
        },
        showItemImages:
        {
            type: Boolean,
            default: false
        },
        forwardToSingleItem:
        {
            type: Boolean,
            default: App.config.search.forwardToSingleItem
        }
    },

    data()
    {
        return {
            currentSearchString: "",
            promiseCount: 0,
            autocompleteResult: [],
            selectedAutocompleteIndex: -1,
            isSearchFocused: false
        };
    },

    computed:
    {
        selectedAutocompleteItem()
        {
            const selectedAutocompleteItem = this.autocompleteResult[this.selectedAutocompleteIndex];

            if (this.selectedAutocompleteIndex < 0 || !selectedAutocompleteItem)
            {
                return null;
            }

            return selectedAutocompleteItem;
        }
    },

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            this.$store.commit("setItemListSearchString", urlParams.query);
            this.currentSearchString = urlParams.query;
        });
    },

    methods:
    {
        prepareSearch()
        {
            if (this.selectedAutocompleteItem)
            {
                if (this.forwardToSingleItem)
                {
                    window.open(this.selectedAutocompleteItem.url, "_self", false);
                }
                else
                {
                    this.currentSearchString = this.selectedAutocompleteItem.name;
                    this.$store.commit("setItemListSearchString", this.currentSearchString);

                    this.search();
                }
            }
            else
            {
                this.search();
            }

            $("#searchBox").collapse("hide");
        },

        search()
        {
            if (this.currentSearchString.length)
            {
                if (document.location.pathname === "/search")
                {
                    this.updateTitle(this.currentSearchString);
                    this.$store.dispatch("searchItems", this.currentSearchString);

                    this.selectedAutocompleteIndex = -1;
                    this.autocompleteResult = [];
                }
                else
                {
                    let searchBaseURL = "/search?query=";

                    if (App.defaultLanguage !== App.language)
                    {
                        searchBaseURL = `/${App.language}/search?query=`;
                    }

                    window.open(searchBaseURL + this.currentSearchString, "_self", false);
                }
            }
            else
            {
                this.preventSearch = false;
            }
        },

        updateTitle(searchString)
        {
            document.querySelector("#searchPageTitle").innerHTML = TranslationService.translate("Ceres::Template.itemSearchResults") + " " + searchString;
            document.title = TranslationService.translate("Ceres::Template.itemSearchResults") + " " + searchString + " | " + App.config.header.companyName;
        },

        autocomplete(searchString)
        {
            if (searchString.length >= 2)
            {
                if (this.promiseCount >= Number.MAX_SAFE_INTEGER)
                {
                    this.promiseCount = 0;
                }

                const promiseCount = ++this.promiseCount;

                ApiService.get("/rest/io/item/search/autocomplete", {template: "Ceres::ItemList.Components.ItemSearch", query: searchString})
                    .done(response =>
                    {
                        if (this.promiseCount === promiseCount)
                        {
                            this.transformAutocomplete(response, searchString);
                        }
                    });
            }
            else
            {
                this.autocompleteResult = [];
            }
        },

        // transform the autocomplete result to usable object
        transformAutocomplete(data, searchString)
        {
            this.autocompleteResult = [];
            this.selectedAutocompleteIndex = -1;

            if (data && data.documents.length)
            {
                for (const item of data.documents)
                {
                    const images = this.$options.filters.itemImages(item.data.images, "urlPreview");
                    const img = this.$options.filters.itemImage(images);
                    const url = this.$options.filters.itemURL(item.data);
                    const name = this.$options.filters.itemName(item.data);

                    let displayName = name;

                    for (const split of searchString.split(" "))
                    {
                        displayName = displayName.replace(split, `<strong>${split}</strong>`);
                    }

                    this.autocompleteResult.push({
                        img,
                        url,
                        name,
                        displayName
                    });
                }
            }
        },

        selectAutocompleteItem(item)
        {
            if (this.forwardToSingleItem)
            {
                window.open(item.url, "_self", false);
            }
            else
            {
                this.currentSearchString = item.name;
                this.$store.commit("setItemListSearchString", this.currentSearchString);

                this.search();
            }
        },

        keyup()
        {
            this.selectedAutocompleteIndex--;

            if (this.selectedAutocompleteIndex < 0)
            {
                this.selectedAutocompleteIndex = 0;
            }
        },

        keydown()
        {
            this.selectedAutocompleteIndex++;

            if (this.selectedAutocompleteIndex > this.autocompleteResult.length - 1)
            {
                this.selectedAutocompleteIndex = this.autocompleteResult.length - 1;
            }
        },

        // hide autocomplete after 100ms to make clicking on it possible
        setIsSearchFocused(value)
        {
            setTimeout(() =>
            {
                this.isSearchFocused = !!value;
            }, 100);
        }
    }
});
