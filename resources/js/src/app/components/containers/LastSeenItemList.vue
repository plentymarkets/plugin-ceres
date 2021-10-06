<template>
    <div class="row">
        <div class="col-12" v-show="mountedItems.length">
            <slot name="heading"></slot>
        </div>

        <div class="col-12">
            <carousel v-if="mountedItems && mountedItems.length > 0" :items-per-page="itemsPerPage" ref="carousel">
                <template slot="items" v-for="item in items">
                    <category-item
                            :key="item.id"
                            :item-data="item.data"
                            :decimal-count="$ceres.config.item.storeSpecial"
                            :disable-carousel-on-mobile="mountedItems.length > itemsPerPage"
                            :padding-classes="paddingClasses"
                            :padding-inline-styles="paddingInlineStyles">
                        <template #before-prices>
                            <div v-html="getContainerContentById(item.id, 'beforePrices')"></div>
                        </template>
                        <template #after-prices>
                            <div v-html="getContainerContentById(item.id, 'afterPrices')"></div>
                        </template>
                    </category-item>
                </template>
            </carousel>
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

    data() {
        return {
            mountedItems: [],
            isMounted: false
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

    mounted()
    {
        this.mountedItems = this.items;
        this.isMounted = true;
    },

    watch:
    {
        items()
        {
            if(this.isMounted)
            {
                this.mountedItems = this.items;
            }
        }
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
