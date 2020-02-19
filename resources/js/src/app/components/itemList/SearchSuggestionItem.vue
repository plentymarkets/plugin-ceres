<template>
    <div>
        <a
            v-for="(item, index) in autocompleteResult"
            class="autocomplete-suggestion"
            :class="paddingClasses"
            :style="paddingInlineStyles"
            :key="index"
            :href="getTargetUrl(item)"
            @mousedown.prevent="onSuggestionSelected(item)"
        >
            <div class="autocomplete-image-container mr-2" v-if="suggestionType === 'item' && showItemImages">
                <img class="autocomplete-image mw-100" :src="item.image"/>
            </div>

            <div class="autocomplete-item-name" v-html="getHighlightedLabel(item.label)"></div>
        </a>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props:
    {
        showItemImages:
        {
            type: Boolean
        },

        paddingClasses:
        {
            type: String,
            default: "px-3 py-2"
        },
        
        paddingInlineStyles:
        {
            type: String,
            default: null
        },

        suggestionType:
        {
            type: String,
            required: true
        }
    },

    computed:
    {
        ...mapState({
            autocompleteResult: state => state.itemSearch.autocompleteResult,
            autocompleteSearchString: state => state.itemSearch.autocompleteSearchString
        })
    },

    created()
    {
        this.$store.commit("addAutocompleteType", this.suggestionType);
    },

    methods:
    {
        getHighlightedLabel(label)
        {
            const search = this.autocompleteSearchString.split(/\s+/)
                .filter(word => word.length)
                .join("|");

            return label
                .replace(new RegExp(search, "ig"), match =>
                {
                    return `<strong class="text-appearance">${ match }</strong>`;
                });
        },

        getTargetUrl(item)
        {
            if (this.suggestionType === "item")
            {
                return item.url;
            }

            return `${ App.urls.search }?query=${ item.label }`
        },

        onSuggestionSelected(item)
        {
            this.$store.commit("setItemListSearchString", item.label);
            window.open(this.getTargetUrl(item), "_self", false);
        }
    }
}
</script>
