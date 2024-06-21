<template>
    <div class="bkr-cc h-100">
        <article class="itemCategoryProduct" v-if="viewMode == 'vertical'">
            <bkAddToWishlist :variation-id="item.variation.id"></bkAddToWishlist>
            <div class="produkt_picture">
                <category-image-carousel :image-urls-data="item.images | itemImages('urlSecondPreview')"
                    :alt="item | itemName" :title="item | itemName" :item-url="item | itemURL(urlWithVariationId)"
                    :enable-carousel="carouselEnabled" ref="categoryImageCarousel">
                </category-image-carousel>
            </div>
            <div class="productInfoContainer">
                <div class="tagLine">
                    <span class="itemTag red"
                        v-if="(item.prices.rrp !== null && item.prices.rrp.price.value > item.prices.default.unitPrice.value)"
                        v-html="this.$options.filters.numberFormat(((1 - item.prices.default.unitPrice.value / item.prices.rrp.price.value) * -100), 0, '') + ' %'">
                    </span>
                    <div class="itemTag" v-if="storeSpecial && storeSpecial.id == 2">
                        <span v-html="'NEU'"></span>
                    </div>

                    <template v-for="tag in item.tags">
                        <span :class="'ct tag tagSize' + (parseInt(tag.id) - 129)"
                            v-if="[130, 131, 132, 133].includes(tag.id)" v-html="tag.names.name"></span>
                        <span class="tag tagFavorit" v-if="tag.id == 105">Bestseller</span>
                    </template>
                </div>
                <div class="productName">
                    <a :href="item | itemURL" v-html="texts.name1" class="thumb-title small"></a>
                    <p class="variationHint" v-if="!item.variation.isMain" v-html="variationHint"></p>
                </div>

                <div class="itemPrice">
                    <div class="prices">
                        <div v-if="item.prices.rrp !== null && item.prices.rrp.price.value > item.prices.default.unitPrice.value"
                            class="price-view-port">
                            <del class="crossprice" v-html="'statt ' + item.prices.rrp.unitPrice.formatted"></del>
                        </div>
                        <div class="price"
                            :class="{ redPrice: (item.prices.rrp !== null && item.prices.rrp.price.value > item.prices.default.unitPrice.value) }"
                            v-html="item.prices.default.unitPrice.formatted">
                        </div>
                    </div>

                    <div class="category-unit-price small"
                        v-if="!(item.unit.unitOfMeasurement === 'C62' && item.unit.content === 1)">
                        <span v-if="item.variation.mayShowUnitPrice" v-html="item.prices.default.basePrice"></span>
                    </div>
                </div><!--
             -->
            </div>
        </article>
        <article class="itemCategoryProduct horizontal" v-else-if="viewMode == 'horizontal'">
            <div class="produkt_picture">
                <a :href="item | itemURL">
                    <lazy-img ref="itemLazyImage" picture-class="img-fluid"
                        :image-url="item.images | itemImages('urlSecondPreview') | itemImage">
                    </lazy-img>
                </a>
            </div>
            <div class="productInfoContainer">
                <div class="productName">
                    <a :href="item | itemURL" v-html="texts.name1" class="thumb-title small"></a>
                </div>
                <div class="itemPrice">
                    <add-to-basket :variation-id="item.variation.id"
                        :is-salable="!!item.filter && item.filter.isSalable"
                        :has-children="!!item.item && item.item.salableVariationCount > 1"
                        :interval-quantity="item.variation.intervalOrderQuantity || 1"
                        :minimum-quantity="item.variation.minimumOrderQuantity"
                        :maximum-quantity="!!item.variation.maximumOrderQuantity && item.variation.maximumOrderQuantity > 0 ? item.variation.maximumOrderQuantity : null"
                        :order-properties="item.properties.filter(function (prop) { return prop.property.isOderProperty })"
                        :has-order-properties="item.hasOrderProperties"
                        :has-required-order-property="item.hasRequiredOrderProperty" :use-large-scale="false"
                        :show-quantity="false" :item-url="item | itemURL(urlWithVariationId)"
                        :has-price="item | hasItemDefaultPrice"
                        :has-graduated-price="itemGraduatedPriceisCheapestSorting || itemGraduatedPricesalableVariationCount"
                        :item-type="item.item.itemType">
                    </add-to-basket>

                    <div class="prices ml-auto">
                        <div v-if="item.prices.rrp !== null && item.prices.rrp.price.value > item.prices.default.unitPrice.value"
                            class="price-view-port">
                            <del class="crossprice" v-html="item.prices.rrp.unitPrice.formatted"></del>
                        </div>
                        <div class="price"
                            :class="{ redPrice: (item.prices.rrp !== null && item.prices.rrp.price.value > item.prices.default.unitPrice.value) }"
                            v-html="item.prices.default.unitPrice.formatted"></div>
                    </div>
                </div><!--
        -->
            </div>
        </article>
        <article class="itemCategoryProduct cartCrossSellingItem" v-if="viewMode == 'cart'">
            <div class="produkt_picture">
                <a :href="item | itemURL" :aria-label="'Empfehlung: Das passt dazu'" click-count>
                    <lazy-img ref="itemLazyImage" picture-class="img-fluid"
                        :image-url="item.images | itemImages('urlSecondPreview') | itemImage">
                    </lazy-img>
                </a>
            </div>
            <div class="productInfoContainer">
                <div class="productName">
                    <a :href="item | itemURL" v-html="texts.name1" class="thumb-title small"
                        :aria-label="'Empfehlung: Das passt dazu'" click-count></a>
                </div>

                <p v-if="texts.shortDescription" class="bulletPoints" v-html="texts.shortDescription"></p>

                <div class="itemPrice">
                    <div class="prices">
                        <div v-if="item.prices.rrp !== null && item.prices.rrp.price.value > item.prices.default.unitPrice.value"
                            class="price-view-port">
                            <del class="crossprice" v-html="item.prices.rrp.unitPrice.formatted"></del>
                        </div>
                        <div class="price"
                            :class="{ redPrice: (item.prices.rrp !== null && item.prices.rrp.price.value > item.prices.default.unitPrice.value) }"
                            v-html="item.prices.default.unitPrice.formatted"></div>
                    </div>
                </div><!--
-->
            </div>
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
        disableCarousel:
        {
            type: Boolean,
            default: false
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

        carouselEnabled()
        {
            let configVal = App.config.item.enableImageCarousel;
            if(this.disableCarousel)
                return false;
            return configVal;
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
            const hasRrpPrice = !!this.item.prices.rrp && this.item.prices.rrp !== null &&
                this.item.prices.rrp.unitPrice.value > this.item.prices.default.unitPrice.value;

            const hasBeforePrice = !!this.item.prices.specialOffer &&
                !!this.item.prices.default &&
                this.item.prices.default.unitPrice.value > this.item.prices.specialOffer.unitPrice.value;

            return hasRrpPrice || hasBeforePrice;
        },

        ourFurniture()
        {
            if(!this.item.tags)
            {
                return false;
            }

            return this.item.tags.some(tag => tag.id === 63);
        },

        /**
         * @return 1 - Pine
         * @return 2 - Oak
         * @return 0 - other
         */
        woodType()
        {
            // attributeValueIds
            // 806 = corpus white, 816 = corpus gray, all others: attr #3 -> wood, not alder
            // 815 = oak
            if (!this.item.attributes) {
                return false;
            }

            // Pine
            let pineAttrValSetIds = [806, 816, 802, 803, 141, 147, 126, 110, 109, 108, 107, 90];
            if(this.item.attributes.some(attribute => pineAttrValSetIds.includes(attribute.valueId)))
            {
                return 1; 
            }

            // Oak
            let oakAttrValIds = [801, 815];
            if (this.item.attributes.some(attribute => oakAttrValIds.includes(attribute.valueId))) {
                return 2;
            }

            // Rest
            return 0;
        },

        variationHint()
        {
            if (this.item.attributes.length == 0)
                return '';

            if (this.ourFurniture && this.item.attributes.length > 0)
            {
                let text = 'In verschiedenen Varianten<br />';
                switch(this.woodType)
                {
                    case 0: text += 'aus Bio-Erlenholz'; break;
                    case 1: text += 'aus Bio-Massivholz'; break;
                    case 2: text += 'aus Bio-Eichenholz'; break;
                }
                return text;
            }
            
            if (this.item.attributes.length == 1) {

                let attributeId = this.item.attributes[0].attributeId;
                // Attr-Name: Attr-Val
                if ([3, 7, 16, 18].includes(attributeId) && this.item.groupedAttributes[0]) {
                    return this.item.groupedAttributes[0].name + ': ' + this.item.groupedAttributes[0].value;
                }

                if (attributeId == 2) {
                    return 'In verschiedenen Gr&ouml;&szlig;en';
                }

            } 
            
            return 'In verschiedenen Varianten';
        },

        ...mapState({
            showNetPrices: state => state.basket.showNetPrices
        })
    }
}
</script>
