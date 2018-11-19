Vue.component("live-shopping-item", {
    props: {
        template:
        {
            type: String,
            default: "#vue-live-shopping-item"
        },
        liveShoppingId:
        {
            type: Number,
            required: true,
            validator: value =>
            {
                return value % 1 === 0 && value >= 1 && value <= 10;
            }
        },
        displaySettings:
        {
            type: Object
        }
    },

    data()
    {
        return {
        };
    },

    computed:
    {
        currentOffer()
        {
            return this.liveShoppingOffers[this.liveShoppingId];
        },

        ...Vuex.mapState({
            liveShoppingOffers: state => state.liveShopping.liveShoppingOffers
        })
    },

    created()
    {
        this.$options.template = this.template;

        this.$store.dispatch("retrieveLiveShoppingOffer", this.liveShoppingId);
    },

    methods:
    {
    }
});
