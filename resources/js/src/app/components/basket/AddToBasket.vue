<template>
    <div>
        <div :class="{'no-pointer-events': isLoading}" class="add-to-basket-lg-container d-none d-lg-block" v-if="!showQuantity && useLargeScale && canBeAddedToBasket"
             v-tooltip data-toggle="tooltip" data-placement="top" :title="$translate('Ceres::Template.singleItemAddToBasket')" @click="addToBasket()">
            <icon icon="cart-plus" class="fa-lg mobile-icon-right" :loading="isLoading"></icon>
        </div>

        <div class="add-to-basket-lg-container d-none d-lg-block" v-if="!showQuantity && useLargeScale && !canBeAddedToBasket"
             v-tooltip data-toggle="tooltip" data-placement="top" :title="$translate('Ceres::Template.itemShowItem')" @click="directToItem()">
            <i class="fa fa-arrow-right fa-lg d-none d-sm-block"></i>
        </div>

        <div class="d-inline" v-if="showQuantity && !useLargeScale" :class="{'d-lg-none': !$ceres.isItemView }">
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
                                    :waiting="isLoading || !isSalable || !allVariationsSelected">
                    </quantity-input>
                </div>

                <button
                        v-if="!allVariationsSelected || !isSalable"
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
                        :disabled="isLoading || !hasPrice"
                        class="btn btn-block btn-primary btn-appearance"
                        @click="addToBasket()"
                        :class="buttonClasses"
                        :style="paddingInlineStyles">
                    <icon icon="shopping-cart" :loading="isLoading"></icon>
                    {{ $translate("Ceres::Template.singleItemAddToBasket") }}
                </button>
                <button v-else
                        class="btn btn-block btn-primary btn-appearance disabled"
                        v-tooltip
                        data-toggle="tooltip"
                        data-placement="top"
                        :title="'Ceres::Template.singleItemQuantityMax' | translate({ max: maximumQuantity })"
                        :class="buttonClasses"
                        :style="paddingInlineStyles">
                    <icon icon="shopping-cart" :waiting="isLoading"></icon>
                    {{ $translate("Ceres::Template.singleItemAddToBasket") }}
                </button>
            </div>
        </div>

        <div class="d-inline" v-if="!showQuantity && !useLargeScale" :class="{'d-lg-none': !isWishList }">
            <div class="btn-group" role="group" aria-label="Thumb Control">
                <button type="button" :class="{'no-pointer-events': isLoading}" v-if="canBeAddedToBasket" class="btn btn-primary btn-appearance mobile-width-button" @click="addToBasket()">
                    <icon icon="shopping-cart" class="fa-lg mobile-icon-right" :loading="isLoading"></icon>
                    {{ $translate("Ceres::Template.singleItemAddToBasket") }}
                </button>
                <button type="button" v-else class="btn btn-primary btn-appearance mobile-width-button" @click="directToItem()">
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
import QuantityInput from "../item/QuantityInput.vue";

const NotificationService = require("../../services/NotificationService");

export default {
    name: "add-to-basket",

    mixins: [ButtonSizePropertyMixin],
    
    components:
    {
        QuantityInput
    },

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
        hasRequiredOrderProperty:
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
        },
        itemType:
        {
            type: String,
            default: null
        }
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        isSet()
        {
            return (
                this.$store.state.items[this.itemId]
                && this.$store.state.items[this.itemId].variation
                && this.$store.state.items[this.itemId].variation.documents[0].data.item.itemType === "set"
            ) || this.itemType === "set";
        },

        canBeAddedToBasket()
        {
            return this.isSalable &&
                !this.hasChildren &&
                !(this.minimumQuantity != 1 || this.intervalQuantity != 1) &&
                !this.requiresProperties &&
                this.hasPrice &&
                !this.isSet;
        },

        requiresProperties()
        {
            return (App.config.item.requireOrderProperties && 
                (this.hasOrderProperties || this.orderProperties.filter(property => property.property.isShownOnItemPage).length > 0)) ||
                this.hasRequiredOrderProperty;
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

        variationOrderQuantity()
        {
            return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationOrderQuantity;
        },

        variationMissingProperties()
        {
            return this.$store.getters[`${this.itemId}/variationMissingProperties`];
        },

        hasAvailableVariations()
        {
            return this.$store.state.items[this.itemId]
                && this.$store.state.items[this.itemId].variationSelect
                && this.$store.state.items[this.itemId].variationSelect.variations.some(variation => variation.isSalable);
        },

        allVariationsSelected()
        {
            if (this.isSet)
            {
                return this.$store.getters["itemSetAllVariationSelected"];
            }
            else
            {
                // FIX return true if module is not registered. This equals the default value from the module
                // and is required to use this component in other contexts, e.g. the category view
                return !this.$store.state.items[this.itemId]
                    || (this.$store.state.items[this.itemId].variationSelect
                        && this.$store.state.items[this.itemId].variationSelect.isVariationSelected);
            }
        },

        isLoading()
        {
            return this.$store.state.items.isAddToBasketLoading === this.variationId || this.$store.state.items.isSetLoading;
        },

        ...mapState({
            basketItems: state => state.basket.items,
            isBasketLoading: state => state.basket.isBasketLoading
        })
    },

    data()
    {
        return {
            quantity: 1,
            buttonLockState: false
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
            this.$store.dispatch("loadComponent", "basket-preview");

            if (this.variationMissingProperties !== undefined && this.variationMissingProperties.length)
            {
                this.showMissingPropertiesError();
            }
            else if (this.isSalable || this.isSet)
            {
                this.$store.commit("setIsAddToBasketLoading", this.variationId);

                const orderParamsAndSurcharge = extractPropertiesAndSurcharge(this.orderProperties);

                const basketObject =
                    {
                        variationId             :   this.variationId,
                        quantity                :   this.quantity,
                        basketItemOrderParams   :   orderParamsAndSurcharge.orderParams,
                        totalOrderParamsMarkup  :   orderParamsAndSurcharge.totalSurcharge
                    };

                if(this.isSet)
                {
                    const setComponents = [];
                    this.$store.state.items.setComponentIds.forEach(itemId =>
                    {
                        const setComponent = this.$store.getters[`${itemId}/currentItemVariation`];

                        const variationId = setComponent && setComponent.variation.id;

                        // Extract order properties and total surcharge for set components
                        const setComponentOrderParamsAndSurcharge = extractPropertiesAndSurcharge(
                            setComponent.properties.filter(prop => prop.property.isOderProperty)
                        );

                        setComponents.push({
                            variationId: variationId,
                            quantity: this.$store.state.items[itemId].variationOrderQuantity,
                            basketItemOrderParams: setComponentOrderParamsAndSurcharge.orderParams,
                            totalOrderParamsMarkup: setComponentOrderParamsAndSurcharge.totalSurcharge
                        });
                    });
                    basketObject.setComponents = setComponents;
                }

                this.$store.dispatch("addBasketItem", basketObject).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemAdded", { detail: basketObject }));
                        this.$store.commit("setIsAddToBasketLoading", 0);
                    },
                    error =>
                    {
                        this.$store.commit("setIsAddToBasketLoading", 0);

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
            this.$store.commit(`${this.itemId}/setVariationMarkInvalidProps`, true);

            const propertyNames = this.variationMissingProperties.map(property => property.property.names.name);
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
            if(!isNullOrUndefined(this.itemId))
            {
                this.$store.commit(`${this.itemId}/setVariationOrderQuantity`, value);
                this.$store.commit(`${this.itemId}/setVariationPropertySurcharges`, this.$store.getters[`${this.itemId}/variationBasePrice`]);
            }
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

function extractPropertiesAndSurcharge(orderProperties)
{
    let totalSurcharge = 0;
    const orderParams = [];

    orderProperties.forEach((orderProperty) =>
    {
        if(!isNullOrUndefined(orderProperty.property.value))
        {
            const property = orderProperty.property;

            if (property.valueType === "float" &&
                !isNullOrUndefined(property.value) &&
                property.value.slice(-1) === App.decimalSeparator)
            {
                property.value = property.value.substr(0, property.value.length - 1);
            }

            totalSurcharge += (orderProperty.surcharge || 0) + (property.surcharge || 0);

            orderParams.push({
                propertyId: property.id,
                type: property.valueType,
                name: property.names.name,
                value: property.value
            });
        }
    });

    return {
        orderParams: orderParams,
        totalSurcharge: totalSurcharge
    };
}
</script>
