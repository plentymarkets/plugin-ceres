<template>
    <div>
        <a
            v-for="(item, index) in autocompleteResult"
            class="autocomplete-suggestion"
            :class="paddingClasses"
            :style="paddingInlineStyles"
            :key="index"
            :href="getTargetUrl(item.data)"
            @mousedown.prevent="onSuggestionSelected(item.data)"
        >
            <div class="autocomplete-image-container mr-2" v-if="showItemImages">
                <img
                    class="autocomplete-image mw-100"
                    :src="item.data.images | itemImages('urlPreview') | itemImage"
                />
            </div>

            <div class="autocomplete-item-name" v-html="getDisplayName(item.data)"></div>
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

        forwardToSingleItem:
        {
            type: Boolean,
            default: App.config.search.forwardToSingleItem
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
    },

    computed:
    {
        ...mapState({
            autocompleteResult: state => state.itemSearch.autocompleteResult,
            autocompleteSearchString: state => state.itemSearch.autocompleteSearchString
        })
    },

    methods:
    {
        getDisplayName(itemData)
        {
            const search = this.autocompleteSearchString.split(" ")
                .filter(word => word.length)
                .join("|");

            return this.$options.filters.itemName(itemData)
                .replace(new RegExp(search, "ig"), match =>
                {
                    return `<strong class="text-appearance">${ match }</strong>`;
                });
        },

        getTargetUrl(itemData)
        {
            if (this.forwardToSingleItem) 
            {
                return this.$options.filters.itemURL(itemData);
            }

            return `${App.urls.search}?query=${this.$options.filters.itemName(itemData)}`
        },

        onSuggestionSelected(itemData)
        {
            this.$store.commit("setItemListSearchString", this.$options.filters.itemName(itemData));
            window.open(this.getTargetUrl(itemData), "_self", false);
        }
    }
}
</script>
