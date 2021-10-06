<template>
    <div>
        <transition-group name="list-transition" tag="div">
            <wish-list-item
                v-for="wishListItem in wishListItems"
                :key="wishListItem.id"
                :wish-list-item-raw="wishListItem"
                :item-details-data="itemDetailsData">
            </wish-list-item>
        </transition-group>

        <p class="h4 text-muted text-center my-5" v-if="!isLoading && (!wishListItems || wishListItems.length === 0)">{{ $translate("Ceres::Template.wishListNoItems") }}</p>
        <loading-animation v-if="isLoading"></loading-animation>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WishListItem from "./WishListItem.vue";

export default {

    name: "wish-list",

    components:
    {
        WishListItem
    },

    props:
    {
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

    mounted()
    {
        this.initWishListItems();
    },

    methods:
    {
        ...mapActions([
            "initWishListItems"
        ])
    }
}
</script>