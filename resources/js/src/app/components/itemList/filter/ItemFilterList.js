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

        let selectedFacets = [];

        if (urlParams.facets)
        {
            selectedFacets = urlParams.facets.split(",");
        }

        if (urlParams.price_min || urlParams.price_max)
        {
            const priceMin = urlParams.price_min || "";
            const priceMax = urlParams.price_max || "";

            this.$store.commit("setPriceFacet", {priceMin: priceMin, priceMax: priceMax});

            selectedFacets.push("price_" + this.facetData.find(facet => facet.type == "price").id.toString());
        }

        if (selectedFacets.length > 0)
        {
            this.$store.commit("setSelectedFacetsByIds", selectedFacets);
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
