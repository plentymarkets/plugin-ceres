<template>
    <div class="row" v-show="items.length">
        <div class="col-12" style="padding: 0;">
				<div class="widget-caption bg-appearance widget-item-list-caption mb-3" style="padding: 0;">
					<div>
						<h2>Zuletzt angesehen</h2>
					</div>
				</div>
			</div>
        <div class="col-12">
            <div class="row">
                <template v-for="item in items">
                    <div class="col-6 col-md-3 col-lg-3">
                        <category-item
                                :key="item.id"
                                :item-data="item.data"
                                :decimal-count="$ceres.config.item.storeSpecial"
                                :disable-carousel-on-mobile="items.length > itemsPerPage"
                                :padding-classes="paddingClasses"
                                :padding-inline-styles="paddingInlineStyles">
                            <template #before-prices>
                                <div v-html="getContainerContentById(item.id, 'beforePrices')"></div>
                            </template>
                            <template #after-prices>
                                <div v-html="getContainerContentById(item.id, 'afterPrices')"></div>
                            </template>
                        </category-item>
                        </div>
                    </template>
            </div>
        </div>
    </div>
</template>

<script>
import { isDefined } from "../../helper/utils";
import { mapState } from "vuex";

export default {
    props: {
        itemsPerPage:
        {
            type: Number,
            default: 4
        },

        maxItems:
        {
            type: Number,
            default: 4
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

    computed: mapState({
        items(state)
        {
            return state.lastSeen.lastSeenItems.slice(0, this.maxItems);
        },
        containers: state => state.lastSeen.containers
    }),

    beforeMount()
    {
        this.$store.dispatch("getLastSeenItems");
    },

    methods:
    {
        getContainerContentById(variationId, containerKey)
        {
            const containersById = this.containers[variationId];

            if (isDefined(containersById))
            {
                const container = containersById[containerKey];

                if (isDefined(container))
                {
                    return container;
                }
            }

            return "";
        }
    }
}
</script>
