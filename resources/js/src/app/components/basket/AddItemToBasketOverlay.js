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
            timeToClose: 5,
            price: 0
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

        /**
         * iterate through the basketItem prices and get the "default" typed price
         */
        setPriceFromData: function()
        {
            for (var i in this.basketItem.currentBasketItem.salesPrices)
            {
                var priceData = this.basketItem.currentBasketItem.salesPrices[i];

                if (priceData.type === "default")
                {
                    this.price = priceData.price;
                }
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
            this.timeToClose = 5;

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
            return this.basketItem.currentBasketItem.texts[0];
        }
    }
});
