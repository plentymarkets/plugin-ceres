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
            basketItem: null
        };
    },

    mounted()
    {
        if (App.config.basket.addItemToBasketConfirm === "overlay")
        {
            ApiService.listen("AfterBasketItemAdd", data =>
            {
                this.showItem(data.basketItem);
            });

            ApiService.listen("AfterBasketItemUpdate", data =>
            {
                if (!this.isBasketItemQuantityUpdate)
                {
                    const basketItem = this.basketItems.find(item => item.id === data.basketItem.id) || {};

                    basketItem.quantity = data.basketItem.quantity;
                    basketItem.price = data.basketItem.price;
                    basketItem.price = data.basketItem.price;
                    basketItem.basketItemOrderParams = data.basketItem.basketItemOrderParams;
                    this.showItem(basketItem);
                }
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
        showItem(basketItem)
        {
            this.basketItem = basketItem;

            if (this.basketItem && this.variation.prices)
            {
                const graduatedPrice = this.$options.filters.graduatedPrice(this.variation, this.basketItem.quantity);
                const propertySurcharge = this.$options.filters.propertySurchargeSum(this.variation);

                this.price = this.$options.filters.specialOffer(graduatedPrice, this.variation.prices, "price", "value") + propertySurcharge;
            }

            ModalService
                .findModal(document.getElementById("add-item-to-basket-overlay"))
                .setTimeout(this.defaultTimeToClose * 1000)
                .show();
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
                return parseInt(param.property.id) === parseInt(propertyId);
            });

            const orderParamValue = orderParam.property.value;

            if (property.property.valueType === "selection" && orderParamValue)
            {
                return orderParam.property.selectionValues[orderParamValue].name;
            }

            return orderParamValue;
        }
    }
});
