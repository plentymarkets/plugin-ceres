<template>
    <div class="order-property-slider mb-3" v-if="renderOrderPropertyList">
        <div class="order-property-slider-inner" :style="{transform: 'translateX(-' + (activeSlide * 100) + '%)'}">
            <div v-for="(propertyGroup, index) in sortedGroupedProperties" :class="{'active': index === activeSlide}" :key="index">
                <order-property-list-group
                    :padding-classes="paddingClasses"
                    :padding-inline-styles="paddingInlineStyles"
                    :key="propertyGroup.id"
                    :property-group="propertyGroup">
                </order-property-list-group>
            </div>
        </div>

        <div class="order-property-slider-controls" :class="paddingClasses" :style="paddingInlineStyles" v-if="sortedGroupedProperties.length > 1">
            <div
                class="btn shadow-none"
                @click="slideTo(activeSlide - 1)"
                :class="{'btn-primary': activeSlide > 0, 'btn-secondary disabled': activeSlide === 0}"
                tabindex="0"
                data-testing="order-property-previous-slide">
                <span class="fa fa-chevron-left"></span>
            </div>

            <div class="slider-nav">
                <span v-for="(propertyGroup, index) in sortedGroupedProperties"
                      :class="{ 'active': index === activeSlide, 'highlight': !touchedSlides[index], 'error': propertyGroup.hasError }"
                      @click="slideTo(index)"
                      :key="index"
                      v-tooltip
                      data-toggle="tooltip"
                      data-placement="top"
                      :title="propertyGroup.group ? propertyGroup.group.names.name : $translate('Ceres::Template.singleItemPropertiesWithoutGroup')">
                </span>
            </div>

            <div
                class="btn float-right shadow-none"
                @click="slideTo(activeSlide + 1)"
                :class="{'btn-primary': activeSlide < sortedGroupedProperties.length - 1, 'btn-secondary disabled': activeSlide >= sortedGroupedProperties.length - 1 }"
                tabindex="0"
                data-testing="order-property-next-slide">
                <span class="fa fa-chevron-right"></span>
            </div>
        </div>
    </div>
</template>

<script>
import OrderPropertyListGroup from "./OrderPropertyListGroup.vue";

export default {
    name: "order-property-list",

    components:
    {
        "order-property-list-group": OrderPropertyListGroup
    },

    props:
    {
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        },
    },

    inject: {
        itemId: {
            default: null
        }
    },

    data()
    {
        return {
            activeSlide: 0,
            touchedSlides: { 0: true }
        };
    },

    mounted()
    {
        if (App.useVariationOrderProperties)
        {
            // go to first side, because variation order properties could differ between variations
            document.addEventListener("onVariationChanged", () => {
                this.activeSlide = 0;
            });
        }
    },

    computed:
    {
        sortedGroupedProperties()
        {
            const groupedProperties = JSON.parse(JSON.stringify(this.variationGroupedProperties));

            for (const group of groupedProperties)
            {
                this.sortGroupProperties(group);
            }

            return this.getSortedGroups(groupedProperties);
        },

        missingPropertyGroupIds()
        {
            if (this.variationMarkInvalidProperties)
            {
                return [...new Set(this.variationMissingProperties.map(property => property.group && property.group.id))];
            }

            return [];
        },

        variationGroupedProperties()
        {
            return this.$store.getters[`${this.itemId}/variationGroupedProperties`];
        },

        renderOrderPropertyList()
        {
            return this.variationGroupedProperties.length || App.isShopBuilder;
        },

        variationMissingProperties()
        {
            return this.$store.getters[`${this.itemId}/variationMissingProperties`];
        },

        variationMarkInvalidProperties() {
            return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationMarkInvalidProperties;
        }
    },

    methods:
    {
        sortGroupProperties(group)
        {
            return group.properties.sort((prev, current) =>
            {
                if (prev.position > current.position)
                {
                    return 1;
                }
                if (prev.position < current.position)
                {
                    return -1;
                }

                return 0;
            });
        },

        getSortedGroups(groups)
        {
            for (const group of groups)
            {
                const lowestPosition = group.properties.reduce((prev, current) => (prev.position < current.position) ? prev : current);

                group.lowestPosition = lowestPosition.position;

                const groupId = group.group ? group.group.id : null;

                if (this.variationMarkInvalidProperties && this.missingPropertyGroupIds.includes(groupId))
                {
                    group.hasError = true;
                }
            }

            return groups.sort((prev, current) =>
            {
                if (prev.lowestPosition > current.lowestPosition)
                {
                    return 1;
                }
                if (prev.lowestPosition < current.lowestPosition)
                {
                    return -1;
                }

                return 0;
            });
        },

        slideTo(position)
        {
            if (position >= 0 && position < this.sortedGroupedProperties.length)
            {
                this.activeSlide = position;
                this.touchedSlides[this.activeSlide] = true;
            }
        }
    }
}
</script>
