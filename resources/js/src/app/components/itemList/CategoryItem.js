import Vue from "vue";
import { mapState } from "vuex";

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
            type: Object
        },
        disableCarouselOnMobile:
        {
            type: Boolean
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        }
    },

    jsonDataFields: [
        "itemDataRef"
    ],

    computed:
    {
        item()
        {
            return this.itemData || this.itemDataRef;
        },

        /**
         * returns itemData.item.storeSpecial
         */
        storeSpecial()
        {
            return this.item.item.storeSpecial;
        },

        /**
         * returns itemData.texts
         */
        texts()
        {
            return this.item.texts;
        },

        ...mapState({
            showNetPrices: state => state.basket.showNetPrices
        })
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
