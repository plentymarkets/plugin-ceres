<template>
    <div class="facet-value-box" :style="{'min-width:50px;min-height:20px;': isShopBuilder}">
        <template v-if="showFacetValue || isShopBuilder">
            <input :id="'fvb-option-' + currentValue.id" class="form-check-input d-none" type="checkbox" :checked="isSelected(currentValue.id)" @change="updateFacet(currentValue)" :disabled="isLoading">
            <label :for="'fvb-option-' + currentValue.id" class="form-check-label" :class="[isSelected(currentValue.id) ? 'selected' : '', 'option-' + currentValue.id, className]" v-html="btnText"></label>
        </template>
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
        }
    },

    computed:
    {
        currentFacet() 
        {
            return this.facets.find(facet => facet.id == this.facetId);
        },
        isShopBuilder()
        {
            return App.isShopBuilder;
        },
        currentValue()
        {
            if(this.currentFacet === undefined)
                return undefined;

            return this.currentFacet.values.find(value => value.id == this.valueId);
        },
        showFacetValue()
        {
            return (this.currentFacet !== undefined && this.currentValue !== undefined);
        },
        facetValueText()
        {
            if(this.buttonTex !== "")
                return this.labelText;

            if(this.currentValue === undefined)
                return "FacetValue";

            return this.currentValue.name;
        },
        btnText() {
            if(this.isSelected(this.valueId))
                return "Filter entfernen";
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
