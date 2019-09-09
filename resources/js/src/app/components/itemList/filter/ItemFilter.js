import TranslationService from "../../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";
import { sortByKey } from "../../../helper/array";

Vue.component("item-filter", {

    delimiters: ["${", "}"],

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
        }
    },

    computed:
    {
        facets()
        {
            return sortByKey(this.facet.values, "position");
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
