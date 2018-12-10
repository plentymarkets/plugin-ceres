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
            initialSelectedFacets: [],
            isActive: false
        };
    },

    computed:
    {
        isInitialFacetSelectionActive()
        {
            const selectedFacetIds = this.selectedFacets.map(facet => facet.id);

            if (this.initialSelectedFacets.length === selectedFacetIds.length)
            {
                for (const selectedFacetId of selectedFacetIds)
                {
                    if (!this.initialSelectedFacets.find(initialFacetId => initialFacetId === selectedFacetId))
                    {
                        return false;
                    }
                }

                return true;
            }

            return false;
        },

        ...Vuex.mapState({
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
            },
            isLoading: state => state.itemList.isLoading,
            selectedFacets: state => state.itemList.selectedFacets
        })
    },

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
            UrlService.removeUrlParam("showFilter");
        }

        if (urlParams.priceMin || urlParams.priceMax)
        {
            const priceMin = urlParams.priceMin || "";
            const priceMax = urlParams.priceMax || "";

            this.$store.commit("setPriceFacet", {priceMin: priceMin, priceMax: priceMax, showFilter: true});

            selectedFacets.push("price");
        }

        if (selectedFacets.length > 0)
        {
            this.$store.commit("setSelectedFacetsByIds", selectedFacets);
        }

        this.initialSelectedFacets = selectedFacets;
    },

    methods:
    {
        toggleOpeningState()
        {
            window.setTimeout(() =>
            {
                if (this.isActive && !this.isInitialFacetSelectionActive)
                {
                    this.$store.dispatch("loadItemList");
                }

                this.isActive = !this.isActive;
            }, 300);
        }
    }
});
