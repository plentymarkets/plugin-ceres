<template>
    <div class="bkr-cc h-100">
        <article class="itemCategoryProduct" v-if="viewMode == 'vertical'">
            <bkAddToWishlist :variation-id="item.variation.id"></bkAddToWishlist>
            <div class="produkt_picture">
                <category-image-carousel :image-urls-data="item.images | itemImages('urlSecondPreview')"
                                            :alt="item | itemName"
                                            :title="item | itemName"
                                            :item-url="item | itemURL(urlWithVariationId)"
                                            :enable-carousel="$ceres.config.item.enableImageCarousel"
                                            :disable-carousel-on-mobile="disableCarouselOnMobile"
                                            ref="categoryImageCarousel">
                    </category-image-carousel>
            </div>
            <div class="productInfoContainer">
            <div class="tagLine" >
                <span class="itemTag red"
                v-if="(item.prices.rrp && item.prices.rrp.price.value > item.prices.default.unitPrice.value)"
                v-html="this.$options.filters.numberFormat(((1 - item.prices.default.unitPrice.value / item.prices.rrp.price.value) * -100), 0, '') + ' %'">
                </span>
                <div class="itemTag" v-if="storeSpecial && storeSpecial.id == 2">
                <span v-html="'NEU'"></span>
                </div>

                <template v-if="item.tags && item.tags.filter(function (tag) { return (tag.id == 105) }).length > 0">
                    <span class="tag tagFavorit">Bestseller</span>
                </template>
            </div>
            <div class="productName">
                <a :href="item | itemURL" v-html="texts.name1" class="thumb-title small"></a>
            </div>
            <p class="variationHint" v-if="!item.variation.isMain">
                <!-- Attr-Name: Attr-Val -->
                <span class="variationImages" v-if="item.attributes.length == 1 && [3, 7, 16, 18].includes(item.attributes[0].attributeId)">
                <span v-for="attribute in item.groupedAttributes" v-html="attribute.name + ': ' + attribute.value"></span>
                </span>

                <!-- different sizes -->
                <span v-else-if="[2].includes(item.attributes[0].attributeId)" v-html="'In verschiedenen Größen'"></span>

                <!-- Corpus / Front -->
                <span
                v-else-if="item.attributes.length == 2 && item.attributes.filter(function (attr) { return (attr.attributeId == 3) })[0] && item.attributes.filter(function (attr) { return (attr.attributeId == 9) })[0]"
                v-for="attribute in item.attributes"
                :class="{ corpusFront: ([3, 9].includes(attribute.attributeId)) }">
                {{ attribute.value.names.name }}
                </span>

                <!-- default fallback -->
                <span v-else="v-else" v-html="'In verschiedenen Varianten'"></span>

            </p><div v-else="v-else"></div>

            <div class="itemPrice">
                <div class="prices">
                <div v-if="item.prices.rrp && item.prices.rrp.price.value > item.prices.default.unitPrice.value" class="price-view-port">
                    <del class="crossprice"
                    v-html="'statt ' + item.prices.rrp.unitPrice.formatted"></del>
                </div>
                <div class="price"
                    :class="{ redPrice: (item.prices.rrp && item.prices.rrp.price.value > item.prices.default.unitPrice.value) }"
                    v-html="item.prices.default.unitPrice.formatted">
                </div>
                </div>

                <div class="category-unit-price small" v-if="!(item.unit.unitOfMeasurement === 'C62' && item.unit.content === 1)">
                <span v-if="item.variation.mayShowUnitPrice" v-html="item.prices.default.basePrice"></span>
            </div>
            </div><!--
             --></div>
        </article>
        <article class="itemCategoryProduct horizontal" v-else-if="viewMode == 'horizontal'">
            <div class="produkt_picture">
            <a :href="item | itemURL">
                <lazy-img
                    ref="itemLazyImage"
                    picture-class="img-fluid"
                    :image-url="item.images | itemImages('urlSecondPreview') | itemImage" >
                </lazy-img>
            </a>
            </div>
            <div class="productInfoContainer">
            <div class="productName">
                <a :href="item | itemURL" v-html="texts.name1" class="thumb-title small"></a>
            </div>
            <div class="itemPrice">
                <div class="prices">
                <div v-if="item.prices.rrp && item.prices.rrp.price.value > item.prices.default.unitPrice.value" class="price-view-port">
                    <del class="crossprice"
                    v-html="item.prices.rrp.unitPrice.formatted"></del>
                </div>
                <div
                    class="price"
                    :class="{ redPrice: (item.prices.rrp && item.prices.rrp.price.value > item.prices.default.unitPrice.value) }"
                    v-html="item.prices.default.unitPrice.formatted"
                    ></div>
                </div>
            </div><!--
        --></div>
        </article>
        <article class="itemCategoryProduct cartCrossSellingItem" v-if="viewMode == 'cart'">
        <div class="produkt_picture">
          <a :href="item | itemURL" :aria-label="'Empfehlung: Das passt dazu'" click-count>
              <lazy-img
                ref="itemLazyImage"
                picture-class="img-fluid"
                :image-url="item.images | itemImages('urlSecondPreview') | itemImage" >
              </lazy-img>
          </a>
        </div>
        <div class="productInfoContainer">
          <div class="productName">
            <a :href="item | itemURL" v-html="texts.name1" class="thumb-title small" :aria-label="'Empfehlung: Das passt dazu'" click-count></a>
          </div>

          <p v-if="texts.shortDescription" class="bulletPoints" v-html="texts.shortDescription"></p>

          <div class="itemPrice">
            <div class="prices">
              <div v-if="item.prices.rrp && item.prices.rrp.price.value > item.prices.default.unitPrice.value" class="price-view-port">
                <del class="crossprice"
                v-html="item.prices.rrp.unitPrice.formatted"></del>
              </div>
              <div
                class="price"
                :class="{ redPrice: (item.prices.rrp && item.prices.rrp.price.value > item.prices.default.unitPrice.value) }"
                v-html="item.prices.default.unitPrice.formatted"
                ></div>
            </div>
          </div><!--
--></div>
      </article>
    </div>
</template>

<script>
import { mapState } from "vuex";
import CategoryImageCarousel from "./CategoryImageCarousel.vue";
import ItemStoreSpecial from "./ItemStoreSpecial.vue";
import {getSlotData} from "../../helper/getSlotData";

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
        },
        viewMode:
        {
            type: String,
            default: 'vertical'
        }
    },

    jsonDataFields: [
        "itemDataRef"
    ],

    computed:
    {
        item()
        {
            return this.itemData || this.itemSlotData || this.itemDataRef;
        },

        itemSlotData: getSlotData('item-data'),

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

        basePrice()
        {
            return this.item.prices.default.basePrice;
        },

        mode()
        {
            switch(this.viewMode)
            {
                case 'vertical': return 1;
                case 'horizontal': return 2;
                case 'cart': return 3;
                default: return 1;
            }
        },

        itemPriceGraduated()
        {
           let unitPrice;
           if (App.config.item.enableGraduatedPrices) {
             unitPrice = this.item.prices.graduatedPrices.length > 0
                 ? this.item.prices.graduatedPrices[0].unitPrice
                 : this.item.prices.default.unitPrice;
           } else {
             unitPrice = this.item.prices.default.unitPrice;
           }

            return this.$options.filters.specialOffer(unitPrice.formatted, this.item.prices, "unitPrice", "formatted" );
        },

        itemGraduatedPriceisCheapestSorting()
        {
            return !!this.item.item && this.item.item.salableVariationCount > 1 && !!this.$ceres.isCheapestSorting;
        },

        itemGraduatedPricesalableVariationCount()
        {
            return !!this.item.item && this.item.item.salableVariationCount == 1 && this.item.prices.graduatedPrices.length > 1 && App.config.item.enableGraduatedPrices;
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

        hasCrossPrice() {
            const hasRrpPrice = !!this.item.prices.rrp &&
                this.item.prices.rrp.unitPrice.value > this.item.prices.default.unitPrice.value;

            const hasBeforePrice = !!this.item.prices.specialOffer &&
                !!this.item.prices.default &&
                this.item.prices.default.unitPrice.value > this.item.prices.specialOffer.unitPrice.value;

            return hasRrpPrice || hasBeforePrice;
        },

        ...mapState({
            showNetPrices: state => state.basket.showNetPrices
        })
    }
}
</script>
