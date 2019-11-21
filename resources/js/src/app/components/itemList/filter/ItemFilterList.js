import UrlService from "../../../services/UrlService";
import Vue from "vue";
import { mapState } from "vuex";

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
            initialPriceMin: "",
            initialPriceMax: "",
            isActive: false
        };
    },

    computed:
    {
        isInitialFacetSelectionActive()
        {
            if (!this.isInitialPriceFacetActive)
            {
                return false;
            }

            const selectedFacetIds = this.selectedFacets.map(facet => facet.id);

            if (this.initialSelectedFacets.length === selectedFacetIds.length)
            {
                for (const selectedFacetId of selectedFacetIds)
                {
                    if (!this.initialSelectedFacets.find(initialFacetId => initialFacetId.toString() === selectedFacetId.toString()))
                    {
                        return false;
                    }
                }

                return true;
            }

            return false;
        },

        isInitialPriceFacetActive()
        {
            const currentPriceFacet = this.selectedFacets.filter(facet => facet.id === "price")[0];

            // no initial price facet and no current one
            if (!this.initialPriceMin && !this.initialPriceMax && !currentPriceFacet)
            {
                return true;
            }

            if (currentPriceFacet)
            {
                if (currentPriceFacet.priceMin === this.initialPriceMin && currentPriceFacet.priceMax === this.initialPriceMax)
                {
                    return true;
                }
            }

            return false;
        },

        ...mapState({
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

        const urlParams = UrlService.getUrlParams(document.location.search);

        let selectedFacets = [];

        if (urlParams.facets)
        {
            selectedFacets = urlParams.facets.split(",");
        }

        if (urlParams.priceMin || urlParams.priceMax)
        {
            const priceMin = urlParams.priceMin || "";
            const priceMax = urlParams.priceMax || "";

            this.$store.commit("setPriceFacet", { priceMin: priceMin, priceMax: priceMax });

            this.initialPriceMin = priceMin;
            this.initialPriceMax = priceMax;

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
