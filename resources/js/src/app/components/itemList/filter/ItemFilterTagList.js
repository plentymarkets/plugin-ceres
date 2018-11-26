Vue.component("item-filter-tag-list", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    computed: Vuex.mapState({
        tagList: state => state.itemList.selectedFacets
    }),

    created()
    {
        this.$options.template = this.template || "#vue-item-filter-tag-list";
    },

    methods:
    {
        removeTag(tag)
        {
            // TODO reload
            // this.$store.dispatch("selectFacet", tag);
        }
    }
});
