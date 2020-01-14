<template>
    <div>
        <div>
            <div v-if="!basketItems.length > 0">
                <div class="h5">{{ $translate("Ceres::Template.basketNoItems") }}</div>
            </div>
            <transition-group name="wish-list-item-transition" tag="div">
                <template v-for="basketItem in basketItems">
                    <slot name="before-basket-item"></slot>
                    <basket-list-item
                        :key="basketItem.id"
                        :basket-item="basketItem"
                        :is-preview="isPreview"
                        :basket-details-data="basketDetailsData">
                    </basket-list-item>
                    <slot name="after-basket-item"></slot>
                </template>
            </transition-group>
        </div>

        <div v-if="!isBasketInitiallyLoaded" class="basket-loading-frame loading">
            <slot name="loading-animation"></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import BasketListItem from "./BasketListItem.vue";

export default {
    components:
    {
        BasketListItem
    },

    props:
    {
        template:
        {
            type: String,
            default: "#vue-basket-list"
        },
        basketDetailsData:
        {
            type: Array,
            default: () => []
        },
        isPreview:
        {
            type: Boolean,
            default: false
        }
    },

    computed: mapState({
        basketItems: state => state.basket.items,
        isBasketInitiallyLoaded: state => state.basket.isBasketInitiallyLoaded
    })
}
</script>