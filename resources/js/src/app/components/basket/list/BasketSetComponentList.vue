<template>
    <div v-if="setComponents.length > 0" class="set-data small">
        <div class="mb-2"><strong>{{ $translate("Ceres::Template.itemSetContent") }}</strong></div>
        <template v-for="setComponent in setComponents">
            <set-component-item :variation="setComponent.variation.data" :quantity="setComponent.quantity" :order-properties="setComponent.basketItemOrderParams"></set-component-item>
        </template>
    </div>
</template>

<script>
import SetComponentItem from "./SetComponentItem.vue"

export default {
    name: "basket-set-component-list",

    components: {
        SetComponentItem
    },

    props: {
        setComponents: {
            type: Array,
            default: () => []
        }
    }
}
</script>
