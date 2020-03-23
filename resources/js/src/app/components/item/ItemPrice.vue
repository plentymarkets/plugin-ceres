<template>
    <div :class="{ 'has-crossprice': hasCrossPrice }">
        <div class="crossprice" v-if="showCrossPrice && hasCrossPrice">
            <del class="text-muted small text-appearance">
                {{ currentVariation.prices.rrp.unitPrice.formatted | itemCrossPrice }}
            </del>
        </div>

        <span class="price h1">
            <span :content="currentPrice.price.value">
                <template v-if="showDynamicPrice">
                    {{ $translate("Ceres::Template.dynamicVariationPrice",
                        {
                            price: $options.filters.currency(variationTotalPrice, currentVariation.prices.default.currency)
                        }
                    ) }}
                </template>

                <template v-else>
                    {{ variationTotalPrice | currency(currentPrice.currency) }}
                </template>
            </span>
            <sup>*</sup>
            <span :content="currentPrice.currency"></span>
        </span>

        <div class="base-price text-muted my-3" v-if="currentVariation.unit">
            <div>
                {{ $translate("Ceres::Template.singleItemContent") }}
                <span>{{ currentVariation.unit.content | numberFormat }} </span>
                <span>{{ currentVariation.unit.names.name }}</span>
            </div>
            <div v-if="currentVariation.variation.mayShowUnitPrice">
                {{ $translate("Ceres::Template.singleItemUnitPrice") }}
                <span class="base-price-value">
                    {{ variationGraduatedPrice.basePrice | specialOffer(currentVariation.prices, "basePrice") }}
                </span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "item-price",

    props:
    {
        showCrossPrice:
        {
            type: Boolean,
            default: true
        }
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        currentVariation() {
            return this.$store.getters[`${this.itemId}/currentItemVariation`]
        },

        hasCrossPrice() {
            return !!this.currentVariation.prices.rrp &&
                this.currentVariation.prices.rrp.unitPrice.value > 0 &&
                this.currentVariation.prices.rrp.unitPrice.value > this.currentVariation.prices.default.unitPrice.value;
        },

        variationGraduatedPrice() {
            return this.$store.getters[`${this.itemId}/variationGraduatedPrice`];
        },

        variationTotalPrice() {
            return this.$store.getters[`${this.itemId}/variationTotalPrice`];
        },

        showDynamicPrice() {
            const state = this.$store.state.items[this.itemId];
            return App.config.item.showPleaseSelect
                && (state.variationSelect && !state.variationSelect.isVariationSelected)
                && (state.pleaseSelectVariationId === this.currentVariation.variation.id
                    || state.pleaseSelectVariationId === 0);
        },

        isSetComponent()
        {
            return this.currentVariation.item.itemType !== "set" &&
                this.$store.state.items.setComponentIds.length > 0;
        },

        currentPrice()
        {
            if (this.isSetComponent)
            {
                return this.currentVariation.prices.set;
            }
            else // default
            {
                return this.currentVariation.prices.default;
            }
        }
    }
}
</script>
