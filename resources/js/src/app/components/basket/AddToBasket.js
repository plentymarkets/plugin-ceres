import ExceptionMap from "exceptions/ExceptionMap";
import TranslationService from "services/TranslationService";
import { navigateTo } from "services/UrlService";
import { isNullOrUndefined, isDefined } from "../../helper/utils";

const NotificationService = require("services/NotificationService");

Vue.component("add-to-basket", {

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
        buttonSize:
        {
            type: [String, null],
            default: null,
            validator: value =>
            {
                return ["sm", "md", "lg"].indexOf(value) !== -1;
            }
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

            if (isDefined(this.buttonSize))
            {
                classes.push(`btn-${this.buttonSize}`);
            }

            if (isDefined(this.paddingClasses))
            {
                classes.push(this.paddingClasses.split(" "));
            }

            return classes;
        },

        ...Vuex.mapState({
            isBasketLoading: state => state.basket.isBasketLoading,
            isVariationSelected: state => state.item.isVariationSelected
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
