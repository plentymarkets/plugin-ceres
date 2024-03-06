<template>
    <div class="bkFilters bkr-cc" v-show="facets && facets.length > 0">

        <div class="filterShadow" @click="toggleFilter" v-if="filterOpen"></div>

        <a class="btn btn-sm btn-bkm-inverted facetToggleButton" :class="{'active': activeFacets > 0 }" @click="toggleFilter">
          <i class="fa fa-sliders default-float mr-2" aria-hidden="true"></i> {{ $translate("Ceres::Template.itemFilter") }} <span v-if="activeFacets > 0" v-html="' (' + activeFacets + ')'"></span>
        </a>

        <div class="filter-wrapper">
            <div @defaultOpen="toggleFilter" class="filter-collapse" :class="{'show': filterOpen}">
                <div class="filterLoading" v-if="isLoading">
                    <div class="bkLoading"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
              <div class="page-content component-loading" :class="{ 'isLoading': isLoading }">
                  <span class="filterHeading">Filtern</span>
                  <div class="facetOutter" :selectedFactes="selectedFacets.length">
                      <item-filter v-for="facet in facets" :facet="facet" :key="facet.id"></item-filter>
                  </div>
                  <div class="filterBtnRow">
                        <button type="button" class="btn btn-bkm mb-2 applyFilterButton" @click="toggleFilter">
                            <span>Suchergebnis</span>
                            <i class="fa fa-arrow-right ml-2" aria-hidden="true"></i>
                        </button>

                        <button type="button" class="btn btn-bkm-inverted btn-sm applyFilterButton" @click="resetAllTags">
                            <span>Zurücksetzen</span>
                            <i class="fa fa-refresh ml-2" aria-hidden="true"></i>
                        </button>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ItemFilter from "./ItemFilter.vue";
import { ComponentIdMixin } from "../../../mixins/componentId.mixin";

export default {

    name: "item-filter-list",

    components:
    {
        ItemFilter
    },

    mixins: [ComponentIdMixin], // Experimental mixin, may be removed in the future.
    
    data()
    {
        return {
            filterOpen: false,
        };
    },

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
        activeFacets() 
        {
            return this.selectedFacets.length;
        },

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

    methods: {
        toggleFilter()
        {
            this.filterOpen = !this.filterOpen;
        },
        resetAllTags()
        {
            this.resetAllSelectedFacets();
            this.loadItemList();
        },
        ...mapMutations([
            "resetAllSelectedFacets"
        ]),

        ...mapActions([
            "selectFacet",
            "loadItemList"
        ])
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
