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
    <div class="mt-5 mb-0">
      <p class="h4" v-if="inactiveVariationIds.length !== 0">{{ $translate("Ceres::Template.wishListInactiveItems") }}</p>
    </div>
    <transition-group name="list-transition" tag="div">
      <wish-list-inactive-item
          v-for="wishListInactiveItem in inactiveVariationIds"
          :key="wishListInactiveItem"
          :wish-list-inactive-item-raw="wishListInactiveItem"
          :item-details-data="itemDetailsData">
      </wish-list-inactive-item>
    </transition-group>
    <p class="h4 text-muted text-center my-5" v-if="!isLoading && (!wishListItems || wishListItems.length === 0) || inactiveVariationIds.length !== 0">{{ $translate("Ceres::Template.wishListNoItems") }}</p>
    <loading-animation v-if="isLoading"></loading-animation>

    <div v-if="wishListItems && wishListItems.length" class="vat small text-muted">
      {{ $translate("Ceres::Template.itemFootnote") }} <span v-if="showNetPrices">{{ $translate("Ceres::Template.itemExclVAT") }}</span>
      <span v-else>{{ $translate("Ceres::Template.itemInclVAT") }}</span>
      {{ $translate("Ceres::Template.itemExclusive") }}
      <a v-if="$ceres.config.global.shippingCostsCategoryId > 0" data-toggle="modal" href="#shippingscosts" class="text-appearance" :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
      <a v-else :title="$translate('Ceres::Template.itemShippingCosts')">{{ $translate("Ceres::Template.itemShippingCosts") }}</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WishListItem from "./WishListItem.vue";
import WishListInactiveItem from "./WishListInactiveItem.vue";

export default {

  name: "wish-list",

  components:
      {
        WishListItem,
        WishListInactiveItem
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
    isLoading: state => state.wishList.isLoading,
    wishListIds: state => state.wishList.wishListIds,
    inactiveVariationIds: state => state.wishList.inactiveVariationIds,
    showNetPrices: state => state.basket.showNetPrices
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
