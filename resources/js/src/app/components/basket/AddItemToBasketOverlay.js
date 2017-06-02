const ResourceService     = require("services/ResourceService");
const ModalService        = require("services/ModalService");

Vue.component("add-item-to-basket-overlay", {

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

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        ResourceService.bind("basketItem", this);
    },

    watch: {
        basketItem()
        {
            if (this.basketAddInformation === "overlay")
            {
                ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).show();
            }
            else if (this.basketAddInformation === "preview" && Object.keys(this.basketItem.currentBasketItem).length != 0)
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
            const render = Object.keys(this.basketItem.currentBasketItem).length != 0;

            if (render)
            {
                this.startCounter();
            }

            this.setPriceFromData();

            return render;
        },

        setPriceFromData()
        {
            if (this.basketItem.currentBasketItem.calculatedPrices)
            {
                this.price = this.basketItem.currentBasketItem.calculatedPrices.default.price;
                this.currency = this.basketItem.currentBasketItem.calculatedPrices.default.currency;
            }
        },

        /**
         * @returns {string}
         */
        getImage()
        {
            let path = "";

            for (let i = 0; i < this.basketItem.currentBasketItem.variationImageList.length; i++)
            {
                if (this.basketItem.currentBasketItem.variationImageList[i].path !== "")
                {
                    path = this.basketItem.currentBasketItem.variationImageList[i].path;
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
    },

    computed:
    {
        /**
         * returns itemData.texts[0]
         */
        texts()
        {
            return this.basketItem.currentBasketItem.texts;
        },

        imageUrl()
        {
            const img = this.$options.filters.itemImages(this.basketItem.currentBasketItem.images, "urlPreview")[0];

            return img.url;
        }
    }
});
