Vue.component("category-item", {

    template: "#vue-category-item",

    props: [
        "decimalCount",
        "itemData"
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

    /**
     * initialize lazyload when current category-item is ready
     */
    ready: function()
    {
        $(this.$els.lazyImg).show().lazyload({
            effect : "fadeIn"
        });
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
