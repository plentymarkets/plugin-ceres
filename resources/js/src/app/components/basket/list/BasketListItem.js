import ExceptionMap from "../../../exceptions/ExceptionMap";
import TranslationService from "../../../services/TranslationService";
import { isNullOrUndefined } from "../../../helper/utils";
import { transformBasketItemProperties } from "../../../services/VariationPropertyService";
import Vue from "vue";
import { mapState } from "vuex";
import { sortByKey } from "../../../helper/array";

const clone = require("lodash/clone");
const NotificationService = require("../../../services/NotificationService");

Vue.component("basket-list-item", {
    props: [
        "basketItem",
        "size",
        "language",
        "template",
        "isPreview"
    ],

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
        activeOrderProperties()
        {
            const data = [];

            for (const orderParam of this.basketItem.basketItemOrderParams)
            {
                const property = this.basketItem.variation.data.properties.find(property => property.property.id === parseInt(orderParam.propertyId));
                const position = property && property.property && property.property.position;

                data.push({
                    ...clone(orderParam),
                    position
                });
            }

            return sortByKey(data, "position");
        },

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

        itemTotalPrice()
        {
            return this.basketItem.quantity * this.basketItem.price;
        },

        unitPrice()
        {
            if (!isNullOrUndefined(this.basketItem.variation.data.prices.specialOffer))
            {
                return this.basketItem.variation.data.prices.specialOffer.unitPrice.value;
            }

            return this.basketItem.variation.data.prices.default.unitPrice.value;
        },

        basePrice()
        {
            if (!isNullOrUndefined(this.basketItem.variation.data.prices.specialOffer))
            {
                return this.basketItem.variation.data.prices.specialOffer.basePrice;
            }

            return this.basketItem.variation.data.prices.default.basePrice;
        },

        transformedVariationProperties()
        {
            return transformBasketItemProperties(this.basketItem, ["empty"], "displayInOrderProcess");
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
        }
    }
});
