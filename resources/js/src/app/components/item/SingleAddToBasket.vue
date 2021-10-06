<template>
    <add-to-basket v-if="currentVariation"
        :variation-id="currentVariation.variation.id"
        :is-salable="!!currentVariation.filter && currentVariation.filter.isSalable"
        :has-children="!!currentVariation.filter && currentVariation.filter.hasActiveChildren"
        :interval-quantity="currentVariation.variation.intervalOrderQuantity || 1"
        :minimum-quantity="currentVariation.variation.minimumOrderQuantity"
        :maximum-quantity="!!currentVariation.variation.maximumOrderQuantity && currentVariation.variation.maximumOrderQuantity > 0 ? currentVariation.variation.maximumOrderQuantity : null"
        :order-properties="currentVariation.properties.filter(function(prop) { return prop.property.isOderProperty })"
        :has-order-properties="currentVariation.hasOrderProperties"
        :use-large-scale="false"
        :show-quantity="true"
        :item-url="currentVariation | itemURL"
        :has-price="currentVariation | hasItemDefaultPrice"
        :button-size="buttonSize"
        :padding-classes="paddingClasses"
        :padding-inline-styles="paddingStyles"
        data-testing="single-add-to-basket-button">
    </add-to-basket>
</template>

<script>
import AddToBasket from "../basket/AddToBasket.vue";
export default {
    name: "single-add-to-basket",

    components: {
        AddToBasket
    },

    props: {
        buttonSize: String,
        paddingClasses: String,
        paddingStyles: String
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed: {
        currentVariation() {
            return this.$store.getters[`${this.itemId}/currentItemVariation`]
        }
    }
}
</script>
