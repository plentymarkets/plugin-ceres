const ModalService        = require("services/ModalService");

Vue.component("add-item-to-basket-overlay", {

    delimiters: ["${", "}"],

    props: [
        "basketAddInformation",
        "template"
    ],

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
                const img = this.$options.filters.itemImages(this.latestBasketEntry.item.images, "urlPreview")[0];

                return img ? img.url : "";
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

                this.price = graduatedPrice + propertySurcharge;
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

            this.timeToClose = 10;

            this.timerVar = setInterval(() =>
            {
                this.timeToClose -= 1;

                if (this.timeToClose === 0)
                {
                    ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).hide();

                    clearInterval(this.timerVar);
                }
            }, 1000);
        }
    }
});
