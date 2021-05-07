<template>
    <div v-if="graduatedPrices[0]">
        <b>{{ $translate("Ceres::Template.singleItemGraduatedPrices") }}:</b>
        <table class="graduated-prices-table text-muted">
            <tbody>
                <template v-for="(price, index) in graduatedPrices">
                    <tr>
                        <td :class="paddingClasses" :style="paddingInlineStyles">{{ $translate("Ceres::Template.singleItemMinimumQuantity") }} {{ price.minimumOrderQuantity }}</td>
                        <td :class="paddingClasses" :style="paddingInlineStyles" class="graduated-price">
                            {{ price.unitPrice.formatted }}
                            <transition name="fade">
                                <i class="fa fa-lg fa-check-circle-o text-appearance" v-if="index === activeGraduationIndex" aria-hidden="true"></i>
                            </transition>
                        </td>
                        <td v-if="showBasePrice" :class="paddingClasses" :style="paddingInlineStyles" class="graduated-base-price pl-3 d-none d-xl-block">{{ $translate("Ceres::Template.singleItemGraduatedBasePrice", { "price": price.basePrice }) }}</td>
                    </tr>
                    <tr v-if="showBasePrice" class="graduated-base-price d-xl-none">
                        <td :class="paddingClasses" :style="paddingInlineStyles"></td>
                        <td :class="paddingClasses" :style="paddingInlineStyles">{{ $translate("Ceres::Template.singleItemGraduatedBasePrice", { "price": price.basePrice }) }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <br>
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

       showBasePrice()
       {
            const currentVariation = this.$store.getters[`${this.itemId}/currentItemVariation`];
            const mayShowUnitPrice = currentVariation.variation.mayShowUnitPrice;
            const isSinglePiece = currentVariation.unit && currentVariation.unit.content === 1 && currentVariation.unit.unitOfMeasurement === "C62";

            return mayShowUnitPrice && !isSinglePiece;
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
