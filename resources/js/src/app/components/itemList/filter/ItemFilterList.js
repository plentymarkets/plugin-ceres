import UrlService from "../../../services/UrlService";
import Vue from "vue";
import { mapState } from "vuex";

Vue.component("item-filter-list", {

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
        },
        allowedFacetsTypes:
        {
            type: Array,
            default: () => []
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        }
    },

    data()
    {
        return {
            initialSelectedFacets: [],
            initialPriceMin: "",
            initialPriceMax: ""
        };
    },

    computed:
    {
        ...mapState({
            facets(state)
            {
                if (!this.allowedFacetsTypes.length)
                {
                    return state.itemList.facets;
                }

                return state.itemList.facets
                    .filter(facet => this.allowedFacetsTypes.includes(facet.id) || this.allowedFacetsTypes.includes(facet.type));
            },
            isLoading: state => state.itemList.isLoading,
            selectedFacets: state => state.itemList.selectedFacets
        })
    },

    created()
    {
        this.$store.commit("addFacets", this.facetData);

        this.initSelectedFacets();
    },

    methods:
    {
        initSelectedFacets()
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            let selectedFacets = [];

            if (urlParams.facets)
            {
                selectedFacets = urlParams.facets.split(",");
            }

            if (this.initPriceFacet(urlParams))
            {
                selectedFacets.push("price");
            }

            if (selectedFacets.length > 0)
            {
                this.$store.commit("setSelectedFacetsByIds", selectedFacets);
            }

            this.initialSelectedFacets = selectedFacets;
        },

        initPriceFacet(urlParams)
        {
            if (urlParams.priceMin || urlParams.priceMax)
            {
                const priceMin = urlParams.priceMin || "";
                const priceMax = urlParams.priceMax || "";

                this.$store.commit("setPriceFacet", { priceMin: priceMin, priceMax: priceMax });

                this.initialPriceMin = priceMin;
                this.initialPriceMax = priceMax;

                return true;
            }

            return false;
        }
    }
});
