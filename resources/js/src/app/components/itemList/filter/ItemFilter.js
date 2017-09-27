var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-filter", {

    props: [
        "template",
        "facet"
    ],

    data()
    {
        return {
            isLoading: false
        };
    },

    computed:
    {
        ...Vuex.mapState({
            selectedFacets: state => state.itemList.selectedFacets
        })
    },

    created()
    {
        this.$options.template = this.template || "#vue-item-filter";
    },

    ready()
    {
        ResourceService.bind("isLoading", this);
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
