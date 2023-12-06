<template>
    <div class="facet-value-box" v-if="currentValue">
            <div class="btn-container"><!--
            --><input :id="'fvb-option-' + valueId" class="form-check-input d-none" type="checkbox"
                    :checked="isSelected(valueId)" @change="updateFacet(currentValue)" :disabled="isLoading"><!--
            --><label :for="'fvb-option-' + valueId" class="form-check-label"
                    :class="[isSelected(valueId) ? 'selected' : '', 'option-' + valueId, className]"
                    >{{ btnText }}</label><!--
        --></div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props:
    {
        valueId:
        {
            type: Number,
            default: 278
        },
        facetId:
        {
            type: Number,
            default: 16
        },
        className:
        {
            type: String,
            default: ""
        },
        buttonText:
        {
            type: String,
            default: "Filtern"
        },
        resetText:
        {
            type: String,
            default: "Filter entfernen"
        }
    },
    computed:
    {
        isShopBuilder()
        {
            return App.isShopBuilder;
        },
        currentFacet()
        {
            if(this.facets.length)
                return this.facets.find(facet => facet.id == this.facetId);
            return null
        },
        currentValue()
        {
            if(this.currentFacet === undefined || this.currentFacet === null)
                return null;

            return this.currentFacet.values.find(value => value.id == this.valueId);
        },
        showFacetValue()
        {
            return (this.currentFacet !== null && this.currentValue !== null);
        },
        btnText() {
            if(this.isSelected(this.valueId))
                return this.resetText;
            return this.buttonText;
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
            this.$store.dispatch("selectFacet", { facetValue });
        },
        isSelected(facetValueId)
        {
            return this.selectedFacets.findIndex(selectedFacet => selectedFacet.id === facetValueId) > -1;
        }
    }
}
</script>
