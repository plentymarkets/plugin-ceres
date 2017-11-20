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

    created()
    {
        this.recommendedRetailPrice = this.itemData.calculatedPrices.rrp.price;
        this.variationRetailPrice = this.itemData.calculatedPrices.default.price;
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
    }
});
