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
            isLoading: false
        };
    },

    computed: mapState({
        wishListItems: state => state.wishList.wishListItems
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
        ...mapActions([
            "initWishListItems"
        ])
    }
});
