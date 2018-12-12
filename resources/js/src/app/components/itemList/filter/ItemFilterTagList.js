Vue.component("item-filter-tag-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-item-filter-tag-list"
        }
    },

    computed: Vuex.mapState({
        tagList: state => state.itemList.selectedFacets
    }),

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        removeTag(tag)
        {
            this.$store.dispatch("selectFacet", {facetValue: tag});
        },

        resetAllTags()
        {
            this.$store.commit("resetAllSelectedFacets");
            this.$store.dispatch("loadItemList");
        }
    }
});
