<template>
    <div class="bkFilters bkr-cc" v-show="facets && facets.length > 0">
        <item-filter v-for="facet in facets.filter(function (facet) { return (facet.id == 11) })" :facet="facet" :key="facet.id"></item-filter>

        <a class="btn btn-sm btn-bkm-inverted facetToggleButton" data-toggle="collapse" :href="'#filter-collapse_' + _uid" aria-expanded="false" :aria-controls="'filter-collapse_' + _uid">
          <i class="fa fa-sliders default-float mr-2" aria-hidden="true"></i> {{ $translate("Ceres::Template.itemFilter") }}
        </a>

        <div class="filter-wrapper">

            <div class="filter-collapse collapse" :id="'filter-collapse_' + _uid">
              <div class="page-content component-loading" :class="{ 'isLoading': isLoading }">
                  <div class="facetOutter" :selectedFactes="selectedFacets.length">
                      <item-filter v-for="facet in facets" :facet="facet" :key="facet.id" v-if="facet.id != 11"></item-filter>
                      <div class="facet">
                          <div class="h3">{{ $translate("biokinderDesign::Template.itemListSort") }}</div>
                          <slot name="sorting-box"></slot>
                      </div>
                  </div>
                  <div class="row filterBtnRow">
                      <div class="col-12 text-right">
                          <button type="button" class="btn btn-bkm btn-medium-large applyFilterButton" data-toggle="collapse" :href="'#filter-collapse_' + _uid" :aria-controls="'filter-collapse_' + _uid">
                            <span>{{ $translate("Ceres::Template.itemClose") }}&nbsp;</span>
                            <i class="fa fa-times ml-2" aria-hidden="true"></i>
                          </button>
                      </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
</template>

<script>
import { mapState } from "vuex";
import ItemFilter from "./ItemFilter.vue";
import { ComponentIdMixin } from "../../../mixins/componentId.mixin";

export default {

    name: "item-filter-list",

    components:
    {
        ItemFilter
    },

    mixins: [ComponentIdMixin], // Experimental mixin, may be removed in the future.

    props: {
        filterListBulk: Boolean,
        facetData:
        {
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
        if (!this.$store.state.itemList.facets?.length)
        {
            this.$store.commit("addFacets", this.facetData);
        }
    }
}
</script>
