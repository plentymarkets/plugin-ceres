<template>
    <div>
        <div :class="{'no-pointer-events': waiting}" class="add-to-basket-lg-container d-none d-lg-block" v-if="!showQuantity && useLargeScale && canBeAddedToBasket"
             v-tooltip data-toggle="tooltip" data-placement="top" :title="$translate('Ceres::Template.singleItemAddToBasket')" @click="addToBasket()">
            <icon icon="cart-plus" class="fa-lg mobile-icon-right" :loading="waiting"></icon>
        </div>

        <div class="add-to-basket-lg-container d-none d-lg-block" v-if="!showQuantity && useLargeScale && !canBeAddedToBasket"
             v-tooltip data-toggle="tooltip" data-placement="top" :title="$translate('Ceres::Template.itemShowItem')" @click="directToItem()">
            <i class="fa fa-arrow-right fa-lg d-none d-sm-block"></i>
        </div>

        <div class="d-inline d-lg-none" v-if="showQuantity && !useLargeScale">
            <div class="add-to-basket-container">
                <div class="quantity-input-container">
                    <quantity-input :value="quantity"
                                    @quantity-change="updateQuantity"
                                    @out-of-stock="handleButtonState"
                                    :timeout="0"
                                    :min="minimumQuantity"
                                    :max="maximumQuantity"
                                    :interval="intervalQuantity"
                                    :variation-id="variationId">
                    </quantity-input>
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
                    <icon icon="shopping-cart" :loading="waiting"></icon>
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
                    <icon icon="shopping-cart" :waiting="waiting"></icon>
                    {{ $translate("Ceres::Template.singleItemAddToBasket") }}
                </button>
            </div>
        </div>

        <div class="d-inline d-lg-none" v-if="!showQuantity && !useLargeScale">
            <div class="btn-group" role="group" aria-label="Thumb Control">
                <button type="button" :class="{'no-pointer-events': waiting}" v-if="canBeAddedToBasket" class="btn btn-primary btn-appearance mobile-width-button" @click="addToBasket()">
                    <icon icon="shopping-cart" class="fa-lg mobile-icon-right" :loading="waiting"></icon>
                    {{ $translate("Ceres::Template.singleItemAddToBasket") }}
                </button>
                <button type="button" v-if="!canBeAddedToBasket" class="btn btn-primary btn-appearance mobile-width-button" @click="directToItem()">
                    <i class="fa fa-arrow-right fa-lg d-none d-sm-block" aria-hidden="true"></i>
                    {{ $translate("Ceres::Template.itemShowItem") }}
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
        hasOrderProperties:
        {
            type: Boolean,
            default: false
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
            type: Boolean,
            default: false
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
                (this.hasOrderProperties || this.orderProperties.filter(property => property.property.isShownOnItemPage).length > 0);
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
            this.$store.dispatch("loadComponent", "add-item-to-basket-overlay");

            if (this.missingOrderProperties.length)
            {
                this.showMissingPropertiesError();
            }
            else if (this.isSalable)
            {
                this.waiting = true;

                let totalSurcharge = 0;
                const orderParams = this.orderProperties
                    .filter((orderProperty) => !isNullOrUndefined(orderProperty.property.value))
                    .map((orderProperty) =>
                    {
                        const property = orderProperty.property;

                        if (property.valueType === "float" &&
                            !isNullOrUndefined(property.value) &&
                            property.value.slice(-1) === App.decimalSeparator)
                        {
                            property.value = property.value.substr(0, property.value.length - 1);
                        }

                        totalSurcharge += (orderProperty.surcharge || 0) + (property.surcharge || 0);

                        return {
                            propertyId: property.id,
                            type: property.valueType,
                            name: property.names.name,
                            value: property.value
                        };
                    });

                const basketObject =
                    {
                        variationId             :   this.variationId,
                        quantity                :   this.quantity,
                        basketItemOrderParams   :   orderParams,
                        totalOrderParamsMarkup  :   totalSurcharge
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
