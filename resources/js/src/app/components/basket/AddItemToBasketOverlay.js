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
            basketItem: {currentBasketItem: { }},
            timeToClose: 0,
            price: 0,
            currency: ""
        };
    },

    computed:
    {
        texts()
        {
            return this.latestBasketEntry.item.texts;
        },

        imageUrl()
        {
            const img = this.$options.filters.itemImages(this.latestBasketEntry.item.images, "urlPreview")[0];

            return img.url;
        },

        ...Vuex.mapState({
            latestBasketEntry: state => state.basket.latestEntry
        })
    },

    created()
    {
        this.$options.template = this.template;
    },

    watch: {
        latestBasketEntry()
        {
            if (this.basketAddInformation === "overlay")
            {
                ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).show();
            }
            else if (this.basketAddInformation === "preview" && Object.keys(this.latestBasketEntry.item).length != 0)
            {
                setTimeout(function()
                {
                    $("body").toggleClass("open-right");
                }, 1);
            }
        }
    },

    methods: {

        /**
         * check if current basket object exist and start rendering
         */
        startRendering()
        {
            const render = Object.keys(this.latestBasketEntry.item).length !== 0;

            if (render)
            {
                this.startCounter();
            }

            this.setPriceFromData();

            return render;
        },

        setPriceFromData()
        {
            if (this.latestBasketEntry.item.calculatedPrices)
            {
                this.price = this.latestBasketEntry.item.calculatedPrices.default.price + this.calculateSurcharge();
                this.currency = this.latestBasketEntry.item.calculatedPrices.default.currency;
            }
        },

        calculateSurcharge()
        {

            let sumSurcharge = 0;

            for (const property of this.latestBasketEntry.item.properties)
            {

                if (property.property.value && property.property.value.length > 0)
                {
                    if (property.surcharge > 0)
                    {
                        sumSurcharge += property.surcharge;
                    }
                    else if (property.property.surcharge > 0)
                    {
                        sumSurcharge += property.property.surcharge;
                    }
                }
            }

            return sumSurcharge;
        },

        /**
         * @returns {string}
         */
        getImage()
        {
            let path = "";

            for (let i = 0; i < this.latestBasketEntry.item.variationImageList.length; i++)
            {
                if (this.latestBasketEntry.item.variationImageList[i].path !== "")
                {
                    path = this.latestBasketEntry.item.variationImageList[i].path;
                }
            }

            return "/" + path;
        },

        startCounter()
        {
            this.timeToClose = 10;

            const timerVar = setInterval(() =>
            {
                this.timeToClose -= 1;

                if (this.timeToClose === 0)
                {
                    ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).hide();

                    clearInterval(timerVar);
                }
            }, 1000);
        }
    }
});
