var ResourceService     = require("services/ResourceService");
var ModalService        = require("services/ModalService");

Vue.component("add-item-to-basket-overlay", {

    template: "#vue-add-item-to-basket-overlay",

    props: [
        "showOverlay"
    ],

    data: function()
    {
        return {
            basketItem: {currentBasketItem: { }},
            timeToClose: 5
        };
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

            return render;
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
    }
});
