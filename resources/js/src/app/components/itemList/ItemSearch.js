import TranslationService from "../../services/TranslationService";
import UrlService from "../../services/UrlService";
import { isNullOrUndefined } from "../../helper/utils";
import { pathnameEquals } from "../../helper/url";
import Vue from "vue";

const ApiService = require("../../services/ApiService");

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
            autocompleteRequest: null,
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

    mounted()
    {
        this.$nextTick(() =>
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            this.$store.commit("setItemListSearchString", urlParams.query);

            this.$refs.searchInput.value = !isNullOrUndefined(urlParams.query) ? urlParams.query : "";
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
                    this.$refs.searchInput.value = this.selectedAutocompleteItem.name;
                    this.$store.commit("setItemListSearchString", this.$refs.searchInput.value);

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
            if (this.$refs.searchInput.value.length)
            {
                if (pathnameEquals(App.urls.search))
                {
                    this.updateTitle(this.$refs.searchInput.value);
                    this.$store.dispatch("searchItems", this.$refs.searchInput.value);

                    this.selectedAutocompleteIndex = -1;
                    this.autocompleteResult = [];
                }
                else
                {
                    window.open(`${App.urls.search}?query=${this.$refs.searchInput.value}`, "_self", false);
                }
            }
            else
            {
                this.preventSearch = false;
            }
        },

        updateTitle(searchString)
        {
            const searchPageTitle = document.querySelector("#searchPageTitle");
            const title = TranslationService.translate("Ceres::Template.itemSearchResults") + " " + searchString;

            if (!isNullOrUndefined(searchPageTitle))
            {
                searchPageTitle.innerHTML = "";
                searchPageTitle.appendChild(document.createTextNode(title));
            }

            document.title = `${title} | ${TranslationService.translate("Ceres::Template.headerCompanyName")}`;
        },

        autocomplete(searchString)
        {
            if (searchString.length >= 2)
            {
                if (!isNullOrUndefined(this.autocompleteRequest) && typeof this.autocompleteRequest.abort === "function")
                {
                    this.autocompleteRequest.abort();
                }

                this.autocompleteRequest = ApiService.get(
                    "/rest/io/item/search/autocomplete",
                    {
                        template: "Ceres::ItemList.Components.ItemSearch",
                        query: searchString
                    }
                );

                this.autocompleteRequest.done(response =>
                {
                    this.autocompleteRequest = null;
                    this.autocompleteResult = [];
                    this.selectedAutocompleteIndex = -1;

                    if (response && response.documents.length)
                    {
                        for (const item of response.documents)
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
                });
            }
            else
            {
                this.autocompleteResult = [];
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
                this.$refs.searchInput.value = item.name;
                this.$store.commit("setItemListSearchString", this.$refs.searchInput.value);

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
