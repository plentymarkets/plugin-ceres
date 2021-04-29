<template>
    <div>


        <div>
            <div v-if="!basketItems.length > 0">
                <div class="h5 py-3">{{ $translate("Ceres::Template.basketNoItems") }}</div>
            </div>
            <transition-group name="list-transition" tag="div">
                <template v-for="basketItem in basketItems">
                    <basket-list-item
                        :key="basketItem.id"
                        :basket-item="basketItem"
                        :is-preview="isPreview"
                        :basket-details-data="basketDetailsData"
                    >
                        <template #before-basket-item>
                            <slot name="before-basket-item"></slot>
                        </template>
                        <template #after-basket-item>
                            <slot name="after-basket-item"></slot>
                        </template>
                    </basket-list-item>
                </template>
            </transition-group>
        </div>

        <loading-animation v-if="!isBasketInitiallyLoaded" class="d-table w-100"></loading-animation>
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
