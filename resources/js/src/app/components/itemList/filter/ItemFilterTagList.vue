<template>
    <div class="selected-filters clearfix">
        <span :class="'text-appearance selected-filter filter-' + tag.id + ' ' + marginClasses" :style="marginInlineStyles" v-for="tag in tagList" @click="removeTag(tag)">
            <i class="fa fa-times" aria-hidden="true"></i> {{ tag.name }}
        </span>

        <span :class="'bg-appearance selected-filter reset-all' + ' '+ marginClasses" :style="marginInlineStyles" v-if="tagList.length >= 2" @click="resetAllTags()">
            {{ $translate("Ceres::Template.itemFilterReset") }}
        </span>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
    props: {
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
