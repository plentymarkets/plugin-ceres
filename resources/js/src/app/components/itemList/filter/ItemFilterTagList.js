import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";

Vue.component("item-filter-tag-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-item-filter-tag-list"
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
});
