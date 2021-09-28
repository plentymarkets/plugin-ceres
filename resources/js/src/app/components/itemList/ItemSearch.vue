<template>
    <div class="container-max" :class="{'p-0' : $ceres.isShopBuilder}"> 
        <div class="position-relative"><div class="d-flex flex-grow-1 position-relative clearable">
            <input type="text" id="query" name="q" placeholder="Wonach suchst Du?" class="search-input flex-grow-1"> 
            <i class="clearable__clear">&times;</i>
            <button type="button" class="search-button" onclick="buttonOnClick(this)">
                <img src="https://cdn02.plentymarkets.com/xp4oxtd91bsc/frontend/Images/Header/Navigation/magnifier-white.png">
            </button>

            <template v-if="isSearchFocused">
                <div v-show="hasAutocompleteResults">
                    <slot name="autocomplete-suggestions">
                        <div class="autocomplete-suggestions shadow bg-white w-100 ">
                            <search-suggestion-item
                                :show-images="true"
                                suggestion-type="item">
                            </search-suggestion-item>
                        </div>
                    </slot>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import UrlService from "../../services/UrlService";
import { isNullOrUndefined, defaultValue } from "../../helper/utils";
import { pathnameEquals } from "../../helper/url";
import ApiService from "../../services/ApiService";
import { mapState } from 'vuex';
import { debounce } from '../../helper/debounce';

export default {

    name: "item-search",

    props: {
        showItemImages:
        {
            type: Boolean
        },
        forwardToSingleItem:
        {
            type: Boolean,
            default: App.config.search.forwardToSingleItem
        },
        timeout:
        {
            type: Number,
            default: 200
        }
    },

    data()
    {
        return {
            isSearchFocused: App.isShopBuilder,
            onValueChanged: null,
            searchString: ""
        };
    },

    created()
    {
        this.onValueChanged = debounce(searchString =>
        {
            this.autocomplete(searchString);
        }, defaultValue(this.timeout, 200));
    },

    computed:
    {
        hasAutocompleteResults()
        {
            const item       = this.autocompleteResult.item;
            const category   = this.autocompleteResult.category;
            const suggestion = this.autocompleteResult.suggestion;

            return App.isShopBuilder || (item && item.length) || (category && category.length) || (suggestion && suggestion.length);
        },

        isShopBuilder()
        {
            return App.isShopBuilder;
        },

        ...mapState({
            autocompleteResult: state => state.itemSearch.autocompleteResult,
            moduleSearchString: state => state.itemList.searchString
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

        $('.search-input').each( (index, input) => {$(input).keypress( function onEvent(event) {
                if (event.key === "Enter") {
                    changeWindow(event.target.value);
                }
            });
        });
        $(".clearable").each(function() {
            const $inp = $(this).find("input:text"),
                $cle = $(this).find(".clearable__clear");

            $inp.on("input", function(){
                $cle.toggle(!!this.value);
            });
            
            $cle.on("click", function(e) {
                e.preventDefault();
                $inp.val("").trigger("input");
            });
            
        });
    },

    methods:
    {
        search()
        {
            if (this.$refs.searchInput.value.length)
            {
                if (pathnameEquals(App.urls.search))
                {
                    this.$store.dispatch("searchItems", this.$refs.searchInput.value);
                }
                else
                {
                    window.open(`${App.urls.search}?query=${ this.searchString }`, "_self", false);
                }
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
                this.$store.commit("setAutocompleteResult", { item: [], category: [], suggestion: [] });
            }
        },

        // hide search, if targetElement of the blur event is not a child of components' root element
        onBlurSearchField(event)
        {
            const target = event.relatedTarget;

            if (isNullOrUndefined(target) || !isNullOrUndefined(target) && !this.$el.contains(target))
            {
                this.isSearchFocused = false;
            }
        },

        changeWindow(value){
            let path = window.location.pathname.split("/")[1];
            if(path != "suche") window.location = "https://www.konsolenkost.de/suche/?q=" + encodeURIComponent(value);
        },

        buttonOnClick(elem){
            $(elem).siblings("input").each( (index, input) => { 
                let e = jQuery.Event( 'keypress', { key: "Enter" });
                $(input).trigger(e); 
            });
        }
    },

    watch:
    {
        // set the current search string, after clicking on a suggestion
        moduleSearchString(newVal)
        {
            if (newVal && newVal.length)
            {
                this.searchString = newVal;
            }
        }        
    }
}
</script>
