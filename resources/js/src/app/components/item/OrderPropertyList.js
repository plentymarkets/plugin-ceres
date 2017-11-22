Vue.component("order-property-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-property-list"
        }
    },

    computed:
    {
        propertyGroups()
        {
            if (this.orderPropertyList)
            {
                const groups = this.getGroupedProperties(this.orderPropertyList);

                return this.getSortedGroups(groups);
            }

            return [];
        },

        ...Vuex.mapState({
            orderPropertyList: state => state.item.variation.documents[0].data.properties
        })
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
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
                        properties: [property]
                    });
                }
            }

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
        }
    }
});
