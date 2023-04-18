<template>
    <div class="selected-filters clearfix bkr-cc">
            <span :class="'selected-filter filter-' + tag.id" v-if="tag.id != 123" v-for="tag in tagList" @click="removeTag(tag)">
                <i class="fa fa-times" aria-hidden="true"></i> {{ tag.name }}
            </span>
            <span class="selected-filter reset-all" v-if="tagList.length >= 2" @click="resetAllTags()">
            {{ $translate("Ceres::Template.itemFilterReset") }}
            </span>
        </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
    props: {
        facetData:
        {
            type: Array,
            default()
            {
                return [];
            }
        },
        marginClasses:
        {
            type: String,
            default: null
        },
        marginInlineStyles:
        {
            type: String,
            default: null
        }
    },

    computed: mapState({
        tagList: state => state.itemList.selectedFacets
    }),

    created()
    {
        if (!this.$store.state.itemList.facets?.length)
        {
            this.$store.commit("addFacets", this.facetData);
        }
    },

    methods:
    {
        removeTag(tag)
        {
            this.selectFacet({ facetValue: tag });
            this.loadItemList();
        },

        resetAllTags()
        {
            this.resetAllSelectedFacets();
            this.loadItemList();
        },

        ...mapMutations([
            "resetAllSelectedFacets"
        ]),

        ...mapActions([
            "selectFacet",
            "loadItemList"
        ])
    }
}
</script>
