<template>
    <div>

        <div class="crossprice" v-if="showCrossPrice && hasCrossPrice">
            <del class="text-muted small text-appearance">
                {{ currentVariation.prices.rrp.unitPrice.formatted | itemCrossPrice }}
            </del>
        </div>

        <span class="price h1">
            <span :content="currentVariation.prices.default.price.value">
                <template v-if="showDynamicPrice">
                    {{ $translate("Ceres::Template.dynamicVariationPrice", { price: variationTotalPrice | currency(currentVariation.prices.default.currency) }) }}
                </template>

                <template v-else>
                    {{ variationTotalPrice | currency(currentVariation.prices.default.currency) }}
                </template>
            </span>
            <sup>*</sup>
            <span :content="currentVariation.prices.default.currency"></span>
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
import { mapState, mapGetters } from "vuex";

export default {
    props:
    {
        showCrossPrice:
        {
            type: Boolean,
            default: true
        }
    },
    data()
    {
        return {}
    },
    computed:
    {
        hasCrossPrice()
        {
            return !!this.currentVariation.prices.rrp &&
                this.currentVariation.prices.rrp.unitPrice.value > 0 &&
                this.currentVariation.prices.rrp.unitPrice.value > this.currentVariation.prices.default.unitPrice.value;
        },

        ...mapState({
            currentVariation: state => state.item.variation.documents[0].data,
        }),

        ...mapGetters([
            "showDynamicPrice",
            "variationGraduatedPrice",
            "variationTotalPrice"
        ])
    }
}
</script>
