Vue.component("category-item", {

    template: "#vue-category-item",

    props: [
        "decimalCount",
        "itemData",
        "imageUrlAccessor"
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
         * returns itemData.texts[0]
         */
        texts: function()
        {
            return this.itemData.texts[0];
        },

        /**
         * returns all urlPreviews in an array
         */
        imageUrls: function()
        {
            var urls = [];

            for (var i in this.itemData.images.all)
            {
                var imgInformation = this.itemData.images.all[i];

                urls.push(imgInformation.urlMiddle);
            }

            return urls;
        }
    }
});
