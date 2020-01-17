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
import { mapState } from "vuex";

export default {
    props: {
        paddingClasses: {
            type: String
        },
        paddingInlineStyles: {
            type: String
        }
    },
    computed:
    {
        graduatedPrices()
        {
            let prices = this.$store.state.item.variation.documents[0].data.prices.graduatedPrices;
            const minQuantity = this.$store.state.item.variation.documents[0].data.variation.minimumOrderQuantity;

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

        ...mapState({
            variationOrderQuantity: state => state.item.variationOrderQuantity
        })
    }
}
</script>
