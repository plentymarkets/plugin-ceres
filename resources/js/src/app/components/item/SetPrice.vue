<template>
    <div class="has-crossprice">
        <div class="crossprice" v-if="showCrossPrice && isSet && this.currentVariation.item.rebate > 0">
            <del class="text-muted small text-appearance">
                {{ setNoRebatePrice | currency(currentVariation.prices.set.currency) | itemCrossPrice }}
            </del>
        </div>

        <span class="price h1">
            <span>
                <template v-if="!isVariationSelected || isSetLoading">
                    {{ $translate("Ceres::Template." + dynamicTranslationKey,
                        {
                            price: $options.filters.currency(dynamicPrice, currentVariation.prices.set.currency)
                        }
                    ) }}
                </template>

                <template v-else>
                    {{ dynamicPrice | currency(currentVariation.prices.set.currency) }}
                </template>
            </span>
            <sup>*</sup>
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

        setNoRebatePrice() {
            if(this.isSet)
            {
                if(this.isSetLoading)
                {
                    return (this.variationTotalPrice / (100 - this.currentVariation.item.rebate)) * 100;
                }
                else
                {
                    return this.variationTotalPrice;
                }
            }

            return null;
        },

        variationSetRebatePrice() {
            if(this.isSetLoading)
            {
                return this.variationTotalPrice
            }
            else
            {
                return this.variationTotalPrice * (1 - (this.currentVariation.item.rebate / 100));
            }
        },

        isVariationSelected() {
            if(this.isSet)
            {
                return this.$store.getters["itemSetAllVariationSelected"];
            }
            else
            {
                return this.$store.state.items[this.itemId].variationSelect.isVariationSelected
            }
        },

        isSet() {
            return this.currentVariation.item.itemType === "set" ||
                (App.isShopBuilder && this.currentVariation.item.itemType !== undefined);
        },

        isSetLoading() {
            return this.$store.state.items.isSetLoading;
        },

        dynamicPrice() {
            return this.isSet ? this.variationSetRebatePrice : this.variationTotalPrice;
        },

        dynamicTranslationKey()
        {
            return this.isSet ? "dynamicSetPrice" : "dynamicSetComponentPrice";
        }
    }
}
</script>
