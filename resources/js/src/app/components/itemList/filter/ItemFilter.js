var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-filter", {

    props: [
        "template",
        "facet"
    ],

    computed:
    {
        ...Vuex.mapState({
            selectedFacets: state => state.itemList.selectedFacets,
            isLoading: state => state.itemList.isLoading
        })
    },

    created()
    {
        this.$options.template = this.template || "#vue-item-filter";
    },

    methods:
    {
        updateFacet(facetValue)
        {
            this.$store.dispatch("selectFacet", facetValue);

            ItemListService.setFacets(this.$store.getters.selectedFacetIds);
            ItemListService.getItemList();
        },

        isSelected(facetValueId)
        {
            return this.selectedFacets.findIndex(selectedFacet => selectedFacet.id === facetValueId) > -1;
        }
    }
});
