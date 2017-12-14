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
            propertyGroups: []
        };
    },

    computed: Vuex.mapState({
        orderPropertyList: state => state.item.variation.documents[0].data.properties
    }),

    created()
    {
        this.$options.template = this.template;

        this.initializePropertyGroups();
    },

    methods:
    {
        initializePropertyGroups()
        {
            if (this.orderPropertyList)
            {
                const groups = this.getGroupedProperties(this.orderPropertyList);

                this.propertyGroups = this.getSortedGroups(groups);
            }
        },

        getGroupedProperties(orderPropertyList)
        {
            const groups = [];

            for (const property of orderPropertyList)
            {
                let groupId = null;

                if (property.group)
                {
                    groupId = property.group.id;
                }

                const group = groups.find(group => group.id === groupId);

                if (group)
                {
                    group.properties.push(property);
                }
                else
                {
                    groups.push({
                        id: groupId,
                        properties: [property],
                        touched: false
                    });
                }
            }

            groups[0].touched = true;

            for (const group of groups)
            {
                this.sortGroupProperties(group);
            }

            return groups;
        },

        getSortedGroups(groups)
        {
            for (const group of groups)
            {
                const lowestPosition = group.properties.reduce((prev, current) => (prev.property.position < current.property.position) ? prev : current);

                group.lowestPosition = lowestPosition.property.position;
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

        sortGroupProperties(group)
        {
            return group.properties.sort((prev, current) =>
            {
                if (prev.property.position > current.property.position)
                {
                    return 1;
                }
                if (prev.property.position < current.property.position)
                {
                    return -1;
                }

                return 0;
            });
        },

        nextSlide()
        {
            if (this.activeSlide < this.propertyGroups.length - 1)
            {
                this.activeSlide++;
                this.propertyGroups[this.activeSlide].touched = true;
            }
        },

        prevSlide()
        {
            if (this.activeSlide > 0)
            {
                this.activeSlide--;
                this.propertyGroups[this.activeSlide].touched = true;
            }
        },

        slideTo(position)
        {
            if (position >= 0 && position < this.propertyGroups.length)
            {
                this.activeSlide = position;

                this.propertyGroups[position].touched = true;
            }
        }
    }
});
