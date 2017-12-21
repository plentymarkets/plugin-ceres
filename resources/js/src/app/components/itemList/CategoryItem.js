Vue.component("category-item", {

    delimiters: ["${", "}"],

    template: "#vue-category-item",

    props: [
        "decimalCount",
        "itemData",
        "imageUrlAccessor"
    ],

    data()
    {
        return {
            recommendedRetailPrice: 0,
            variationRetailPrice  : 0
        };
    },

    computed:
    {
        /**
         * returns itemData.item.storeSpecial
         */
        storeSpecial()
        {
            return this.itemData.item.storeSpecial;
        },

        /**
         * returns itemData.texts[0]
         */
        texts()
        {
            return this.itemData.texts;
        }
    },

    created()
    {
        this.recommendedRetailPrice = this.itemData.calculatedPrices.rrp.price;
        this.variationRetailPrice = this.itemData.calculatedPrices.default.price;
    },

    methods:
    {
        loadFirstImage()
        {
            const categoryImageCarousel = this.$refs.categoryImageCarousel;

            if (categoryImageCarousel)
            {
                categoryImageCarousel.loadFirstImage();
            }
        }
    }

});
