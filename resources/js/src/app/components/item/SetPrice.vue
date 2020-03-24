<template>
    <div class="has-crossprice">
        <div class="crossprice" v-if="showCrossPrice && isSet">
            <del class="text-muted small text-appearance">
                {{ variationTotalPrice + " EUR" | itemCrossPrice }}
            </del>
        </div>

        <span class="price h1">
            <span :content="variationSetRebatePrice">
                <template v-if="isSet && !allVariationSelected">
                    {{ $translate("Ceres::Template.dynamicSetPrice",
                        {
                            price: $options.filters.currency(variationSetRebatePrice, "EUR")
                        }
                    ) }}
                </template>

                <template v-else>
                    <template v-if="!isSet">
                        {{ variationTotalPrice | currency(currentVariation.prices.set.currency) }}
                    </template>
                    <template v-else>
                        {{ variationSetRebatePrice | currency("EUR") }}
                    </template>
                </template>
            </span>
            <sup>*</sup>
            <span content="EUR"></span>
        </span>
    </div>
</template>

<script>
export default {
    name: "set-price",

    props:
    {
        showCrossPrice: {
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

        variationTotalPrice() {
            return this.$store.getters[`${this.itemId}/variationTotalPrice`];
        },

        variationSetRebatePrice() {
            return this.variationTotalPrice * (1 - (this.currentVariation.item.rebate / 100));
        },

        allVariationSelected() {
            return this.$store.getters["itemSetAllVariationSelected"];
        },

        isSet() {
            return this.currentVariation.item.itemType === "set";
        }
    }
}
</script>
