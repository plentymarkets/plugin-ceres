var ResourceService     = require("services/ResourceService");
var ModalService        = require("services/ModalService");

Vue.component("add-item-to-basket", {

    props: [
        "item",
        "baseUrl",
        "quantity",
        "showQuantity",
        "showOverlay"
    ],

    template: "#vue-add-item-to-basket",

    methods: {

        addToBasket: function()
        {
            var basketObject = {variationId: this.item.variationBase.id, quantity: this.quantity};

            ResourceService
                .getResource("basketItems")
                .push(basketObject);

            if (this.showOverlay)
            {
                ModalService.findModal(this.$els.addItemConfirm).show();
            }
        },

        updateQuantity: function(value)
        {
            this.quantity = value;
        },

        /**
         * TODO
         * @returns {string}
         */
        getImage: function()
        {
            var path = "";

            for (var i = 0; i < this.item.variationImageList.length; i++)
            {
                if (this.item.variationImageList[i].path !== "")
                {
                    path = this.item.variationImageList[i].path;
                }
            }
            return this.baseUrl + "/" + path;
        }

    }
});
