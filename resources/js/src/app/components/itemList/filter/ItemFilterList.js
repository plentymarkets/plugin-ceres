import UrlService from "services/UrlService";

Vue.component("item-filter-list", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "facetData"
    ],

    data()
    {
        return {
            isActive: false
        };
    },

    computed: Vuex.mapState({
        facets(state)
        {
            return state.itemList.facets.sort((facetA, facetB) =>
            {
                if (facetA.position > facetB.position)
                {
                    return 1;
                }
                if (facetA.position < facetB.position)
                {
                    return -1;
                }

                return 0;
            });
        }
    }),

    created()
    {
        this.$store.commit("setFacets", this.facetData);

        this.$options.template = this.template || "#vue-item-filter-list";

        const urlParams = UrlService.getUrlParams(document.location.search);

        if (urlParams.facets)
        {
            this.$store.commit("setSelectedFacetsByIds", urlParams.facets.split(","));
        }
    },

    methods:
    {
        toggleOpeningState()
        {
            window.setTimeout(() =>
            {
                this.isActive = !this.isActive;
            }, 300);
        }
    }
});
