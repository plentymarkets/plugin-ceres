const NotificationService = require("services/NotificationService");

import TranslationService from "services/TranslationService";

Vue.component("wish-list", {

    delimiters: ["${", "}"],

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
        this.$store.commit("setWishListIds", this.initIds);
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
                .then(() => NotificationService.success(
                    TranslationService.translate("Ceres::Template.itemWishListRemoved")
                ));
        },
        ...Vuex.mapActions([
            "initWishListItems",
            "removeWishListItem"
        ])
    }
});
