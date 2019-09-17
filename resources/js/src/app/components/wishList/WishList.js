const NotificationService = require("../../services/NotificationService");

import TranslationService from "../../services/TranslationService";
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import WishListItem from "./WishListItem";

Vue.component("wish-list", {
    components:
    {
        WishListItem
    },

    props:
    {
        template:
        {
            type: String,
            default: "#vue-wish-list"
        },
        itemDetailsData:
        {
            type: Array,
            default: () => ["wishListItem.variation.availability"]
        }
    },

    data()
    {
        return {
            isLoading: false,
            wishListCount: {}
        };
    },

    computed: mapState({
        wishListItems: state => state.wishList.wishListItems,
        wishListIds: state => state.wishList.wishListIds
    }),

    created()
    {
        this.isLoading = true;
        this.initWishListItems()
            .finally(() =>
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
                    TranslationService.translate("Ceres::Template.wishListRemoved")
                ));
        },

        ...mapActions([
            "initWishListItems",
            "removeWishListItem"
        ])
    }
});
