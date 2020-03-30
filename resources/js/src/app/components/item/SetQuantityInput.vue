<template>
    <quantity-input class="widget-alignment qty-set"
        @quantity-change="currentQuantity = $event"
        :value="currentQuantity"
        :min="itemSetVariation.minimumOrderQuantity"
        :max="itemSetVariation.maximumOrderQuantity"
        :variation-id="currentVariationId"
        :waiting="!itemSetVariation.orderQuantityPossible">
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
        itemSetVariation()
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
