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
            this.selectFacet({ facetValue: tag });
            this.loadItemList();
        },

        resetAllTags()
        {
            this.resetAllSelectedFacets();
            this.loadItemList();
        },

        ...Vuex.mapMutations([
            "resetAllSelectedFacets"
        ]),

        ...Vuex.mapActions([
            "selectFacet",
            "loadItemList"
        ])
    }
});
