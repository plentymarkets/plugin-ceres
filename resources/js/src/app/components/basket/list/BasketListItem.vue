<template>
    <div class="basket-list-item py-3">
        <slot name="before-basket-item"></slot>

        <div class="basket-item component-loading with-icon d-flex" :class="{ 'sending is-loading': waiting, 'is-loading': isCheckoutReadonly }">
            <div class="image-container">
              <a :href="basketItem.variation.data | itemURL">
                <lazy-img
                    picture-class="d-block mw-100 mh-100"
                    v-if="image"
                    :image-url="image"
                    :alt="altText"
                    :title="itemName"
                    data-testing="basket-item-img">
                </lazy-img>
              </a>
            </div>

            <div class="meta-container-wrapper">
                <div class="meta-container-wrapper-inner">
                    <div class="meta-container">
                        <div class="position-relative w-100">
                            <a :href="basketItem.variation.data | itemURL" class="item-name text-primary text-appearance small font-weight-bold text-break" data-testing="basket-item-name">
                                {{ basketItem.variation.data | itemName }}
                            </a>

                            <div class="item-base-price small">
                                {{ unitPrice | currency }}
                            </div>

                            <item-bundle
                                    :bundle-type="basketItem.variation.data.variation.bundleType"
                                    :bundle-components="basketItem.variation.data.bundleComponents">
                            </item-bundle>

                            <div class="text-muted small" v-if="!(basketItem.variation.data.unit.unitOfMeasurement === 'C62' && basketItem.variation.data.unit.content === 1) && basketItem.variation.data.variation.mayShowUnitPrice">
                                <div>
                                    {{ basePrice }}
                                </div>
                                <div>
                                    <strong>{{ $translate("Ceres::Template.basketContent") }}: </strong>
                                    {{ basketItem.variation.data.unit.content }} {{ basketItem.variation.data.unit.names.name }}
                                </div>
                            </div>

                            <div class="small" v-if="basketItem.inputLength > 0 || basketItem.inputWidth > 0">
                                <div>
                                    <strong>{{ $translate("Ceres::Template.itemInput") }} {{ basketItem | inputUnit(true)}}: </strong>
                                    {{ basketItem | inputUnit }}
                                </div>
                            </div>

                            <div class="small">
                                <div v-for="attribute in basketItem.variation.data.attributes">
                                    <strong>{{ attribute.attribute.names.name }}: </strong>
                                    <span>{{ attribute.value.names.name }}</span>
                                </div>
                            </div>

                            <div class="text-muted small">
                                <template v-for="propertyGroup in basketItem.variation.data.variationProperties">
                                    <div v-for="property in propertyGroup.properties">
                                        <strong v-if="propertyGroup.name">{{ propertyGroup.name }}: </strong>
                                        <span>{{ property.names.name }}</span>
                                        <span v-if="property.cast === 'file'">
                                            <a :href="property.values.value | propertyFileUrl" v-html="property.values.value" target="_blank"></a>
                                        </span>
                                        <span v-else v-html="property.values.value"></span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>

                    <div class="basket-item-container-right">
                        <div class="qty-box-container">
                            <quantity-input
                                    @quantity-change="updateQuantity"
                                    :value="basketItem.quantity"
                                    :waiting="isInputLocked || isCheckoutReadonly"
                                    :min="basketItem.variation.data.variation.minimumOrderQuantity"
                                    :max="basketItem.variation.data.variation.maximumOrderQuantity"
                                    :interval="basketItem.variation.data.variation.intervalOrderQuantity">
                            </quantity-input>
                        </div>

                        <div class="price-box text-right ml-2 mt-1">
                            <div class="item-total-price font-weight-bold text-nowrap">{{ basketItem.quantity * unitPrice | currency(basketItem.variation.data.prices.default.currency) }}</div>

                            <button
                                class="btn btn-sm text-danger p-0"
                                :class="{ 'disabled': waiting || isBasketLoading || isCheckoutReadonly || waitingForDelete }"
                                @click="deleteItem"
                                data-testing="basket-item-delete">
                                {{ $translate("Ceres::Template.basketDelete") }}
                                <icon icon="trash-o" class="default-float" :loading="waitingForDelete"></icon>
                            </button>
                        </div>
                    </div>
                </div>

                <basket-set-component-list v-if="basketItem.setComponents" :set-components="basketItem.setComponents" :set-item="basketItem"></basket-set-component-list>

                <div class="small" v-if="basketItem.basketItemOrderParams && basketItem.basketItemOrderParams.length">
                    <div class="font-weight-bold my-1">{{ $translate("Ceres::Template.basketAdditionalOptions") }}:</div>
                    <ul class="ml-1 pl-3">
                        <li v-for="property in basketItem.basketItemOrderParams" :key="property.propertyId" v-show="isPropertyVisible(property.propertyId)">
                            <span class="d-block">
                                <strong :class="{ 'colon': property.type.length > 0 }">{{ property.name }} ({{ $translate("Ceres::Template.basketIncludeAbbr") }} {{ basketItem.variation.data.properties | propertySurcharge(property.propertyId) | currency }})</strong>
                                <span>
                                    <order-property-value :property="property"></order-property-value>
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="small" v-if="showMoreInformation">
                    <template v-if="isDataFieldVisible('basket.item.item_id') && basketItem.variation.data.item.id">
                        <div class="mt-3">
                            <strong>{{ $translate("Ceres::Template.basketItemId") }}:</strong>
                            <span>{{ basketItem.variation.data.item.id }}</span>
                        </div>
                    </template>

                    <template v-if="isDataFieldVisible('basket.item.customNumber')">
                        <div v-if="basketItem.variation.data.variation.number">
                            <strong>{{ $translate("Ceres::Template.basketItemNumber") }}:</strong>
                            <span>{{ basketItem.variation.data.variation.number }}</span>
                        </div>
                    </template>

                    <template v-if="isDataFieldVisible('basket.item.availability')">
                        <div v-if="basketItem.variation.data.variation.availability && basketItem.variation.data.variation.availability.names.name">
                            <strong>{{ $translate("Ceres::Template.basketAvailability") }}:</strong>
                            <span>{{ basketItem.variation.data.variation.availability.names.name }}</span>
                        </div>
                    </template>

                    <template v-if="isDataFieldVisible('basket.item.description_long')">
                        <p class="my-3" v-if="basketItem.variation.data.texts.description" v-html="basketItem.variation.data.texts.description"></p>
                    </template>

                    <template v-if="isDataFieldVisible('basket.item.description_short')">
                        <p class="my-3" v-if="basketItem.variation.data.texts.shortDescription" v-html="basketItem.variation.data.texts.shortDescription"></p>
                    </template>
                </div>

                <label v-if="isMoreButtonVisible"
                    class="btn-collapse"
                    :class="{ 'collapsed': !showMoreInformation }"
                    @click="showMoreInformation = !showMoreInformation"
                    :data-show-more="$translate('Ceres::Template.basketShowMore')"
                    :data-show-less="$translate('Ceres::Template.basketShowLess')">
                </label>
            </div>
        </div>

        <slot name="after-basket-item"></slot>
    </div>
</template>

<script>
import ExceptionMap from "../../../exceptions/ExceptionMap";
import TranslationService from "../../../services/TranslationService";
import {isDefined, isNullOrUndefined} from "../../../helper/utils";
import { mapState } from "vuex";

const NotificationService = require("../../../services/NotificationService");

import BasketSetComponentList from "./BasketSetComponentList.vue";

export default {
    components:
    {
        BasketSetComponentList
    },
    props:
    {
        template:
        {
            type: String,
            default: "#vue-basket-list-item"
        },
        basketItem: Object,
        basketDetailsData:
        {
            type: Array,
            default: () => []
        },
        isPreview:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
            waiting: false,
            waitingForDelete: false,
            itemCondition: "",
            showMoreInformation: false
        };
    },

    computed:
    {
        image()
        {
            const itemImages = this.$options.filters.itemImages(this.basketItem.variation.data.images, "urlPreview");

            return this.$options.filters.itemImage(itemImages);
        },

        altText()
        {
            const images = this.$options.filters.itemImages(this.basketItem.variation.data.images, "urlPreview");
            const altText =  this.$options.filters.itemImageAlternativeText(images);

            if (altText)
            {
                return altText;
            }

            return this.itemName;
        },

        itemName()
        {
            return this.$options.filters.itemName(this.basketItem.variation.data);
        },

        isInputLocked()
        {
            return this.waiting || this.isBasketLoading;
        },

        propertySurchargeSum()
        {
            let sum = 0;

            for (const property of this.basketItem.basketItemOrderParams)
            {
                sum += this.$options.filters.propertySurcharge(this.basketItem.variation.data.properties, property.propertyId);
            }

            return sum;
        },

        unitPrice()
        {
            let setComponentsParamSurcharge = 0;
            if(isDefined(this.basketItem.setComponents))
            {
                setComponentsParamSurcharge = this.basketItem.setComponents
                    .map(component => component.quantity * component.attributeTotalMarkup)
                    .reduce((sum, i) => sum + i, 0);
            }
            return this.basketItem.price + setComponentsParamSurcharge;
        },

        basePrice()
        {
            // if the 'AfterBasketItemUpdate' event contains a new base price for the item, return it
            if (!isNullOrUndefined(this.basketItem.updatedBasePrice)) 
            {
                return this.basketItem.updatedBasePrice;
            }

            if (!isNullOrUndefined(this.basketItem.variation.data.prices.specialOffer))
            {
                return this.basketItem.variation.data.prices.specialOffer.basePrice;
            }

            return this.basketItem.variation.data.prices.default.basePrice;
        },

        // eslint-disable-next-line complexity
        isMoreButtonVisible()
        {
            return this.isDataFieldVisible("basket.item.item_id") && this.basketItem.variation.data.item.id ||
                   this.isDataFieldVisible("basket.item.customNumber") && this.basketItem.variation.data.variation.number ||
                   this.isDataFieldVisible("basket.item.availability") && this.basketItem.variation.data.variation.availability.names.name ||
                   this.isDataFieldVisible("basket.item.description_long") && this.basketItem.variation.data.texts.description ||
                   this.isDataFieldVisible("basket.item.description_short") && this.basketItem.variation.data.texts.shortDescription;
        },

        ...mapState({
            isBasketLoading: state => state.basket.isBasketLoading,
            isCheckoutReadonly: state => state.checkout.readOnly,
            showNetPrice: state => state.basket.showNetPrices
        })
    },

    methods: {

        /**
         * Delete item from basket
         */
        deleteItem()
        {
            if (!this.waiting && !this.waitingForDelete && !this.isBasketLoading)
            {
                this.waitingForDelete = true;

                this.$store.dispatch("removeBasketItem", this.basketItem.id).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemRemoved", { detail: this.basketItem }));
                        this.waitingForDelete = false;
                    },
                    error =>
                    {
                        this.waitingForDelete = false;
                    });
            }
        },

        /**
         * Update item quantity in basket
         * @param quantity
         */
        updateQuantity(quantity)
        {
            if (this.basketItem.quantity !== quantity)
            {
                this.waiting = true;

                const origQty = this.basketItem.quantity;

                this.$store.dispatch("updateBasketItemQuantity", { id: this.basketItem.id, variationId: this.basketItem.variation.id, quantity: quantity }).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemQuantityUpdated", { detail: this.basketItem }));
                        this.waiting = false;
                    },
                    error =>
                    {
                        this.basketItem.quantity = origQty;

                        if (this.isPreview)
                        {
                            this.$store.dispatch(
                                "addBasketNotification",
                                {
                                    type: "error",
                                    message: TranslationService.translate(
                                        "Ceres::Template." + ExceptionMap.get(error.data.exceptionCode.toString()),
                                        error.data.placeholder
                                    )
                                }
                            );
                        }
                        else
                        {
                            NotificationService.error(
                                TranslationService.translate(
                                    "Ceres::Template." + ExceptionMap.get(error.data.exceptionCode.toString()),
                                    error.data.placeholder
                                )
                            ).closeAfter(5000);
                        }

                        this.waiting = false;
                    });
            }
        },

        isPropertyVisible(propertyId)
        {
            const property = this.basketItem.variation.data.properties.find(property => property.property.id === parseInt(propertyId));

            if (property)
            {
                return property.property.isShownAtCheckout;
            }

            return false;
        },

        isDataFieldVisible(value)
        {
            return this.basketDetailsData.includes(value);
        }
    }
}
</script>
