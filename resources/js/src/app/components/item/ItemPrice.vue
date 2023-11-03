<template>
    <div class="variationPrices bkr-cc" :class="{ 'has-crossprice': hasCrossPrice }">
            <span
              v-if="savePercent > 0"
              class="percent">
              Sie sparen {{ savePercent | numberFormat(2, ',') }}%
            </span>

            <span id="itemmrp" class="text-muted" v-if="(showCrossPrice && hasCrossPrice)" :class="{ 'is-special-offer': hasSpecialOffer }">
                {{ $translate("biokinderDesign::Template.itemInstedOf") }}
                <del class="small text-appearance">
                    {{ currentVariation.prices.rrp.unitPrice.formatted | itemCrossPrice }}
                </del>
            </span>

            <span class="singleprice" :class="{ 'colorred': hasCrossPrice }">
                <span>
                    <template v-if="showDynamicPrice">
                        {{ $translate("Ceres::Template.dynamicVariationPrice",
                            {
                                price: $options.filters.currency(variationTotalPrice, currentVariation.prices.default.currency)
                            }
                        ) }}
                    </template>

                    <template v-else>
                        {{ variationTotalPrice | currency(currentVariation.prices.default.currency) }}
                    </template>
                </span>
            </span>

            <div class="clearer"></div>

            <div class="base-price text-muted my-1"
                v-if="currentVariation.unit && currentVariation.variation.mayShowUnitPrice"
                :class="{ 'is-single-piece': currentVariation.unit && currentVariation.unit.content === 1 && currentVariation.unit.unitOfMeasurement === 'C62' }">

                    {{ $translate("Ceres::Template.singleItemContent") }}:
                    <span>{{ currentVariation.unit.content | numberFormat }} </span>
                    <span>{{ currentVariation.unit.names.name }}</span>
                    &nbsp;|&nbsp;
                    <span class="base-price-value">
                        {{ variationGraduatedPrice.basePrice | specialOffer(currentVariation.prices, "basePrice") }}
                    </span>

            </div>

            <div class="shippinginfo">
                <span @click="toggleDetails">
                    {{ $translate("Ceres::Template.singleItemInclVAT") }}
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </span>
                <transition name="slide">
                    <div v-if="showDetails" class="details">
                        {{ $translate("Ceres::Template.singleItemExclusive") }}  <a data-toggle="modal" href="#shippingscosts" :title="$translate('Ceres::Template.singleItemShippingCosts')" class="openPorto">CO<sub>2</sub> neutraler Versand</a>
                        <slot name="additional-content-after-vat"></slot>
                        <span v-if="(showCrossPrice && hasCrossPrice)">
                            <br />Zuletzt niedrigster Preis {{ currentVariation.prices.default.lowestPrice.formatted }}
                        </span>
                    </div>
                </transition>
            </div>
        </div>
</template>

<script>
import { hasVat } from "../../helper/OrderPropertyHelper";
export default {
    name: "item-price",

    props:
    {
        showCrossPrice:
        {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            showDetails: false
        };
    },
    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        currentVariation() {
            console.log("Var loaded");
            return this.$store.getters[`${this.itemId}/currentItemVariation`]
        },

        hasCrossPrice() {
            const hasRrpPrice = !!this.currentVariation.prices.rrp && this.currentVariation.prices.rrp !== null &&
                this.currentVariation.prices.rrp.unitPrice.value > this.currentVariation.prices.default.unitPrice.value;

            return hasRrpPrice;
        },

        savePercent()
        {
            if(this.currentVariation.prices.rrp === null || this.currentVariation.prices.default === null)
                return 0;
            
            if(this.currentVariation.prices.default.price.value >= this.currentVariation.prices.rrp.price.value)
                return 0;
        
            return ((1 - this.currentVariation.prices.default.price.value / this.currentVariation.prices.rrp.price.value) * 100);
        },

        hasSpecialOffer() {
            return !!this.currentVariation.prices.specialOffer;
        },

        variationGraduatedPrice() {
            return this.$store.getters[`${this.itemId}/variationGraduatedPrice`];
        },

        variationTotalPrice() {
            return this.$store.getters[`${this.itemId}/variationTotalPrice`];
        },

        showDynamicPrice() {
            const state = this.$store.state.items[this.itemId];
            return App.config.item.showPleaseSelect && App.isCheapestSorting
                && (state.variationSelect && !state.variationSelect.isVariationSelected)
                && (state.pleaseSelectVariationId === this.currentVariation.variation.id
                    || state.pleaseSelectVariationId === 0);
        },

        propertiesWithAdditionalCostsVisible() {
            return this.currentVariation.properties.filter(entry => {
                const property = entry.property;
                return property && property.isShownAsAdditionalCosts && property.isShownOnItemPage
                    && ((!property.isOderProperty && !App.useVariationOrderProperties)
                    || this.isVariationOrderPropertyRequiredPreselected(property))


            });
        }
    },
    methods: {
        isVariationOrderPropertyRequiredPreselected(property) {
            return property.isRequired 
                    && property.isPreSelected 
                    && property.isOderProperty 
                    && App.useVariationOrderProperties
        },

        hasTax(property)
        {
            return hasVat(property);
        },

        toggleDetails() {
            this.showDetails = !this.showDetails;
        }
    }
}
</script>