Vue.component("category-item", {

    template: "#vue-category-item",

    props: [
        "itemData",
        "decimalCount"
    ],

    data: function()
    {
        return {
            recommendedRetailPrice: 0,
            variationRetailPrice  : 0
        };
    },

    created: function()
    {
        this.setPrices();
    },

    methods:
    {
        /**
         * set the properties recommendedRetailPrice and variationRetailPrice, based on instances' data
         */
        setPrices: function()
        {
            for (var i in this.itemData.salesPrices)
            {
                var priceData = this.itemData.salesPrices[i];

                if (priceData.type === "rrp")
                {
                    this.recommendedRetailPrice = priceData.price;
                }
                else if (priceData.type === "default")
                {
                    this.variationRetailPrice = priceData.price;
                }
            }
        }
    },

    computed:
    {
        /**
         * returns itemData.item.storeSpecial
         */
        storeSpecial: function()
        {
            return this.itemData.item.storeSpecial;
        },

        /**
         * returns path to build URL for SingleItem
         */
        itemPath: function()
        {
            return "/" + this.itemData.variation.itemId + "/" + this.itemData.variation.clientVariationId;
        }
    }
});
