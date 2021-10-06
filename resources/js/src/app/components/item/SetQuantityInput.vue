<template>
    <quantity-input class="widget-alignment qty-set"
        @quantity-change="currentQuantity = $event"
        :value="currentQuantity"
        :min="setComponentConfig.minimumOrderQuantity"
        :max="setComponentConfig.maximumOrderQuantity"
        :variation-id="currentVariation.variation.id"
        :waiting="!setComponentConfig.orderQuantityPossible || isLoading || !isSalable"
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

            if(App.isShopBuilder)
            {
                return setComponents[0];
            }
            else
            {
                return setComponents.find(setComponent => setComponent.itemId === this.itemId);
            }
        },

        currentVariation()
        {
            return this.$store.getters[`${this.itemId}/currentItemVariation`];
        },

        isLoading()
        {
            return this.$store.state.items.isAddToBasketLoading === this.currentVariation.variation.id || this.$store.state.items.isSetLoading;
        },

        isSalable()
        {
            return !!this.currentVariation.filter && this.currentVariation.filter.isSalable;
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
