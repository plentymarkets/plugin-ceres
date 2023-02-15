<template>
  <div class="basket-list-item py-3">
    <div class="basket-item component-loading with-icon d-flex">
      <div class="meta-container-wrapper">
        <div class="meta-container-wrapper-inner mb-2 ml-1">
          <div class="position-relative w-75">
            <div class="small">
              <strong>{{ $translate("Ceres::Template.wishListInactiveItemId")}}:</strong>
              <span>{{ wishListInactiveItem }}</span>
            </div>
            <div class="small">
              <strong>{{ $translate("Ceres::Template.wishListAvailability") }}:</strong>
              <span
                  class="badge badge-danger">{{ $translate("Ceres::Template.wishListInactiveItemAvailability")}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="basket-item-container-right w-25">
          <div class="btn btn-sm text-danger p-0 float-right" @click="removeInactiveItem()" data-testing="remove-wlist-item">
            {{ $translate("Ceres::Template.wishListDelete") }}
            <i v-waiting-animation-infinite class="fa fa-trash-o default-float" aria-hidden="true"></i>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "../../services/NotificationService";
import {mapState, mapActions} from "vuex";
import {isNullOrUndefined} from "../../helper/utils";

export default {

  name: "wish-list-inactive-item",

  props:
      {
        itemDetailsData:
            {
              type: Array,
              default: () => ["wishListItem.variation.availability"]
            },

        wishListInactiveItemRaw: Number,
      },

  data() {
    return {
      wishListItem: null,
      quantity: 1
    };
  },

  computed:
      {
        ...mapState({
          wishListItems: state => state.wishList.wishListItems,
          wishListIds: state => state.wishListIds
        })
      },

  created()
  {
    this.wishListInactiveItem = this.wishListInactiveItemRaw;
  },

  methods:
      {
        removeInactiveItem()
        {
          this.removeInactiveWishListItem({ id: this.wishListInactiveItem})
              .then(() => NotificationService.success(
                  this.$translate("Ceres::Template.wishListRemoved")
              ).closeAfter(3000));
        },

        ...mapActions([
          "removeInactiveWishListItem"
        ])
      }
}
</script>