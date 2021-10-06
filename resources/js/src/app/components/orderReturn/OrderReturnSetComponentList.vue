<template>
    <div v-if="setComponents.length > 0" class="set-data small">
        <div class="mb-2"><strong>{{ $translate("Ceres::Template.itemSetContent") }}</strong></div>
        <template v-for="setComponent in setComponents">
            <set-component-item :variation="variations[setComponent.itemVariationId]" :quantity="setComponent.quantity" :order-properties="setComponent.orderProperties"></set-component-item>
        </template>
    </div>
</template>

<script>
import SetComponentItem from "../basket/list/SetComponentItem.vue";

export default {
    name: "order-return-set-component-list",

    components: {
        SetComponentItem
    },

    props: {
        setComponents: {
            type: Array,
            default: () => []
        },
        variations: {
            type: Object,
            default: () => {}
        }
    }
}
</script>