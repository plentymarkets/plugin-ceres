<template>
    <div :class="{ 'has-crossprice': hasCrossPrice }">
        <div class="crossprice" v-if="showCrossPrice && hasCrossPrice" :class="{ 'is-special-offer': hasSpecialOffer }">
            <del class="text-muted small text-appearance">
                <template v-if="hasSpecialOffer">
                    {{ currentVariation.prices.default.unitPrice.formatted | itemCrossPrice(true) }}
                </template>
                <template v-else>
                    {{ currentVariation.prices.rrp.unitPrice.formatted | itemCrossPrice }}
                </template>
            </del>
        </div>

        <span class="price h1" :class="{ 'is-special-offer': hasSpecialOffer }">
            <span>
                <template v-if="showDynamicPrice">
                    {{ $translate("Ceres::Template.dynamicVariationPrice",
                        {
                            price: $options.filters.currency(variationTotalPrice, currentVariation.prices.default.currency)
                        }
                    ) }}
                </template>

                <template v-else>
                    {{ variationTotalPrice | currency(currentVariation.prices.default.currency) }}
                </template>
            </span>
            <sup>*</sup>
        </span>

        <!-- class .is-single-piece is added for customers to hide the unit if it is C62 -->
        <div class="base-price text-muted my-3"
            v-if="currentVariation.unit"
            :class="{ 'is-single-piece': currentVariation.unit && currentVariation.unit.content === 1 && currentVariation.unit.unitOfMeasurement === 'C62' }">
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
            const hasRrpPrice = !!this.currentVariation.prices.rrp &&
                this.currentVariation.prices.rrp.unitPrice.value > this.currentVariation.prices.default.unitPrice.value;

            const hasBeforePrice = this.hasSpecialOffer &&
                !!this.currentVariation.prices.default &&
                this.currentVariation.prices.default.unitPrice.value > this.currentVariation.prices.specialOffer.unitPrice.value;

            return hasRrpPrice || hasBeforePrice;
        },

        hasSpecialOffer() {
            return !!this.currentVariation.prices.specialOffer;
        },

        variationGraduatedPrice() {
            return this.$store.getters[`${this.itemId}/variationGraduatedPrice`];
        },

        variationTotalPrice() {
            return this.$store.getters[`${this.itemId}/variationTotalPrice`];
        },

        showDynamicPrice() {
            const state = this.$store.state.items[this.itemId];
            return App.config.item.showPleaseSelect && App.isCheapestSorting
                && (state.variationSelect && !state.variationSelect.isVariationSelected)
                && (state.pleaseSelectVariationId === this.currentVariation.variation.id
                    || state.pleaseSelectVariationId === 0);
        }
    }
}
</script>
