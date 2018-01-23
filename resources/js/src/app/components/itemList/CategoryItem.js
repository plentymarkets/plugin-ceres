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
        if (this.itemData.prices.rrp)
        {
            this.recommendedRetailPrice = this.itemData.prices.rrp.price.value;
        }
        this.variationRetailPrice = this.itemData.prices.default.price.value;
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
