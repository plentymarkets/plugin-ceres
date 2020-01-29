<template>
    <article class="cmp cmp-product-thumb">
        <div :class="paddingClasses" :style="paddingInlineStyles">

            <add-to-basket
                    :variation-id="item.variation.id"
                    :is-salable="!!item.filter && item.filter.isSalable"
                    :has-children="!!item.filter && item.filter.hasActiveChildren"
                    :interval-quantity="item.variation.intervalOrderQuantity || 1"
                    :minimum-quantity="item.variation.minimumOrderQuantity"
                    :maximum-quantity="!!item.variation.maximumOrderQuantity && item.variation.maximumOrderQuantity > 0 ? item.variation.maximumOrderQuantity : null"
                    :order-properties="item.properties.filter(function(prop) { return prop.property.isOderProperty })"
                    :has-order-properties="item.hasOrderProperties"
                    :use-large-scale="true"
                    :show-quantity="false"
                    :item-url="item | itemURL(urlWithVariationId)"
                    :has-price="item | hasItemDefaultPrice">
            </add-to-basket>

            <div class="thumb-image">
                <div class="prop-1-1">
                    <slot name="item-image">
                        <category-image-carousel :image-urls-data="item.images | itemImages(imageUrlAccessor)"
                                                :alt-text="item | itemName"
                                                :title-text="item | itemName"
                                                :item-url="item | itemURL(urlWithVariationId)"
                                                :enable-carousel="$ceres.config.item.enableImageCarousel"
                                                :disable-carousel-on-mobile="disableCarouselOnMobile"
                                                ref="categoryImageCarousel">
                        </category-image-carousel>
                    </slot>
                </div>
            </div>

            <!-- STORE SPECIALS -->
            <slot name="store-special">
                <item-store-special v-if="storeSpecial || item.variation.bundleType === 'bundle'"
                                    :store-special="storeSpecial"
                                    :recommended-retail-price="item.prices.rrp"
                                    :variation-retail-price="item.prices.default"
                                    :special-offer-price="item.prices.specialOffer"
                                    :decimal-count="decimalCount"
                                    :bundle-type="item.variation.bundleType"></item-store-special>
            </slot>
            <!-- ./STORE SPECIALS -->

            <!-- ITEM DETAILS -->
            <slot name="item-details">
                <div class="thumb-content">
                    <a :href="item | itemURL(urlWithVariationId)" class="thumb-title small stretched-link">
                        {{ item | itemName }}<!--
                    --><span v-for="attribute in item.groupedAttributes">{{ "Ceres::Template.itemGroupedAttribute" | translate(attribute) }}</span>
                    </a>
                    <div class="thumb-meta mt-2">
                        <slot name="before-prices"></slot>

                        <div class="prices">
                            <div v-if="item.prices.rrp && item.prices.rrp.price.value > 0 && item.prices.rrp.price.value > item.prices.default.unitPrice.value" class="price-view-port">
                                <del class="crossprice" v-if="item.prices.specialOffer">
                                    {{ item.prices.default.unitPrice.formatted | itemCrossPrice(true) }}
                                </del>
                                <del class="crossprice" v-else>
                                    {{ item.prices.rrp.unitPrice.formatted | itemCrossPrice }}
                                </del>
                            </div>

                            <div class="price">
                                {{ item.prices.default.unitPrice.formatted | specialOffer(item.prices, "unitPrice", "formatted") }} *
                            </div>
                        </div>
                    </div>

                    <slot name="after-prices"></slot>

                    <div class="category-unit-price small" v-if="!(item.unit.unitOfMeasurement === 'C62' && item.unit.content === 1)">
                        <span>{{ item.unit.content }}</span>
                        <span>&nbsp;{{ item.unit.names.name }}</span>
                        <span v-if="item.variation.mayShowUnitPrice">&nbsp;| {{ item.prices.default.basePrice }}</span>
                    </div>

                    <add-to-basket
                            :variation-id="item.variation.id"
                            :is-salable="!!item.filter && item.filter.isSalable"
                            :has-children="!!item.filter && item.filter.hasActiveChildren"
                            :interval-quantity="item.variation.intervalOrderQuantity || 1"
                            :minimum-quantity="item.variation.minimumOrderQuantity"
                            :maximum-quantity="!!item.variation.maximumOrderQuantity && item.variation.maximumOrderQuantity > 0 ? item.variation.maximumOrderQuantity : null"
                            :order-properties="item.properties.filter(function(prop) { return prop.property.isOderProperty })"
                            :has-order-properties="item.hasOrderProperties"
                            :use-large-scale="false"
                            :show-quantity="false"
                            :item-url="item | itemURL(urlWithVariationId)"
                            :has-price="item | hasItemDefaultPrice">
                    </add-to-basket>

                    <span class="vat small text-muted">
                    * <span v-if="showNetPrices">{{ $translate("Ceres::Template.itemExclVAT") }}</span>
                    <span v-else>{{ $translate("Ceres::Template.itemInclVAT") }}</span>
                    {{ $translate("Ceres::Template.itemExclusive") }}
                    <a v-if="$ceres.config.global.hasShippingCostsCategoryId > 0" data-toggle="modal" href="#shippingscosts" class="text-appearance" :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
                    <a v-else :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
                </span>
                </div>
            </slot>
            <!-- ./ITEM DETAILS  -->
        </div>
    </article>
</template>

<script>
import { mapState } from "vuex";
import CategoryImageCarousel from "./CategoryImageCarousel.vue";
import ItemStoreSpecial from "./ItemStoreSpecial.vue";

export default {
    components: {
        CategoryImageCarousel,
        ItemStoreSpecial
    },

    props: {
        decimalCount:
        {
            type: Number,
            default: 0
        },
        imageUrlAccessor:
        {
            type: String,
            default: "urlMiddle"
        },
        itemData:
        {
            type: Object
        },
        disableCarouselOnMobile:
        {
            type: Boolean
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        },
        urlWithVariationId:
        {
            type: Boolean,
            default: true
        }
    },

    jsonDataFields: [
        "itemDataRef"
    ],

    computed:
    {
        item()
        {
            return this.itemData || this.itemDataRef;
        },

        /**
         * returns itemData.item.storeSpecial
         */
        storeSpecial()
        {
            return this.item.item.storeSpecial;
        },

        /**
         * returns itemData.texts
         */
        texts()
        {
            return this.item.texts;
        },

        ...mapState({
            showNetPrices: state => state.basket.showNetPrices
        })
    }
}
</script>
