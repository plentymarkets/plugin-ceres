<template>
    <quantity-input class="widget-alignment qty-set"
        @quantity-change="currentQuantity = $event"
        :value="currentQuantity"
        :min="minimumQuantity"
        :max="maximumQuantity"
        :variation-id="currentVariation.variation.id"
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
        currentVariation()
        {
            return this.$store.getters[`${this.itemId}/currentItemVariation`]
        },

        minimumQuantity()
        {
            return this.currentVariation.variation.minimumOrderQuantity;
        },

        maximumQuantity()
        {
            return this.currentVariation.variation.maximumOrderQuantity;
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
        },
    }
}
</script>
