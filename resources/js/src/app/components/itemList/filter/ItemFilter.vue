<template>
    <div v-if="facet.name" class="card">
        <div class="h3">{{ facetName }}</div>
        
        <div v-if="facet.type === 'price'">
            <item-filter-price></item-filter-price>
        </div>

        <div v-else class="form-check-wrapper" v-for="value in facets" :key="value.id" :class="paddingClasses" :style="paddingInlineStyles">
            <div class="form-check" >
                <input :id="'option-' + value.id" class="form-check-input d-none" type="checkbox" :checked="isSelected(value.id)" @change="updateFacet(value)" :disabled="isLoading || value.count <= 0">
                <label :for="'option-' + value.id" class="form-check-label">
                    {{ value.name }}
                </label>
                <div class="filter-badge bg-appearance">{{ value.count }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ItemFilterPrice from "./ItemFilterPrice.vue";

export default {

    name: "item-filter",

    components:
    {
        ItemFilterPrice
    },

    props:
    {
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
                return this.$translate("Ceres::Template." + this.facet.translationKey);
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
}
</script>