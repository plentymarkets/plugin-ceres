import ExceptionMap from "exceptions/ExceptionMap";
import TranslationService from "services/TranslationService";
import { isNullOrUndefined, isDefined } from "../../../helper/utils";

const NotificationService = require("services/NotificationService");

Vue.component("basket-list-item", {

    delimiters: ["${", "}"],

    props: [
        "basketItem",
        "size",
        "language",
        "template"
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

        variationPropertyGroups()
        {
            const variationPropertyGroups = this.basketItem.variation.data.variationPropertyGroups;
            const variationProperties = this.basketItem.variation.data.variationProperties;

            if (isDefined(variationProperties) && variationProperties.length)
            {
                return this.$options.filters.variationProperties(variationPropertyGroups, variationProperties, ["empty"], "displayInOrderProcess");
            }

            return [];
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

        itemTotalPrice()
        {
            let price = 0.00;

            if (!isNullOrUndefined(this.basketItem.variation.data.prices.specialOffer) && this.basketItem.price === this.basketItem.variation.data.prices.specialOffer.unitPrice.value)
            {
                price = this.basketItem.price;
            }
            else
            {
                price = this.basketItem.variation.data.prices.default.unitPrice.value;
            }
            return this.basketItem.quantity * (price + this.propertySurchargeSum);
        },

        unitPrice()
        {
            if (!isNullOrUndefined(this.basketItem.variation.data.prices.specialOffer) && this.basketItem.price === this.basketItem.variation.data.prices.specialOffer.unitPrice.value)
            {
                return this.basketItem.price;
            }

            return this.basketItem.variation.data.prices.default.unitPrice.value;
        },

        basePrice()
        {
            if (!isNullOrUndefined(this.basketItem.variation.data.prices.specialOffer) && this.basketItem.price === this.basketItem.variation.data.prices.specialOffer.unitPrice.value)
            {
                return this.basketItem.variation.data.prices.specialOffer.basePrice;
            }

            return this.basketItem.variation.data.prices.default.basePrice;
        },

        ...Vuex.mapState({
            isBasketLoading: state => state.basket.isBasketLoading
        })
    },

    created()
    {
        this.$options.template = this.template;
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

                this.$store.dispatch("updateBasketItemQuantity", { basketItem: this.basketItem, quantity: quantity }).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemQuantityUpdated", { detail: this.basketItem }));
                        this.waiting = false;
                    },
                    error =>
                    {
                        this.basketItem.quantity = origQty;

                        if (this.size === "small")
                        {
                            this.$store.dispatch(
                                "addBasketNotification",
                                {
                                    type: "error",
                                    message: TranslationService.translate(
                                        "Ceres::Template." + ExceptionMap.get(error.data.exceptionCode.toString())
                                    )
                                }
                            );
                        }
                        else
                        {
                            NotificationService.error(
                                TranslationService.translate(
                                    "Ceres::Template." + ExceptionMap.get(error.data.exceptionCode.toString())
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
