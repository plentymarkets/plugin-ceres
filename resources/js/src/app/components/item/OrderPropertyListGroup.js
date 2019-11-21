import Vue from "vue";
import { mapMutations } from "vuex";

Vue.component("order-property-list-group", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-property-list-group"
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

    methods:
    {
        unsetDeselectedRadios(propertyId)
        {
            const propertiesToUnselect = this.propertyGroup.properties.filter(property => property.id !== propertyId && this.isPropertyTypeRadio(property));

            for (const property of propertiesToUnselect)
            {
                this.setVariationOrderProperty({ propertyId: property.id, value: null });
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

        ...mapMutations([
            "setVariationOrderProperty"
        ])
    }
});
