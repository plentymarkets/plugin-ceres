<template>
    <div>
        <a
            class="autocomplete-suggestion px-3 py-2"
            v-for="(item, index) in autocompleteResult"
            :key="index"
            :href="getTargetUrl(item.data)"
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
        }
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
        getDisplayName(itemData) {
            let displayName = this.$options.filters.itemName(itemData);

            for (const split of this.autocompleteSearchString.split(" ")) {
                displayName = displayName.replace(split, `<strong>${split}</strong>`);
            }

            return displayName;
        },

        getTargetUrl(itemData) {
            if (this.forwardToSingleItem) {
                return this.$options.filters.itemURL(itemData);
            }

            return `${App.urls.search}?query=${this.$options.filters.itemName(itemData)}`
        }
    }
}
</script>
