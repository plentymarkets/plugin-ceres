<template>
     <div class="facet" v-if="facet.name">
        <div class="h3" @click="toggleFacet">
            <span>{{ facetName }}<span v-if="activeValues > 0" v-html="' (' + activeValues + ')'"></span></span>
            <svg :class="{'active': facetOpen }" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" class="toggleIcon"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <slide-up-down :duration="500" :active="facetOpen">
          <div class="facetValues" :class="{'open': facetOpen }" v-if="facet.type === 'price'">
              <item-filter-price></item-filter-price>
          </div>
          <div class="facetValues" :class="{'open': facetOpen }" v-else>
            <div class="facetValue" :class="{'selected': value.selected}" v-for="value in facets" :key="value.id">
              <input :id="'option-' + value.id + '-' + _uid" class="facet-value-input d-none" type="checkbox" :checked="isSelected(value.id)" @change="updateFacet(value)" :disabled="isLoading || value.count <= 0">
              <label :for="'option-' + value.id + '-' + _uid" class="facet-value-label" :class="[paddingClasses, isSelected(value.id) ? 'bg-appearance' : '', 'option-' + value.id]" :style="paddingInlineStyles" v-html="value.name"></label>
            </div>
          </div>
        </slide-up-down>
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

    data()
    {
        return {
            facetOpen: false,
        };
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

        activeValues()
        {
            return this.facets.filter(facet => facet.selected).length;
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
            facetValue.selected = true;

            const toolbarElements = document.getElementsByClassName("bkFilters");

            for (const toolbarElement of toolbarElements)
            {
                if (toolbarElement.contains(this.$vnode.elm))
                {
                    window.localStorage.setItem("openFilterToolbar", true);
                }
            }

            this.$store.dispatch("selectFacet", { facetValue });
        },

        toggleFacet() 
        {
            this.facetOpen = !this.facetOpen;
        },

        isSelected(facetValueId)
        {
            return this.selectedFacets.findIndex(selectedFacet => selectedFacet.id === facetValueId) > -1;
        }
    },
    
    mounted: function () {
        this.$nextTick(function () {
            if(this.activeValues > 0) {
                this.facetOpen = true;
            }
        })
    }
}
</script>
