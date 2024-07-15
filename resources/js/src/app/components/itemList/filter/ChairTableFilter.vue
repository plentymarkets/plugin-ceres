<template>
     <div class="facet" v-if="currentFacet.name">
        <div class="h3" v-html="currentFacet.facetName"></div>
          <div class="facetValues">
            <div class="facetValue" v-for="value in currentFacet.values" :key="value.id">
              <input :id="'option-' + value.id + '-' + _uid" class="form-check-input d-none" type="checkbox" :checked="isSelected(value.id)" @change="updateFacet(value)" :disabled="isLoading || value.count <= 0">
              <label :for="'option-' + value.id + '-' + _uid" class="form-check-label" :class="[paddingClasses, isSelected(value.id) ? 'bg-appearance' : '', 'option-' + value.id]" :style="paddingInlineStyles" v-html="value.name"></label>
            </div>
          </div>
      </div>
</template>

<script>
import { mapState } from "vuex";

export default {

    name: "chair-table-filter",
    props:
    {
        facetId:
        {
            type: Number,
            default: 16 // groessenkategorie
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
        currentFacet() 
        {
            return this.facets.find(facet => facet.id == this.facetId);
        },
        ...mapState({
            facets(state) {
                return state.itemList.facets;
            },
            isLoading: state => state.itemList.isLoading,
            selectedFacets: state => state.itemList.selectedFacets
        })
    },

    methods:
    {
        updateFacet(facetValue) {
            console.log("Selected Facet value", facetValue);
            this.$store.dispatch("selectFacet", { facetValue });
        },
        isSelected(facetValueId)
        {
            return this.selectedFacets.findIndex(selectedFacet => selectedFacet.id === facetValueId) > -1;
        }
    }
}
</script>
