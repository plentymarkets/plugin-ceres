import TranslationService from "../../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";

Vue.component("item-filter", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-item-filter"
        },
        facet:
        {
            type: Object
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

    computed:
    {
        facets()
        {
            return this.facet.values;
        },

        facetName()
        {
            if (this.facet.translationKey && this.facet.translationKey.length > 0)
            {
                return TranslationService.translate("Ceres::Template." + this.facet.translationKey);
            }

            return this.facet.name;
        },

        ...mapState({
            selectedFacets: state => state.itemList.selectedFacets,
            isLoading: state => state.itemList.isLoading
        })
    },

    methods:
    {
        updateFacet(facetValue)
        {
            this.$store.dispatch("selectFacet", { facetValue });
        },

        isSelected(facetValueId)
        {
            return this.selectedFacets.findIndex(selectedFacet => selectedFacet.id === facetValueId) > -1;
        }
    }
});
