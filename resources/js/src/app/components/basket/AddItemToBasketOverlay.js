import {isNullOrUndefined}from "../../helper/utils";

const ModalService        = require("services/ModalService");

Vue.component("add-item-to-basket-overlay", {

    delimiters: ["${", "}"],

    props: {
        basketAddInformation: String,
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
            currency: "",
            price: 0,
            timeToClose: 0,
            timerVar: null
        };
    },

    computed:
    {
        isLastBasketEntrySet()
        {
            return Object.keys(this.latestBasketEntry.item).length !== 0;
        },

        itemName()
        {
            if (this.isLastBasketEntrySet)
            {
                return this.$options.filters.itemName(this.latestBasketEntry.item);
            }

            return "";
        },

        imageUrl()
        {
            if (this.isLastBasketEntrySet)
            {
                const images = this.$options.filters.itemImages(this.latestBasketEntry.item.images, "urlPreview");
                const img = this.$options.filters.itemImage(images);

                return img;
            }

            return "";
        },
        imageAlternativeText()
        {
            if (this.isLastBasketEntrySet)
            {
                const images = this.$options.filters.itemImages(this.latestBasketEntry.item.images, "urlPreview");

                return this.$options.filters.itemImageAlternativeText(images);
            }

            return "";
        },

        ...Vuex.mapState({
            latestBasketEntry: state => state.basket.latestEntry
        })
    },

    created()
    {
        this.$options.template = this.template;
    },

    watch:
    {
        latestBasketEntry()
        {
            if (this.basketAddInformation === "overlay")
            {
                this.setPriceFromData();

                ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).show();

                this.startCounter();
            }
            else if (this.basketAddInformation === "preview" && Object.keys(this.latestBasketEntry.item).length !== 0)
            {
                setTimeout(function()
                {
                    const vueApp = document.querySelector("#vue-app");
                    const basketOpenClass = (App.config.basket.previewType === "right") ? "open-right" : "open-hover";

                    if (vueApp)
                    {
                        vueApp.classList.add(basketOpenClass);
                    }
                }, 1);
            }
        }
    },

    methods:
    {
        setPriceFromData()
        {
            if (this.latestBasketEntry.item.prices)
            {
                this.currency = this.latestBasketEntry.item.prices.default.currency;
                const graduatedPrice = this.$options.filters.graduatedPrice(this.latestBasketEntry.item, this.latestBasketEntry.quantity);
                const propertySurcharge = this.$options.filters.propertySurchargeSum(this.latestBasketEntry.item);

                this.price = this.$options.filters.specialOffer(graduatedPrice, this.latestBasketEntry.item.prices, "price", "value") + propertySurcharge;
            }
        },

        closeOverlay()
        {
            if (this.timerVar)
            {
                clearInterval(this.timerVar);
            }
        },

        startCounter()
        {
            if (this.timerVar)
            {
                clearInterval(this.timerVar);
            }

            this.timeToClose = this.defaultTimeToClose;

            this.timerVar = setInterval(() =>
            {
                this.timeToClose -= 1;

                if (this.timeToClose === 0)
                {
                    ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).hide();

                    clearInterval(this.timerVar);
                }
            }, 1000);
        },

        orderParamValue(propertyId)
        {
            const orderParams = this.latestBasketEntry.orderParams;

            if (isNullOrUndefined(orderParams))
            {
                return "";
            }

            const orderParam = orderParams.find(param =>
            {
                return parseInt(param.property.id) === parseInt(propertyId);
            });

            return orderParam.property.value;
        }
    }
});
