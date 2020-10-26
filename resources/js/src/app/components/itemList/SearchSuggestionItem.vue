<template>
    <div>
        <template v-if="autocompleteResult && autocompleteResult.length">
            <div data-testing="autocomplete-list">
                <a
                    v-for="(item, index) in autocompleteResult"
                    class="autocomplete-suggestion"
                    :class="paddingClasses"
                    :style="paddingInlineStyles"
                    :key="index"
                    :href="getTargetUrl(item)"
                    tabindex="0">

                    <div class="image flex-shrink-0 mr-3" v-if="showImages">
                        <img v-if="item.image" :src="item.image">
                    </div>

                    <div class="label overflow-hidden" :class="{ 'compact': showAdditionalInformation && item.beforeLabel && item.afterLabel }">
                        <p class="small mb-0 text-truncate" v-if="showAdditionalInformation && item.beforeLabel">{{ item.beforeLabel }}</p>
                        <p class="mb-0 text-truncate" v-html="getHighlightedLabel(item.label)"></p>
                        <p class="small mb-0 text-truncate" v-if="showAdditionalInformation && item.afterLabel">{{ item.afterLabel }}</p>
                    </div>

                    <div class="count" v-if="showCount && item.count > 0">
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
        showImages: Boolean,

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
        },

        showCount: Boolean,

        showAdditionalInformation: Boolean
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

            label = (label || "").toString();

            return label
                .replace(new RegExp(search, "ig"), match =>
                {
                    return `<strong class="text-appearance">${ match }</strong>`;
                });
        },

        getTargetUrl(item)
        {
            if (item.url && item.url.length)
            {
                return item.url;
            }

            return `${ App.urls.search }?query=${ encodeURIComponent(item.label) }`
        }
    }
}
</script>
