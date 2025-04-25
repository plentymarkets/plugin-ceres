<template>
    <fieldset>
        <div v-if="isShownOnItemPageCount" class="pt-2">
            <div v-if="propertyGroup.group" :class="paddingClasses" :style="paddingInlineStyles">
                <legend class="h4">
                    {{ propertyGroup.group.names.name }}:
                </legend>
                <p class="text-muted text-wrap color-gray-700">
                    {{ propertyGroup.group.names.description }}
                </p>
            </div>

            <div v-for="property in propertyGroup.properties" :key="property.id" :class="paddingClasses" :style="paddingInlineStyles">
                <order-property-list-item v-if="property.isShownOnItemPage" :group="propertyGroup.group" :property="property"></order-property-list-item>
            </div>
        </div>
    </fieldset>
</template>

<script>
import OrderPropertyListItem from "./OrderPropertyListItem.vue";

export default {
    name: "order-property-list-group",

    components:
    {
        OrderPropertyListItem
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
    }
}
</script>
