<template>
    <div class="p-2 px-lg-0">
        <div class="d-flex flex-grow-1 position-relative">
            <input type="search" class="search-input flex-grow-1 px-3 py-2" ref="searchInput" @input="autocomplete($event.target.value)"
                @keyup.enter="search()" @focus="isSearchFocused = true" @blur="setIsSearchFocused(false)" :autofocus="isShopBuilder">

            <slot name="search-button">
                <button class="search-submit px-3" type="submit" @click="search()">
                    <i class="fa fa-search"></i>
                </button>
            </slot>

            <slot name="autocomplete-suggestions">
                <div class="autocomplete-suggestions shadow bg-white w-100 overflow-auto" v-if="isSearchFocused && autocompleteResult.length">
                    <search-suggestion-items
                        :show-item-images="showItemImages"
                        :forward-to-single-item="forwardToSingleItem">
                    </search-suggestion-items>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import UrlService from "../../services/UrlService";
import { isNullOrUndefined } from "../../helper/utils";
import { pathnameEquals } from "../../helper/url";
import ApiService from "../../services/ApiService";
import { mapState } from 'vuex';

export default {

    name: "item-search",

    props: {
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
            isSearchFocused: false,
        };
    },

    computed:
    {
        isShopBuilder()
        {
            return App.isShopBuilder;
        },

        ...mapState({
            autocompleteResult: state => state.itemSearch.autocompleteResult
        })
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
        search()
        {
            if (this.$refs.searchInput.value.length)
            {
                this.$store.dispatch("searchItems", this.$refs.searchInput.value);
            }
        },

        autocomplete(searchString)
        {
            if (searchString.length >= 2)
            {
                this.$store.dispatch("loadItemSearchAutocomplete", searchString);
            }
            else
            {
                this.$store.commit("setAutocompleteResult", []);
            }
        },

        // selectAutocompleteItem(item)
        // {
        //     if (this.forwardToSingleItem)
        //     {
        //         window.open(item.url, "_self", false);
        //     }
        //     else
        //     {
        //         this.$refs.searchInput.value = item.name;
        //         this.$store.commit("setItemListSearchString", this.$refs.searchInput.value);

        //         this.search();
        //     }
        // },

        // hide autocomplete after 100ms to make clicking on it possible
        setIsSearchFocused(value)
        {
            setTimeout(() =>
            {
                this.isSearchFocused = !!value;
            }, 100);
        }
    }
}
</script>
