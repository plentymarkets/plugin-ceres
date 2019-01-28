Vue.component("category-item", {
    props:
    {
        template:
        {
            type: String,
            default: "#vue-category-item"
        },
        decimalCount:
        {
            type: Number,
            default: 0
        },
        imageUrlAccessor:
        {
            type: String,
            default: "urlMiddle"
        },
        itemData:
        {
            type: Object,
            required: true
        },
        disableCarouselOnMobile:
        {
            type: Boolean
        }
    },

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
         * returns itemData.texts
         */
        texts()
        {
            return this.itemData.texts;
        },

        ...Vuex.mapState({
            showNetPrices: state => state.basket.showNetPrices
        })
    },

    created()
    {
        this.$options.template = this.template;

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
