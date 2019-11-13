import { isNullOrUndefined } from "../../helper/utils";
import Vue from "vue";
import { mapState } from "vuex";

const ModalService  = require("../../services/ModalService");
const ApiService    = require("../../services/ApiService");

Vue.component("add-item-to-basket-overlay", {

    delimiters: ["${", "}"],

    props: {
        template: {
            type: String,
            default: "#vue-add-item-to-basket-overlay"
        },
        defaultTimeToClose: {
            type: Number,
            default: 15
        }
    },

    data()
    {
        return {
            price: 0,
            basketItem: null,
            countAdditionalBasketItems: 0
        };
    },

    mounted()
    {
        if (App.config.basket.addItemToBasketConfirm === "overlay")
        {
            ApiService.listen("AfterBasketItemUpdate", data =>
            {
                const updatedBasketItem = data.basketItems[0];

                if (!this.isBasketItemQuantityUpdate)
                {
                    const basketItem = this.basketItems.find(item => item.id === updatedBasketItem.id) || {};

                    basketItem.quantity = updatedBasketItem.quantity;
                    basketItem.price = updatedBasketItem.price;
                    basketItem.basketItemOrderParams = updatedBasketItem.basketItemOrderParams;
                    this.showItem(basketItem);
                }
            });

            ApiService.listen("AfterBasketItemAdd", data =>
            {
                this.showItem(data.basketItems[0], data.basketItems.length - 1);
            });
        }
    },

    computed:
    {
        ...mapState({
            basketItems: state => state.basket.items,
            isBasketItemQuantityUpdate: state => state.basket.isBasketItemQuantityUpdate
        }),

        isLastBasketEntrySet()
        {
            return !isNullOrUndefined(this.basketItem);
        },

        variation()
        {
            return this.basketItem.variation ? this.basketItem.variation.data : null;
        },

        itemName()
        {
            if (this.isLastBasketEntrySet)
            {
                return this.$options.filters.itemName(this.variation);
            }

            return "";
        },

        imageUrl()
        {
            if (this.isLastBasketEntrySet)
            {
                const images = this.$options.filters.itemImages(this.variation.images, "urlPreview");

                return this.$options.filters.itemImage(images);
            }

            return "";
        },
        imageAlternativeText()
        {
            if (this.isLastBasketEntrySet)
            {
                const images = this.$options.filters.itemImages(this.variation.images, "urlPreview");

                return this.$options.filters.itemImageAlternativeText(images);
            }

            return "";
        }
    },

    methods:
    {
        showItem(basketItem, countAdditionalBasketItems)
        {
            this.basketItem = basketItem;

            if (this.basketItem && this.variation.prices)
            {
                const graduatedPrice = this.$options.filters.graduatedPrice(this.variation, this.basketItem.quantity);
                const propertySurcharge = this.$options.filters.propertySurchargeSum(this.variation);

                this.price = this.$options.filters.specialOffer(graduatedPrice, this.variation.prices, "price", "value") + propertySurcharge;
                this.countAdditionalBasketItems = countAdditionalBasketItems;
            }

            ModalService
                .findModal(document.getElementById("add-item-to-basket-overlay"))
                .setTimeout(this.defaultTimeToClose * 1000)
                .show();
        },

        orderParamName(propertyId)
        {
            if (isNullOrUndefined(this.basketItem.basketItemOrderParams))
            {
                return "";
            }

            const property = this.variation.properties.find(property =>
            {
                return parseInt(property.property.id) === parseInt(propertyId);
            });

            if (isNullOrUndefined(property) || !property.property.isOderProperty)
            {
                return "";
            }

            const orderParam = this.basketItem.basketItemOrderParams.find(param =>
            {
                return parseInt(param.propertyId) === parseInt(propertyId);
            });

            return orderParam.name;
        },

        orderParamValue(propertyId)
        {
            if (isNullOrUndefined(this.basketItem.basketItemOrderParams))
            {
                return "";
            }

            const property = this.variation.properties.find(property =>
            {
                return parseInt(property.property.id) === parseInt(propertyId);
            });

            if (isNullOrUndefined(property) || !property.property.isOderProperty)
            {
                return "";
            }

            const orderParam = this.basketItem.basketItemOrderParams.find(param =>
            {
                return parseInt(param.propertyId) === parseInt(propertyId);
            });

            if (isNullOrUndefined(orderParam))
            {
                return "";
            }

            const orderParamValue = orderParam.value;

            if (property.property.valueType === "selection" && orderParamValue)
            {
                return property.property.selectionValues[orderParamValue].name;
            }
            return orderParamValue;
        }
    }
});
