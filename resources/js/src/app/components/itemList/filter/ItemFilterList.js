import UrlService from "services/UrlService";

Vue.component("item-filter-list", {

    delimiters: ["${", "}"],

    props: {
        template: {
            type: String,
            default: "#vue-item-filter-list"
        },
        facetData: {
            type: Array,
            default()
            {
                return [];
            }
        }
    },

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

        this.$options.template = this.template;

        const urlParams = UrlService.getUrlParams(document.location.search);

        let selectedFacets = [];

        if (urlParams.facets)
        {
            selectedFacets = urlParams.facets.split(",");
        }

        if ("showFilter" in urlParams)
        {
            this.isActive = true;
        }

        if (urlParams.priceMin || urlParams.priceMax)
        {
            const priceMin = urlParams.priceMin || "";
            const priceMax = urlParams.priceMax || "";

            this.$store.commit("setPriceFacet", {priceMin: priceMin, priceMax: priceMax});

            selectedFacets.push("price");
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
                if (!this.isActive)
                {
                    UrlService.setUrlParam({showFilter: null});
                }
                else
                {
                    UrlService.removeUrlParam("showFilter");
                }

                this.isActive = !this.isActive;
            }, 300);
        }
    }
});
