Vue.component("order-property-list-group", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-property-list-group"
        },
        propertyGroup: Object
    },

    computed:
    {
        isShownOnItemPageCount()
        {
            const properties = this.propertyGroup.properties.filter(property => property.isShownOnItemPage);

            return properties.length;
        }
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        unsetDeselectedRadios(propertyId)
        {
            const propertiesToUnselect = this.propertyGroup.properties.filter(property => property.id !== propertyId && this.isPropertyTypeRadio(property));

            for (const property of propertiesToUnselect)
            {
                this.setVariationOrderProperty({propertyId: property.id, value: null});
            }
        },

        isPropertyTypeRadio(property)
        {
            const orderPropertyGroupingType = this.propertyGroup.group ? this.propertyGroup.group.orderPropertyGroupingType : null;
            const valueType = property.valueType;

            if (valueType === "empty" && orderPropertyGroupingType === "single")
            {
                return true;
            }

            return false;
        },

        ...Vuex.mapMutations([
            "setVariationOrderProperty"
        ])
    }
});
