<template>
    <div v-if="filterListBulk">
        <item-filter v-for="facet in facets"
            :facet="facet"
            :key="facet.id"
            :padding-classes="paddingClasses"
            :padding-inline-styles="paddingInlineStyles">
        </item-filter>
    </div>

    <div v-else class="filter-wrapper" v-show="facets && facets.length > 0">
        <a class="btn btn-link filter-toggle" data-toggle="collapse" :href="'#filter-collapse_' + _cid" aria-expanded="false" :aria-controls="'filter-collapse_' + _cid">
            <i class="fa fa-sliders default-float" aria-hidden="true"></i> {{ $translate("Ceres::Template.itemFilter") }}
        </a>

        <div v-open-filter-toolbar class="filter-collapse collapse" :id="'filter-collapse_' + _cid">
            <div class="container-max page-content component-loading" :class="{ 'is-loading': isLoading }">
                <div class="card-columns">
                    <item-filter v-for="facet in facets" :facet="facet" :key="facet.id"></item-filter>
                </div>

                <div class="row">
                    <div class="col-12 text-right">
                        <button type="button" class="btn btn-primary btn-medium-large" data-toggle="collapse" :href="'#filter-collapse_' + _cid" :aria-controls="'filter-collapse_' + _cid">
                            <i class="fa fa-times" aria-hidden="true"></i>
                            <span>{{ $translate("Ceres::Template.itemClose") }}&nbsp;</span>
                        </button>
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
        this.$store.commit("addFacets", this.facetData);
    }
}
</script>
