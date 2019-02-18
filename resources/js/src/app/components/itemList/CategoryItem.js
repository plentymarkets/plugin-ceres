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
        return {};
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
