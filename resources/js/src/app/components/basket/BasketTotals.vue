<template>
    <div class="bkr-cc cmp cmp-totals basketTotals" :class="{preview : $attrs.preview}">
        <div class="h3" v-if="!$attrs.preview">{{ $translate("Ceres::Template.basketSum") }}</div>
        <button v-if="!$attrs.preview" class="btn btn-xs btn-default" onclick="$('.net').slideToggle();">Details</button>

        <div class="component-loading with-icon refreshing split-totals-height" :class="{ 'isLoading': isBasketLoading }">
            <dl>
                <slot name="before-item-sum"></slot>

                <template v-if="visibleFields.includes('basketValueNet')">
                    <div class="net">
                        <dt>
                            {{ $translate("Ceres::Template.basketValue") }} ({{ $translate("Ceres::Template.basketNet") }})
                        </dt><!--
                        --><dd class="k1">
                            {{ calculateBaseValue(basket.itemSumNet, basket.basketRebate) | currency }}
                        </dd>
                    </div>
                </template>
                <template v-if="visibleFields.includes('basketValueGross')">
                    <dt>
                        {{ $translate("Ceres::Template.basketValue") }} ({{ $translate("Ceres::Template.basketGross") }})
                    </dt><!--
                    --><dd class="k2">
                        {{ calculateBaseValue(rrpCalc, basket.basketRebate)| currency  }}
                    </dd>
                </template>
            
                <!-- AdditionalCosts with Tax -->
                <template v-if="(visibleFields.includes('additionalCosts') || visibleFields.includes('basket.additional_costs')) && displayedProperties.length">
                    <template v-for="property in displayedProperties">
                    <dt class="muted-properties" :class="{ 'font-weight-bold': showNetPrices }" :key="'property-name-' + property.propertyId" data-testing="additionalcost-with-tax">
                        &nbsp;<i>davon {{ property.name }}</i>
                    </dt><!-- --><dd class="muted-properties k3" :class="{ 'font-weight-bold': showNetPrices }" :key="'property-price-' + property.propertyId">
                        <i>{{ property.price | currency }}</i>
                    </dd>
                    </template>
                </template>
                <!-- AdditionalCosts with Tax -->

                <template v-if="visibleFields.includes('rebate') && basket.basketRebate">
                    <dt class="rebate-hint">
                        {{ $translate("Ceres::Template.basketRebate") }}
                    </dt><!--
                --><dd class="k4 rebate-hint" v-if="!showNetPrices">
                        {{ calculateBaseValue(basket.itemSum, basket.basketRebate) - basket.itemSum | currency  }}
                    </dd><!--
                --><dd class="k5 rebate-hint" v-else>
                        {{ calculateBaseValue(basket.itemSumNet, basket.basketRebate) - basket.itemSumNet | currency  }}
                    </dd>
                    <dt>
                        {{ $translate("Ceres::Template.basketSubTotal") }} ({{ $translate("Ceres::Template.basketNet") }})
                    </dt><!--
                --><dd class="k6">
                        {{ basket.itemSumNet | currency }}
                    </dd>
                    <dt>
                        {{ $translate("Ceres::Template.basketSubTotal") }} ({{ $translate("Ceres::Template.basketGross") }})
                    </dt><!--
                --><dd class="k7">
                        {{ rrpCalc | currency }}
                    </dd>
                </template>
                <slot name="after-item-sum"></slot>

                <slot name="before-shipping-costs"></slot>
                <template v-if="visibleFields.includes('shippingCostsNet')">
                    <div class="net">
                    <dt>
                        {{ $translate("Ceres::Template.basketShippingCosts") }} ({{ $translate("Ceres::Template.basketNet") }})
                    </dt><!--
                    --><dd class="k8">
                        {{ basket.shippingAmountNet | currency }}
                    </dd>
                    </div>
                </template>
                <template v-if="visibleFields.includes('shippingCostsGross')">
                    <dt>
                        {{ $translate("Ceres::Template.basketShippingCosts") }} ({{ $translate("Ceres::Template.basketGross") }})
                    </dt><!--
                    --><dd class="k9">
                        {{ basket.shippingAmount | currency }}
                    </dd>
                </template>
               <slot name="after-shipping-costs"></slot>
                <template v-if="visibleFields.includes('promotionCoupon') && basket.couponCode && basket.couponCampaignType === 'promotion'">
                <hr />
                    <dt>
                        {{ $translate("Ceres::Template.basketCoupon") }}
                    </dt><!--
                --><dd class="k10">
                        {{ basket.couponDiscount | currency }}
                    </dd>
                </template>
                 <template v-if="youSave > 0">
                 <hr v-if="!(visibleFields.includes('promotionCoupon') && basket.couponCode && basket.couponCampaignType === 'promotion')" />
                    <dt>
                        Aktionsrabatt
                    </dt><!--
                    --><dd class="k11">
                        - {{ youSave | currency }}
                    </dd>
                </template>

                <div class="net">
                    <hr>
                    <slot name="before-total-sum"></slot>
                    <template v-if="visibleFields.includes('totalSumNet')">
                        <dt>
                            {{ $translate("Ceres::Template.basketTotalSum") }} ({{ $translate("Ceres::Template.basketNet") }})
                        </dt><!--
                        --><dd class="k12">
                            {{ basket.basketAmountNet | currency }}
                        </dd>
                    </template>
                     <slot name="before-vat"></slot>

                    <div v-if="visibleFields.includes('vats')" class="vatTotals" v-for="totalVat in basket.totalVats">
                        <dt>
                            {{ $translate("Ceres::Template.basketVAT") }} {{ totalVat.vatValue }}%
                        </dt><!--
                        --><dd class="k13">
                            {{ totalVat.vatAmount | currency }}
                        </dd>
                    </div>
                </div>
                <div class="totalSum">
                    <hr>
                    <template v-if="visibleFields.includes('totalSumGross')">
                        <dt>
                            {{ $translate("Ceres::Template.basketTotalSum") }} ({{ $translate("Ceres::Template.basketGross") }})
                        </dt><!--
                        --><dd class="k14">
                            {{ basket.basketAmount | currency }}
                        </dd>
                    </template>
                   
                    <template v-if="visibleFields.includes('salesCoupon') && basket.couponCode && basket.couponCampaignType === 'sales'">
                        <dt>
                            {{ $translate("Ceres::Template.basketCoupon") }}
                        </dt><!--
                        --><dd class="k15">
                            {{ basket.couponDiscount | currency }}
                        </dd>
                    </template>
                    <template v-if="visibleFields.includes('openAmount') && basket.couponCampaignType === 'sales'">
                        <dt>
                            {{ $translate("Ceres::Template.basketOpenAmount") }}
                        </dt><!--
                    --><dd class="k16">
                            {{ basket.openAmount | currency }}
                        </dd>
                    </template>
                </div>
                  <slot name="after-total-sum"></slot>
            </dl>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { hasVat, isAdditionalCosts } from "../../helper/OrderPropertyHelper";
export default {
    name: "basket-totals",
    data() {
        return {
            displayedProperties: [],
            displayedPropertiesWithoutTax: []
        }
    },
    created() {
        this.setPropertiesForTotals(this.basketItems);
    },
    watch: {
        
        basketItems: 
        {
            deep: true,
            handler(newItems)
            {
                this.setPropertiesForTotals(newItems)
            }
        }
        
    },

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
                "openAmount",
                "subAmount"
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

        rrpCalc() {
            return this.basket.itemSum + this.youSave;
        },

        youSave() {
            let youSave = 0;
            for (let basketItem of this.basketItems) {
                let itemQuantity = basketItem.quantity;
                let itemPrice = basketItem.price;
                let rrp = basketItem.variation.data.prices.rrp.price.value || 0;
                if (rrp > itemPrice) {
                    youSave += (rrp - itemPrice) * itemQuantity;
                }
            }
            return youSave;
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
        },

        isVariationProperty(property)
        {
            return property.property.isOderProperty && App.useVariationOrderProperties;
        },

        isInBasketItemOrderParams(basketItem, property)
        {
            if (!property.property.isOderProperty && !App.useVariationOrderProperties)
            {
                return true;
            }
            return !!basketItem.basketItemOrderParams.find(param => Number(param.propertyId) === Number(property.propertyId));
        },
        
        setPropertiesForTotals(newBasketItems)
        {
            this.displayedPropertiesWithoutTax = [];
            this.displayedProperties = [];
            for (const basketItem of newBasketItems)
            {
                basketItem.variation.data.properties?.forEach(property => {
                    if(this.isInBasketItemOrderParams(basketItem, property) && 
                      (isAdditionalCosts(property) || (!hasVat(property) && App.useVariationOrderProperties )))
                    {
                        const existsIndisplayedProperties = this.displayedProperties.find(entry => entry.propertyId === property.propertyId)
                        const existsIndisplayedPropertiesWithoutTax = this.displayedPropertiesWithoutTax.find(entry => entry.propertyId === property.propertyId)
                        const existingProperty = existsIndisplayedProperties || existsIndisplayedPropertiesWithoutTax;

                        // if new item gets added and its property already exist update quantity
                        if (existingProperty) 
                        {
                            existingProperty.quantity += basketItem.quantity
                        }
                        else
                        {
                            const newProperty = {
                                propertyId: property.propertyId,
                                name: property.property.names.name,
                                quantity: basketItem.quantity,
                                surcharge: this.$options.filters.propertySurcharge(basketItem.variation.data.properties, property.propertyId),
                                vatId: property.property.vatId
                            }
                            !hasVat(property) ? this.displayedPropertiesWithoutTax.push(newProperty) : this.displayedProperties.push(newProperty);
                        }
                    }
                });
            }
            this.displayedPropertiesWithoutTax.forEach((entry) => 
            {
                entry.price = entry.quantity * entry.surcharge;
            })
            this.displayedProperties.forEach((entry) => 
            {
                entry.price = entry.quantity * entry.surcharge;
            })
        }
    }
}
</script>
