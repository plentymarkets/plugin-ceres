import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import { sortByKey } from "../../helper/array";

Vue.component("order-property-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-property-list"
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

    data: function()
    {
        return {
            activeSlide: 0,
            touchedSlides: { 0: true }
        };
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

        ...mapState({
            variationMarkInvalidProperties: state => state.item.variationMarkInvalidProperties
        }),

        ...mapGetters([
            "variationGroupedProperties",
            "variationMissingProperties"
        ])
    },

    methods:
    {
        sortGroupProperties(group)
        {
            return sortByKey(group.properties, "position");
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

            return sortByKey(groups, "lowestPosition");
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
});
