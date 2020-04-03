<template>
    <div v-if="graduatedPrices[0]">
        <b>{{ $translate("Ceres::Template.singleItemGraduatedPrices") }}:</b>
        <table class="graduated-prices-table text-muted">
            <tr v-for="(price, index) in graduatedPrices">
                <td :class="paddingClasses" :style="paddingInlineStyles">{{ $translate("Ceres::Template.singleItemMinimumQuantity") }} {{ price.minimumOrderQuantity }}</td>
                <td :class="paddingClasses" :style="paddingInlineStyles">
                    {{ price.unitPrice.formatted }}
                    <transition name="fade">
                        <i class="fa fa-lg fa-check-circle-o ml-1 text-appearance" v-if="index === activeGraduationIndex" aria-hidden="true"></i>
                    </transition>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {

    name: "graduated-prices",

    props: {
        paddingClasses: {
            type: String
        },
        paddingInlineStyles: {
            type: String
        }
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        graduatedPrices()
        {
            const currentVariation = this.$store.getters[`${this.itemId}/currentItemVariation`];

            let prices = currentVariation && currentVariation.prices.graduatedPrices;
            const minQuantity = currentVariation && currentVariation.variation.minimumOrderQuantity;

            prices = prices.filter(price => price.minimumOrderQuantity > minQuantity);

            return [...prices].sort((priceA, priceB) =>
            {
                return priceA.minimumOrderQuantity - priceB.minimumOrderQuantity;
            });
        },

        activeGraduationIndex()
        {
            const prices = this.graduatedPrices.filter(price => this.variationOrderQuantity >= price.minimumOrderQuantity);

            if (!prices.length)
            {
                return -1;
            }

            const price = prices.reduce((prev, current) => (prev.minimumOrderQuantity > current.minimumOrderQuantity) ? prev : current);

            return this.graduatedPrices.indexOf(price);
        },

        variationOrderQuantity()
        {
            return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationOrderQuantity
        }
    }
}
</script>
