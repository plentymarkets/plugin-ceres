<template>
    <div class="cmp-totals">
        <div class="h3">{{ $translate("Ceres::Template.basketSum") }}</div>
        <div class="component-loading with-icon refreshing" :class="{ 'is-loading': isBasketLoading }">
            <dl>
                <slot name="before-item-sum"></slot>

                <!-- Basket value (net) -->
                <template v-if="visibleFields.includes('basketValueNet')">
                    <dt :class="{ 'font-weight-bold': showNetPrices }">
                        {{ $translate("Ceres::Template.basketValue") }} {{ $translate("Ceres::Template.basketNet") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': showNetPrices }" data-testing="item-sum-net">
                        {{ calculateBaseValue(basket.itemSumNet, basket.basketRebate) | currency }}
                    </dd>
                </template>
                <!-- Basket value (net) -->

                <!-- Basket value (gross) -->
                <template v-if="visibleFields.includes('basketValueGross')">
                    <dt :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ $translate("Ceres::Template.basketValue") }} {{ $translate("Ceres::Template.basketGross") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': !showNetPrices }" data-testing="item-sum">
                        {{ calculateBaseValue(basket.itemSum, basket.basketRebate)| currency  }}
                    </dd>
                </template>
                <!-- Basket value (gross) -->

                <!-- Rebate -->
                <template v-if="visibleFields.includes('rebate') && basket.basketRebate">
                    <dt class="rebate-hint">
                        {{ $translate("Ceres::Template.basketRebate") }}
                    </dt><!--
                --><dd class="rebate-hint" v-if="!showNetPrices">
                        {{ $translate("Ceres::Template.basketRebateSign") }}{{calculateBaseValue(basket.itemSum, basket.basketRebate) - basket.itemSum | currency }}
                    </dd><!--
                --><dd class="rebate-hint" v-else>
                        {{ $translate("Ceres::Template.basketRebateSign") }}{{ calculateBaseValue(basket.itemSumNet, basket.basketRebate) - basket.itemSumNet | currency  }}
                    </dd>
                    <dt :class="{ 'font-weight-bold': showNetPrices }">
                        {{ $translate("Ceres::Template.basketSubTotal") }} {{ $translate("Ceres::Template.basketNet") }}
                    </dt><!--
                --><dd :class="{ 'font-weight-bold': showNetPrices }">
                        {{ basket.itemSumNet | currency }}
                    </dd>
                    <dt :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ $translate("Ceres::Template.basketSubTotal") }} {{ $translate("Ceres::Template.basketGross") }}
                    </dt><!--
                --><dd :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ basket.itemSum | currency }}
                    </dd>
                </template>
                <!-- Rebate -->


                <slot name="after-item-sum"></slot>

                <slot name="before-shipping-costs"></slot>

                <!-- Shipping (net) -->
                <template v-if="visibleFields.includes('shippingCostsNet')">
                    <dt :class="{ 'font-weight-bold': showNetPrices }">
                        {{ $translate("Ceres::Template.basketShippingCosts") }} {{ $translate("Ceres::Template.basketNet") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': showNetPrices }" data-testing="shipping-amount-net">
                        {{ basket.shippingAmountNet | currency }}
                    </dd>
                </template>
                <!-- Shipping (net) -->

                <!-- Shipping (gross) -->
                <template v-if="visibleFields.includes('shippingCostsGross')">
                    <dt :class="{ 'font-weight-bold': !showNetPrices }">
                        {{ $translate("Ceres::Template.basketShippingCosts") }} {{ $translate("Ceres::Template.basketGross") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': !showNetPrices }" data-testing="shipping-amount">
                        {{ basket.shippingAmount | currency }}
                    </dd>
                </template>
                <!-- Shipping (gross) -->

                <slot name="after-shipping-costs"></slot>

                <!-- Coupon -->
                <template v-if="visibleFields.includes('promotionCoupon') && basket.couponCode && basket.couponCampaignType === 'promotion'">
                    <dt class="font-weight-bold">
                        {{ $translate("Ceres::Template.basketCoupon") }}
                    </dt><!--
                --><dd class="font-weight-bold" data-testing="promotion-coupon">
                        {{ basket.couponDiscount | currency }}
                    </dd>
                </template>
                <!-- Coupon -->

                <hr>
                <slot name="before-total-sum"></slot>

                <!-- Total sum (net) -->
                <template v-if="visibleFields.includes('totalSumNet')">
                    <dt :class="{ 'font-weight-bold': showNetPrices }">
                        {{ $translate("Ceres::Template.basketTotalSum") }} {{ $translate("Ceres::Template.basketNet") }}
                    </dt><!--
                    --><dd :class="{ 'font-weight-bold': showNetPrices }" data-testing="basket-amount-net">
                        {{ basket.basketAmountNet | currency }}
                    </dd>
                </template>
                <!-- Total sum (net) -->

                <slot name="before-vat"></slot>

                <!-- VAT -->
                <div v-if="visibleFields.includes('vats')" class="vatTotals" v-for="totalVat in basket.totalVats">
                    <dt>
                        {{ $translate("Ceres::Template.basketVAT") }} {{ totalVat.vatValue }}%
                    </dt><!--
                    --><dd data-testing="vat-amount">
                        {{ totalVat.vatAmount | currency }}
                    </dd>
                </div>
                <!-- VAT -->

                <slot name="after-vat"></slot>

                <div class="totalSum">
                    <hr>
                    <!-- AdditionalCosts -->
                    <template v-if="visibleFields.includes('additionalCosts') && propertiesWithAdditionalCosts.length">
                        <template v-for="property in propertiesWithAdditionalCosts">
                            <dt class="font-weight-bold" :key="'property-name-' + property.propertyId">
                                {{ property.name }}
                            </dt><!--
                            --><dd class="font-weight-bold" :key="'property-price-' + property.propertyId">
                                {{ property.price | currency }}
                            </dd>
                        </template>
                    </template>
                    <!-- AdditionalCosts -->

                    <!-- Total sum (gross) -->
                    <template v-if="visibleFields.includes('totalSumGross')">
                        <dt :class="{ 'font-weight-bold': !showNetPrices }">
                            {{ $translate("Ceres::Template.basketTotalSum") }} {{ $translate("Ceres::Template.basketGross") }}
                        </dt><!--
                        --><dd :class="{ 'font-weight-bold': !showNetPrices }" data-testing="basket-amount">
                            {{ basket.basketAmount | currency }}
                        </dd>
                    </template>
                    <!-- Total sum (gross) -->

                    <!-- Coupon -->
                    <template v-if="visibleFields.includes('salesCoupon') && basket.couponCode && basket.couponCampaignType === 'sales'">
                        <dt class="font-weight-bold">
                            {{ $translate("Ceres::Template.basketCoupon") }}
                        </dt><!--
                     --><dd class="font-weight-bold" data-testing="sales-coupon">
                            {{ basket.couponDiscount | currency }}
                        </dd>
                    </template>
                    <!-- Coupon -->

                    <!-- Coupon open amount -->
                    <template v-if="visibleFields.includes('openAmount') && basket.couponCampaignType === 'sales'">
                        <dt class="font-weight-bold">
                            {{ $translate("Ceres::Template.basketOpenAmount") }}
                        </dt><!--
                    --><dd class="font-weight-bold" data-testing="open-amount">
                            {{ basket.openAmount | currency }}
                        </dd>
                    </template>
                    <!-- Coupon open amount -->
                </div>

                <slot name="after-total-sum"></slot>
            </dl>
        </div>

        <div v-if="basket.isExportDelivery && deliveryExportTranslation" class="alert alert-info w-100">
            {{ deliveryExportTranslation }}
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "basket-totals",

    props:
    {
        visibleFields:
        {
            type: Array,
            default: () => [
                "basketValueNet",
                "basketValueGross",
                "rebate",
                "shippingCostsNet",
                "shippingCostsGross",
                "promotionCoupon",
                "totalSumNet",
                "vats",
                "additionalCosts",
                "totalSumGross",
                "salesCoupon",
                "openAmount"
            ]
        }
    },

    computed:
    {
        currentShippingCountry()
        {
            const shippingCountryId = this.basket.shippingCountryId;

            return this.shippingCountries.find(country => country.id === shippingCountryId);
        },

        shopCountry()
        {
            const shopCountryId = this.basket.shopCountryId;

            return this.shippingCountries.find(country => country.id === shopCountryId);
        },

        deliveryExportTranslation()
        {
            const shopCountry = this.shopCountry && this.shopCountry.currLangName;
            const currentShippingCountry = this.currentShippingCountry && this.currentShippingCountry.currLangName;

            return this.$translate("Ceres::Template.basketExportDeliveryWarning", { from: shopCountry, to: currentShippingCountry });
        },

        propertiesWithAdditionalCosts()
        {
            const entries = [];

            for (const basketItem of this.basketItems) {
                const matchingProperties = basketItem.variation.data.properties.filter(property =>
                    property.property.isShownAsAdditionalCosts && property.property.isOderProperty === false
                );

                for (const property of matchingProperties) {
                    const existingEntry = entries.find(entry => entry.propertyId === property.propertyId)

                    if (!existingEntry) {
                        entries.push({
                            propertyId: property.propertyId,
                            name: property.property.names.name,
                            quantity: basketItem.quantity,
                            surcharge: this.$options.filters.propertySurcharge(basketItem.variation.data.properties, property.propertyId)
                        });
                    }
                    else {
                        existingEntry.quantity += basketItem.quantity
                    }
                }
            }

            for (const entry of entries) {
                entry.price = entry.quantity * entry.surcharge;
            }

            return entries;
        },

        ...mapState({
            basket: state => state.basket.data,
            basketItems: state => state.basket.items,
            isBasketLoading: state => state.basket.isBasketLoading,
            shippingCountries: state => state.localization.shippingCountries,
            showNetPrices: state => state.basket.showNetPrices
        })
    },

    methods: {
        calculateBaseValue(value, percent)
        {
            return (value / (100 - percent)) * 100;
        }
    }
}
</script>
