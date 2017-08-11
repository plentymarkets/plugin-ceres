const ResourceService = require("services/ResourceService");

Vue.component("wish-list", {

    props: [
        "template",
        "initIds"
    ],

    data()
    {
        return {
            isLoading: false,
            wishListCount: {}
        };
    },

    computed: Vuex.mapState({
        wishListItems: state => state.wishList.wishListItems,
        wishListIds: state => state.wishList.wishListIds
    }),

    created()
    {
        this.$options.template = this.template;
        this.$store.dispatch("initWishListItems", this.initIds);
    },

    ready()
    {
        ResourceService.bind("wishListCount", this);
    },

    methods:
    {
        updateWatchListCount(count)
        {
            if (count >= 0)
            {
                ResourceService.getResource("wishListCount").set({count: count});
            }
        },

        ...Vuex.mapActions([
            "initWishListItems",
            "removeWishListItem"
        ])
    }
});
