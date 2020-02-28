<template>
    <div>
        <template v-if="autocompleteResult.length">
            <div>
                <a
                    v-for="(item, index) in autocompleteResult"
                    class="autocomplete-suggestion"
                    :class="paddingClasses"
                    :style="paddingInlineStyles"
                    :key="index"
                    :href="getTargetUrl(item)">

                    <div class="image mr-3" v-if="showItemImages">
                        <img v-if="item.image" :src="item.image">
                    </div>

                    <div class="label" :class="{ 'compact': item.beforeLabel && item.afterLabel }">
                        <p class="small mb-0" v-if="item.beforeLabel">{{ item.beforeLabel }}</p>
                        <p class="mb-0" v-html="getHighlightedLabel(item.label)"></p>
                        <p class="small mb-0" v-if="item.afterLabel">{{ item.beforeLabel }}</p>
                    </div>

                    <div class="count" v-if="item.count > 0">
                        <span>{{ item.count }}</span>
                    </div>
                </a>
            </div>
        </template>
        <template v-else>
            <p class="text-muted" :class="paddingClasses" :style="paddingInlineStyles">
                {{ $translate("Ceres::Template.itemSearchSuggestionNoResults") }}
            </p>
        </template>
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
            autocompleteResult(state)
            {
                return state.itemSearch.autocompleteResult[this.suggestionType];
            },
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

            return `${ App.urls.search }?query=${ encodeURIComponent(item.label) }`
        },

        onSuggestionSelected(item)
        {
            this.$store.commit("setItemListSearchString", item.label);
            window.open(this.getTargetUrl(item), "_self", false);
        }
    }
}
</script>
