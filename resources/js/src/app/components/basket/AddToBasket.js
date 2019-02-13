import ExceptionMap from "exceptions/ExceptionMap";
import TranslationService from "services/TranslationService";
import { navigateTo } from "services/UrlService";
import { isNullOrUndefined } from "../../helper/utils";

const NotificationService = require("services/NotificationService");

Vue.component("add-to-basket", {

    delimiters: ["${", "}"],

    props:
    {
        template:
        {
            type: String,
            default: "#vue-add-to-basket"
        },
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
        isVariationSelected:
        {
            type: Boolean,
            default: true
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
        }
    },
    computed:
    {
        computedMinimumQuantity()
        {
            return this.minimumQuantity <= 0 ? this.intervalQuantity : this.minimumQuantity;
        },
        canBeAddedToBasket()
        {
            return this.isSalable &&
                !this.hasChildren &&
                (this.computedMinimumQuantity === this.intervalQuantity || this.intervalQuantity === 0) &&
                !this.requiresProperties;
        },

        requiresProperties()
        {
            return App.config.item.requireOrderProperties &&
                this.orderProperties.filter(property => property.property.isShownOnItemPage).length > 0;
        },

        ...Vuex.mapState({
            isBasketLoading: state => state.basket.isBasketLoading
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
    created()
    {
        this.$options.template = this.template;
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
                    if (orderProperty.property.valueType === "float" && orderProperty.property.value.slice("-1") === App.decimalSeparator)
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
                        const basketItem = response.find(item => item.variationId === this.variationId);
                        const variation = !isNullOrUndefined(basketItem) ? basketItem.variation.data : null;
                        const orderParams = !isNullOrUndefined(basketObject) ? basketObject.basketItemOrderParams : null;

                        document.dispatchEvent(new CustomEvent("afterBasketItemAdded", { detail: basketObject }));
                        this.waiting = false;
                        this.openAddToBasketOverlay(basketObject.quantity, variation, orderParams);
                    },
                    error =>
                    {
                        this.waiting = false;

                        if (error.data)
                        {
                            NotificationService.error(
                                TranslationService.translate(
                                    "Ceres::Template." + ExceptionMap.get(error.data.exceptionCode.toString())
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

            NotificationService.error(TranslationService.translate("Ceres::Template.singleItemMissingOrderPropertiesError").replace("<properties>", errorMsgContent));
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
         * open the AddItemToBasketOverlay
         */
        openAddToBasketOverlay(stashedQuantity, item, orderParams)
        {
            const latestBasketEntry =
                {
                    item: item,
                    quantity: stashedQuantity,
                    orderParams: orderParams
                };

            this.$store.commit("setLatestBasketEntry", latestBasketEntry);
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
        quantity(newValue, oldValue)
        {
            this.$store.commit("setVariationOrderQuantity", newValue);
        }
    }
});
