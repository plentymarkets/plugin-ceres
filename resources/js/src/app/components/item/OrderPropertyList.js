Vue.component("order-property-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-property-list"
        }
    },

    data: function()
    {
        return {
            activeSlide: 0,
            touchedSlides: {0: true}
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

        ...Vuex.mapState({
            orderPropertyList: state => state.item.variation.documents[0].data.properties
        }),

        ...Vuex.mapGetters([
            "variationGroupedProperties"
        ])
    },

    created()
    {
        this.$options.template = this.template;
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
});
