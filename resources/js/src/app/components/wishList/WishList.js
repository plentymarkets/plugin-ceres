import Vue from "vue";
import { mapState, mapActions } from "vuex";
import WishListItem from "./WishListItem";

export default Vue.component("wish-list", {
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

    computed: mapState({
        wishListItems: state => state.wishList.wishListItems,
        isLoading: state => state.wishList.isLoading
    }),

    created()
    {
        this.initWishListItems();
    },

    methods:
    {
        ...mapActions([
            "initWishListItems"
        ])
    }
});
