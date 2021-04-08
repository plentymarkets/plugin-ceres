<template>
    <div>
        <slot :getDataField="getDataField" :getFilteredDataField="getFilteredDataField">
        </slot>
    </div>
</template>

<script>
import { get } from "../../helper/get";
import { isNullOrUndefined } from "../../helper/utils";

export default {

    name: "single-item",

    props: {
        pleaseSelectOptionVariationId: {
            type: Number,
            default: 0
        },
        initPleaseSelectOption: {
            type: Boolean,
            default: false
        },
        showNetPrices: {
            type: Boolean,
            default: false
        },
        isWishListEnabled: {
            type: Boolean,
            default: false
        },
        itemId: {
            type: Number,
            required: true
        },
        afterKey: Object,
        itemData: Object,
        attributesData: Array,
        variations: Array
    },

    provide()
    {
        return {
            itemId: this.$props.itemId
        }
    },

    computed:
    {
        itemConfig()
        {
            return App.config.item.itemData;
        },

        isDescriptionTabActive()
        {
            return (App.config.item.itemData.includes("item.description") || App.config.item.itemData.includes("all"))
                && !!this.currentVariation.texts.description.length;
        },

        isRecommendedPriceActive()
        {
            return App.config.item.itemData.includes("item.recommendedPrice") || App.config.item.itemData.includes("all");
        },

        isShortDescriptionActive()
        {
            return App.config.item.itemData.includes("item.shortDescription") || App.config.item.itemData.includes("all");
        },

        hasShippingCostsCategoryId()
        {
            return App.config.global.shippingCostsCategoryId > 0;
        },

        isTechnicalDataTabActive()
        {
            return (App.config.item.itemData.includes("item.technical_data") || App.config.item.itemData.includes("all"))
                && !!this.currentVariation.texts.technicalData.length;
        },

        variationGroupedProperties()
        {
            return this.$store.getters[`${this.itemId}/variationGroupedProperties`];
        },

        variationMissingProperties()
        {
            return this.$store.getters[`${this.itemId}/variationMissingProperties`];
        },

        currentVariation() {
            return get(this.$store.state, `items[${this.itemId}].variation.documents[0].data`);
        },

        isVariationSelected() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.isVariationSelected`);
        },

        attributes() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.attributes`);
        },

        units() {
            return get(this.$store.state, `items[${this.itemId}].variationSelect.units`);
        }
    },

    created()
    {
        this.$store.dispatch("initVariation", this.itemData);
        this.$store.commit(`${this.itemId}/setPleaseSelectVariationId`, this.pleaseSelectOptionVariationId);
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.$store.dispatch("addLastSeenItem", this.currentVariation.variation.id);
            this.$store.dispatch(`${this.itemId}/variationSelect/setVariationSelect`, {
                itemId:             this.itemId,
                attributes:         this.attributesData,
                variations:         this.variations,
                initialVariationId: this.currentVariation.variation.id,
                isPleaseSelectOption: this.initPleaseSelectOption,
                afterKey:           this.afterKey
            });
        })
    },

    methods:
    {
        getDataField(field)
        {
            return get(this.currentVariation, field);
        },

        getFilteredDataField(field, filter)
        {
            if (!isNullOrUndefined(this.$options.filters[filter]))
            {
                return this.$options.filters[filter](this.getDataField(field));
            }

            return this.getDataField(field);
        }
    }
}
</script>
