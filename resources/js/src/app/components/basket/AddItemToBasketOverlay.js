var ResourceService     = require("services/ResourceService");
var ModalService        = require("services/ModalService");

Vue.component("add-item-to-basket-overlay", {

    props: [
        "showOverlay",
        "template"
    ],

    data: function()
    {
        return {
            basketItem: {currentBasketItem: { }},
            timeToClose: 0,
            price: 0,
            currency: ""
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        ResourceService.bind("basketItem", this);
    },

    watch: {
        basketItem: function()
        {
            if (this.showOverlay)
            {
                ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).show();
            }
        }
    },

    methods: {

        /**
         * check if current basket object exist and start rendering
         */
        startRendering: function()
        {
            var render = Object.keys(this.basketItem.currentBasketItem).length != 0;

            if (render)
            {
                this.startCounter();
            }

            this.setPriceFromData();

            return render;
        },

        setPriceFromData: function()
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
        getImage: function()
        {
            var path = "";

            for (var i = 0; i < this.basketItem.currentBasketItem.variationImageList.length; i++)
            {
                if (this.basketItem.currentBasketItem.variationImageList[i].path !== "")
                {
                    path = this.basketItem.currentBasketItem.variationImageList[i].path;
                }
            }

            return "/" + path;
        },

        startCounter: function()
        {
            this.timeToClose = 10;

            var timerVar = setInterval(countTimer, 1000);

            var self = this;

            function countTimer()
            {
                self.timeToClose -= 1;

                if (self.timeToClose === 0)
                {
                    ModalService.findModal(document.getElementById("add-item-to-basket-overlay")).hide();

                    clearInterval(timerVar);
                }
            }
        }
    },

    computed:
    {
        /**
         * returns itemData.texts[0]
         */
        texts: function()
        {
            return this.basketItem.currentBasketItem.texts;
        },

        imageUrl: function()
        {
            var img = this.$options.filters.itemImages(this.basketItem.currentBasketItem.images, "urlPreview")[0];

            return img.url;
        }
    }
});
