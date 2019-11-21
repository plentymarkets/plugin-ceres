import ExceptionMap from "../../exceptions/ExceptionMap";
import TranslationService from "../../services/TranslationService";
import { navigateTo } from "../../services/UrlService";
import { isNullOrUndefined, isDefined } from "../../helper/utils";
import Vue from "vue";
import { mapState } from "vuex";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

const NotificationService = require("../../services/NotificationService");

Vue.component("add-to-basket", {

    mixins: [ButtonSizePropertyMixin],

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
                return TranslationService.translate("Ceres::Template.singleItemPleaseSelectValidVariation");
            }
            else
            {
                return TranslationService.translate("Ceres::Template.singleItemPleaseSelectNotAvailable");
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
                                TranslationService.translate(
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
});
