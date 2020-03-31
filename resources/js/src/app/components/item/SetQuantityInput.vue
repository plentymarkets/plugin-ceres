<template>
    <quantity-input class="widget-alignment qty-set"
        @quantity-change="currentQuantity = $event"
        :value="currentQuantity"
        :min="setComponentConfig.minimumOrderQuantity"
        :max="setComponentConfig.maximumOrderQuantity"
        :variation-id="currentVariationId"
        :waiting="!setComponentConfig.orderQuantityPossible"
        :use-appearance="true">
    </quantity-input>
</template>

<script>
export default {
    name: "set-quantity-input",

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        setComponentConfig()
        {
            const itemSetId = this.$store.state.items.itemSetId;

            const setComponents = this.$store.getters[`${itemSetId}/currentItemVariation`].setComponents;

            return setComponents.find(setComponent => setComponent.itemId === this.itemId);
        },

        currentVariationId()
        {
            return this.$store.getters[`${this.itemId}/currentItemVariation`].variation.id;
        },

        currentQuantity:
        {
            get()
            {
                return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationOrderQuantity;
            },

            set(quantity)
            {
                this.$store.commit(`${this.itemId}/setVariationOrderQuantity`, quantity);
            }
        }
    }
}
</script>
