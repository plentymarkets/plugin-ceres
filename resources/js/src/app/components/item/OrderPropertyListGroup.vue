<template>
    <div>
        <div v-if="isShownOnItemPageCount">
            <div v-if="propertyGroup.group" :class="paddingClasses" :style="paddingInlineStyles">
                <div class="h4">
                    {{ propertyGroup.group.names.name }}:
                </div>
                <p class="text-muted text-wrap">
                    {{ propertyGroup.group.names.description }}
                </p>
            </div>

            <div v-for="property in propertyGroup.properties" :key="property.id" :class="paddingClasses" :style="paddingInlineStyles">
                <order-property-list-item v-if="property.isShownOnItemPage" :group="propertyGroup.group" :property="property" @radio-change="unsetDeselectedRadios($event)"></order-property-list-item>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import OrderPropertyListItem from "./OrderPropertyListItem.vue";

export default {

    components:
    {
        "order-property-list-item": OrderPropertyListItem
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
}
</script>

<style>

</style>