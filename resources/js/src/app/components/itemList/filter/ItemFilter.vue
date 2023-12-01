<template>
     <div class="facet bkr-cc" :class="{ 'deliveryFacet': (facet.id == 11) }" v-if="facet.name">
        <div v-if="facet.id != 11">
          <div class="h3" v-html="facetName"></div>
          <div class="facetValues" v-if="facet.type === 'price'">
              <item-filter-price></item-filter-price>
          </div>
          <div v-else class="facetValues">
            <div class="facetValue" v-for="value in facets" :key="value.id">
              <input :id="'option-' + value.id + '-' + _uid" class="form-check-input d-none" type="checkbox" :checked="isSelected(value.id)" @change="updateFacet(value)" :disabled="isLoading || value.count <= 0">
              <label :for="'option-' + value.id + '-' + _uid" class="form-check-label" :class="[paddingClasses, isSelected(value.id) ? 'bg-appearance' : '', 'option-' + value.id]" :style="paddingInlineStyles" v-html="value.name"></label>
            </div>
          </div>
        </div>
        <div v-else class="deliverySwitchContainer">
          <div class="deliverySwitch btn btn-sm btn-bkm delivery" :class="{ 'active': isSelected(123) }">
            <label v-if="!isLoading"  for="instantDeliverySwitch">
              <span>Sofort lieferbar</span>
            </label>
            <label v-else for="instantDeliverySwitch" v-html="'Wird geladen...'"></label>
            <input type="checkbox" :checked="isSelected(123)" @change="updateFacet({ id: 123 })" class="switch" id="instantDeliverySwitch">
          </div>
          <!-- info link hidden for now -->
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
            const toolbarElements = document.getElementsByClassName("bkFilters");

            for (const toolbarElement of toolbarElements)
            {
                if (toolbarElement.contains(this.$vnode.elm))
                {
                    window.localStorage.setItem("openFilterToolbar", true);
                    console.log("LOCSTORAGE updated open");
                }
            }

            this.$store.dispatch("selectFacet", { facetValue });
        },

        isSelected(facetValueId)
        {
            return this.selectedFacets.findIndex(selectedFacet => selectedFacet.id === facetValueId) > -1;
        }
    }
}
</script>
