<template>
    <div>
        <div :class="{'no-pointer-events': waiting}" class="add-to-basket-lg-container hidden-md-down" v-if="!showQuantity && useLargeScale && canBeAddedToBasket"
             v-tooltip data-toggle="tooltip" data-placement="top" :title="$translate('Ceres::Template.singleItemAddToBasket')" @click="addToBasket()">
            <i v-waiting-animation="waiting" class="fa fa-cart-plus fa-lg mobile-icon-right"></i>
        </div>

        <div class="add-to-basket-lg-container hidden-md-down" v-if="!showQuantity && useLargeScale && !canBeAddedToBasket"
             v-tooltip data-toggle="tooltip" data-placement="top" :title="$translate('Ceres::Template.itemShowItem')" @click="directToItem()">
            <i class="fa fa-arrow-right fa-lg mobile-icon-right"></i>
        </div>

        <div class="category-list-view-port" v-if="showQuantity && !useLargeScale">
            <div class="add-to-basket-container">
                <div class="quantity-input-container">
                    <quantity-input :value="quantity"
                                    @quantity-change="updateQuantity"
                                    @out-of-stock="handleButtonState"
                                    :timeout="0"
                                    :min="minimumQuantity"
                                    :max="maximumQuantity"
                                    :interval="intervalQuantity"
                                    :variation-id="variationId"
                                    template="#vue-quantity-input"></quantity-input>
                </div>

                <button
                        v-if="!isVariationSelected || !isSalable"
                        class="btn btn-block btn-primary btn-appearance disabled"
                        v-tooltip
                        data-toggle="tooltip"
                        data-placement="top"
                        :title="tooltipText"
                        :class="buttonClasses"
                        :style="paddingInlineStyles">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    {{ $translate("Ceres::Template.singleItemAddToBasket") }}
                </button>
                <button
                        v-else-if="!buttonLockState"
                        :disabled="waiting || !hasPrice"
                        class="btn btn-block btn-primary btn-appearance"
                        @click="addToBasket()"
                        :class="buttonClasses"
                        :style="paddingInlineStyles">
                    <i v-waiting-animation="waiting" class="fa fa-shopping-cart" aria-hidden="true"></i>
                    {{ $translate("Ceres::Template.singleItemAddToBasket") }}
                </button>
                <button v-else
                        class="btn btn-block btn-primary btn-appearance disabled"
                        v-tooltip
                        data-toggle="tooltip"
                        data-placement="top"
                        :title="'Ceres::Template.singleItemQuantityMax' | translate({max: item.variation.maximumOrderQuantity})"
                        :class="buttonClasses"
                        :style="paddingInlineStyles">
                    <i v-waiting-animation="waiting" class="fa fa-shopping-cart" aria-hidden="true"></i>
                    {{ $translate("Ceres::Template.singleItemAddToBasket") }}
                </button>
            </div>
        </div>

        <div class="category-list-view-port" v-if="!showQuantity && !useLargeScale && isWishList !== 'true'">
            <div class="btn-group" role="group" aria-label="Thumb Control">
                <button type="button" :class="{'no-pointer-events': waiting}" v-if="canBeAddedToBasket" class="btn btn-outline-primary btn-outline-appearance mobile-width-button" @click="addToBasket()">
                    <i class="fa fa-cart-plus fa-lg mobile-icon-right" aria-hidden="true" v-waiting-animation="waiting"></i>
                    <span class="mobile-text-only">{{ $translate("Ceres::Template.singleItemAddToBasket") }}</span>
                </button>
                <button type="button" v-if="!canBeAddedToBasket" class="btn btn-outline-primary btn-outline-appearance mobile-width-button" @click="directToItem()">
                    <i class="fa fa-arrow-right fa-lg mobile-icon-right" aria-hidden="true"></i>
                    <span class="mobile-text-only">{{ $translate("Ceres::Template.itemShowItem") }}</span>
                </button>
            </div>
        </div>
        <div class="category-list-view-port" v-if="!showQuantity && !useLargeScale && isWishList === 'true'">
            <div class="btn-group" role="group" aria-label="Thumb Control">
                <button type="button" :class="{'no-pointer-events': waiting}" v-if="canBeAddedToBasket" class="btn btn-primary btn-appearance mobile-width-button" @click="addToBasket()">
                    <i class="fa fa-shopping-cart fa-lg mobile-icon-right" aria-hidden="true" v-waiting-animation="waiting"></i>
                    <span class="mobile-text-only">{{ $translate("Ceres::Template.singleItemAddToBasket") }}</span>
                </button>
                <button type="button" v-if="!canBeAddedToBasket" class="btn btn-primary btn-appearance mobile-width-button" @click="directToItem()">
                    <i class="fa fa-arrow-right fa-lg mobile-icon-right" aria-hidden="true"></i>
                    <span class="mobile-text-only">{{ $translate("Ceres::Template.itemShowItem") }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import ExceptionMap from "../../exceptions/ExceptionMap";
import { navigateTo } from "../../services/UrlService";
import { isNullOrUndefined, isDefined } from "../../helper/utils";
import { mapState } from "vuex";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

const NotificationService = require("../../services/NotificationService");

export default {
    mixins: [ButtonSizePropertyMixin],

    props:
    {
        itemUrl: String,
        showQuantity:
        {
            type: Boolean,
            default: false
        },
        useLargeScale:
        {
            type: Boolean,
            default: false
        },
        missingOrderProperties:
        {
            type: Array,
            default: () => []
        },
        variationId:
        {
            type: Number
        },
        isSalable:
        {
            type: Boolean,
            default: false
        },
        hasChildren:
        {
            type: Boolean,
            default: false
        },
        intervalQuantity:
        {
            type: Number,
            default: 1
        },
        minimumQuantity:
        {
            type: Number,
            default: 0
        },
        maximumQuantity:
        {
            type: Number,
            default: null
        },
        orderProperties:
        {
            type: Array,
            default: () => []
        },
        hasPrice:
        {
            type: Boolean,
            default: true
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
        isWishList:
        {
            type: String,
            default: "false"
        },
        propQuantity:
        {
            type: Number,
            default: null
        }
    },
    computed:
    {
        canBeAddedToBasket()
        {
            return this.isSalable &&
                !this.hasChildren &&
                !(this.minimumQuantity != 1 || this.intervalQuantity != 1) &&
                !this.requiresProperties &&
                this.hasPrice;
        },

        requiresProperties()
        {
            return App.config.item.requireOrderProperties &&
                this.orderProperties.filter(property => property.property.isShownOnItemPage).length > 0;
        },

        buttonClasses()
        {
            const classes = [];

            if (isDefined(this.buttonSizeClass))
            {
                classes.push(this.buttonSizeClass);
            }

            if (isDefined(this.paddingClasses))
            {
                classes.push(this.paddingClasses.split(" "));
            }

            return classes;
        },

        tooltipText()
        {
            if (this.hasAvailableVariations)
            {
                return this.$translate("Ceres::Template.singleItemPleaseSelectValidVariation");
            }
            else
            {
                return this.$translate("Ceres::Template.singleItemPleaseSelectNotAvailable");
            }
        },

        ...mapState({
            basketItems: state => state.basket.items,
            isBasketLoading: state => state.basket.isBasketLoading,
            isVariationSelected: state => state.variationSelect.isVariationSelected,
            hasAvailableVariations: state => state.variationSelect.variations.some(variation => variation.isSalable),
            variationOrderQuantity: state => state.item.variationOrderQuantity
        })
    },

    data()
    {
        return {
            quantity: 1,
            buttonLockState: false,
            waiting: false
        };
    },

    methods:
    {
        /**
         * add an item to basket-resource
         */
        addToBasket()
        {
            if (this.missingOrderProperties.length)
            {
                this.showMissingPropertiesError();
            }

            else if (this.isSalable)
            {
                this.waiting = true;

                this.orderProperties.forEach(function(orderProperty)
                {
                    if (orderProperty.property.valueType === "float" &&
                        !isNullOrUndefined(orderProperty.property.value) &&
                        orderProperty.property.value.slice(-1) === App.decimalSeparator)
                    {
                        orderProperty.property.value = orderProperty.property.value.substr(0, orderProperty.property.value.length - 1);
                    }
                });

                const basketObject =
                    {
                        variationId             :   this.variationId,
                        quantity                :   this.quantity,
                        basketItemOrderParams   :   this.orderProperties
                    };

                this.$store.dispatch("addBasketItem", basketObject).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemAdded", { detail: basketObject }));
                        this.waiting = false;
                    },
                    error =>
                    {
                        this.waiting = false;

                        if (error.data)
                        {
                            NotificationService.error(
                                this.$translate(
                                    "Ceres::Template." + ExceptionMap.get(error.data.exceptionCode.toString()),
                                    error.data.placeholder
                                )
                            ).closeAfter(5000);
                        }
                    });
            }
        },
        showMissingPropertiesError()
        {
            this.$store.commit("setVariationMarkInvalidProps", true);

            const propertyNames = this.missingOrderProperties.map(property => property.property.names.name);
            let errorMsgContent = "";

            for (const name of propertyNames)
            {
                errorMsgContent += name + "<br>";
            }

            NotificationService.error(this.$translate("Ceres::Template.singleItemMissingOrderPropertiesError").replace("<properties>", errorMsgContent));
        },

        directToItem()
        {
            navigateTo(this.itemUrl);
        },

        handleButtonState(value)
        {
            this.buttonLockState = value;
        },

        /**
         * update the property quantity of the current instance
         * @param value
         */
        updateQuantity(value)
        {
            this.quantity = value;
        }
    },
    watch:
    {
        quantity(value)
        {
            this.$store.commit("setVariationOrderQuantity", value);
        },

        variationOrderQuantity(value)
        {
            if (this.quantity !== value)
            {
                this.quantity = value;
            }
        },

        propQuantity(value)
        {
            if (!isNaN(value))
            {
                this.quantity = value;
            }
        }
    }
}
</script>
