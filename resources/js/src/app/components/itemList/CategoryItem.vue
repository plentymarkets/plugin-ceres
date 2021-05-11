<template>
    <article class="cmp cmp-product-thumb" :data-testing="item.variation.id">
        <div :class="paddingClasses" :style="paddingInlineStyles">

            <add-to-basket
                    data-testing="item-add-to-basket"
                    :variation-id="item.variation.id"
                    :is-salable="!!item.filter && item.filter.isSalable"
                    :has-children="!!item.item && item.item.salableVariationCount > 1"
                    :interval-quantity="item.variation.intervalOrderQuantity || 1"
                    :minimum-quantity="item.variation.minimumOrderQuantity"
                    :maximum-quantity="!!item.variation.maximumOrderQuantity && item.variation.maximumOrderQuantity > 0 ? item.variation.maximumOrderQuantity : null"
                    :order-properties="item.properties.filter(function(prop) { return prop.property.isOderProperty })"
                    :has-order-properties="item.hasOrderProperties"
                    :use-large-scale="true"
                    :show-quantity="false"
                    :item-url="item | itemURL(urlWithVariationId)"
                    :has-price="item | hasItemDefaultPrice"
                    :item-type="item.item.itemType">
            </add-to-basket>

            <div class="thumb-image">
                <div class="prop-1-1">
                    <slot name="item-image">
                        <category-image-carousel :image-urls-data="item.images | itemImages(imageUrlAccessor)"
                                                :alt="item | itemName"
                                                :title="item | itemName"
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
                <item-store-special v-if="storeSpecial || item.variation.bundleType === 'bundle' || item.item.itemType === 'set'"
                                    :store-special="storeSpecial"
                                    :recommended-retail-price="item.prices.rrp"
                                    :variation-retail-price="item.prices.default"
                                    :special-offer-price="item.prices.specialOffer"
                                    :decimal-count="decimalCount"
                                    :bundle-type="item.variation.bundleType"
                                    :item-type="item.item.itemType">
                </item-store-special>
            </slot>
            <!-- ./STORE SPECIALS -->

            <!-- ITEM DETAILS -->
            <slot name="item-details">
                <div class="thumb-content">
                    <a :href="item | itemURL(urlWithVariationId)" class="thumb-title small" :class="{ 'stretched-link': $ceres.config.global.shippingCostsCategoryId == 0 }">
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
                                <template v-if="item.item.itemType === 'set'">
                                    {{ $translate("Ceres::Template.itemSetPrice", { price: itemSetPrice }) }} *
                                </template>
                                 <template v-else-if="!!item.item && item.item.salableVariationCount > 1 && $ceres.isCheapestSorting" >
                                     {{ $translate("Ceres::Template.categoryItemFromPrice", { price: itemPrice }) }} *
                                </template>
                                <template v-else>
                                    {{ item.prices.default.unitPrice.formatted | specialOffer(item.prices, "unitPrice", "formatted") }} *
                                </template>
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
                            :has-children="!!item.item && item.item.salableVariationCount > 1"
                            :interval-quantity="item.variation.intervalOrderQuantity || 1"
                            :minimum-quantity="item.variation.minimumOrderQuantity"
                            :maximum-quantity="!!item.variation.maximumOrderQuantity && item.variation.maximumOrderQuantity > 0 ? item.variation.maximumOrderQuantity : null"
                            :order-properties="item.properties.filter(function(prop) { return prop.property.isOderProperty })"
                            :has-order-properties="item.hasOrderProperties"
                            :use-large-scale="false"
                            :show-quantity="false"
                            :item-url="item | itemURL(urlWithVariationId)"
                            :has-price="item | hasItemDefaultPrice"
                            :item-type="item.item.itemType">
                    </add-to-basket>

                    <div class="vat small text-muted">
                        * <span v-if="showNetPrices">{{ $translate("Ceres::Template.itemExclVAT") }}</span>
                        <span v-else>{{ $translate("Ceres::Template.itemInclVAT") }}</span>
                        {{ $translate("Ceres::Template.itemExclusive") }}
                        <a v-if="$ceres.config.global.shippingCostsCategoryId > 0" data-toggle="modal" href="#shippingscosts" class="text-appearance" :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
                        <a v-else :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
                    </div>
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
        forceUrlWithVariationId:
        {
            type: Boolean,
            default: false
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

        itemPrice()
        {
            return this.$options.filters.specialOffer(this.item.prices.default.unitPrice.formatted, this.item.prices, "unitPrice", "formatted" );
        },

        itemSetPrice()
        {
            return this.$options.filters.currency(
                this.item.prices.default.price.value,
                this.item.prices.default.currency
            );
        },

        urlWithVariationId()
        {
            return !this.$ceres.config.item.showPleaseSelect || this.$ceres.initialPleaseSelect == 0 || this.forceUrlWithVariationId;
        },

        ...mapState({
            showNetPrices: state => state.basket.showNetPrices
        })
    }
}
</script>
