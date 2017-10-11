const NotificationService = require("services/NotificationService");

Vue.component("wish-list", {

    props: [
        "template"
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

        this.isLoading = true;
        this.initWishListItems(this.wishListIds).then(
            response =>
            {
                this.isLoading = false;
            },
            error =>
            {
                this.isLoading = false;
            });
    },

    methods:
    {
        removeItem(item)
        {
            this.removeWishListItem(item)
                .then(() => NotificationService.success(Translations.Template.itemWishListRemoved));
        },
        ...Vuex.mapActions([
            "initWishListItems",
            "removeWishListItem"
        ])
    }
});
