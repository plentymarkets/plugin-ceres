<template>
<!-- {% import "Ceres::PageDesign.Macros.LayoutContainer" as LayoutContainer %}
{{ component( "Ceres::Basket.Components.BasketShippingCountrySelect" ) }} -->
    <div class="basket-preview-wrapper" :class="{ 'empty': !basketItems.length, 'hover': hover }">
        <div class="basket-preview-wrapper-inner">
            <div class="basket-preview bg-white w-100">

                <header class="basket-preview-header border-bottom p-3">
                    <span class="h3">{{ $translate("Ceres::Template.basketPreview") }}</span>
                    <button v-toggle-basket-preview type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </header>

                <div v-if="basketNotifications.length > 0">
                    <div class="w-100 alert alert-danger" v-for="notification in basketNotifications" :key="notification.id">
                        <div>{{ notification.message }}</div>
                    </div>
                </div>

                <div class="basket-preview-content">
                    <basket-list class="item-list px-3" :is-preview="true">
                        <template #before-basket-item>
                            <slot name="before-basket-item"></slot>
                        </template>
                        <template #loading-animation>
                            <slot name="loading-animation"></slot>
                        </template>
                        <template #after-basket-item>
                            <slot name="after-basket-item"></slot>
                        </template>
                    </basket-list>

                    <div class="basket-preview-totals border-top px-3 pt-3" v-if="basketItems.length">

                        <shipping-country-select
                                v-if="showShippingCountrySelect"
                                :basket-select="true"
                                :open-basket-preview="true">
                        </shipping-country-select>
                        <hr>

                        <slot name="before-basket-totals"></slot>

                        <basket-totals>
                            <template #before-item-sum>
                                <slot name="before-item-sum"></slot>
                            </template>
                            <template #after-item-sum>
                                <slot name="after-item-sum"></slot>
                            </template>
                            <template #before-shipping-costs>
                                <slot name="before-shipping-costs"></slot>
                            </template>
                            <template #after-shipping-costs>
                                <slot name="after-shipping-costs"></slot>
                            </template>
                            <template #before-total-sum>
                                <slot name="before-total-sum"></slot>
                            </template>
                            <template #before-vat>
                                <slot name="before-vat"></slot>
                            </template>
                            <template #after-vat>
                                <slot name="after-vat"></slot>
                            </template>
                            <template #after-total-sum>
                                <slot name="after-total-sum"></slot>
                            </template>
                        </basket-totals>

                        <slot name="after-basket-totals"></slot>

                        <div class="basket-preview-footer d-flex pb-3">
                            <a v-waiting-animation-infinite :href="basketUrl" rel="nofollow" class="btn btn-outline-primary btn-block" :title="$translate('Ceres::Template.basket')">
                                <i class="fa fa-shopping-cart"></i>
                                {{ $translate("Ceres::Template.basket") }}
                            </a>

                            <slot name="before-checkout-button"></slot>
                            <a v-waiting-animation-infinite :href="checkoutUrl" rel="nofollow" class="btn btn-primary btn-block" :title="$translate('Ceres::Template.basketCheckout')">
                                <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                {{ $translate("Ceres::Template.basketCheckout") }}
                            </a>
                            <slot name="after-checkout-button"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from "../../services/ApiService";
import { mapState } from "vuex";

export default {

    props:
    {
        showNetPrices:
        {
            type: Boolean,
            default: false
        },
        checkoutUrl: String,
        basketUrl: String,
        hover: Boolean
    },

    computed: {
        showShippingCountrySelect()
        {
            return App.config.basket.showShippingCountrySelect;
        },
        ...mapState({
            basket: state => state.basket.data,
            basketItems: state => state.basket.items,
            basketNotifications: state => state.basket.basketNotifications,
            isBasketItemQuantityUpdate: state => state.basket.isBasketItemQuantityUpdate
        })    
    },

    created()
    {
        this.$store.dispatch("loadBasketData");
        this.$store.commit("setShowNetPrices", this.showNetPrices);
    },

    /**
     * Bind to basket and bind the basket items
     */
    mounted()
    {
        this.$nextTick(() =>
        {
            ApiService.listen("AfterBasketChanged",
                data =>
                {
                    this.$store.commit("setBasket", data.basket);
                    this.$store.commit("setShowNetPrices", data.showNetPrices);
                    this.$store.commit("setWishListIds", data.basket.itemWishListIds);
                });
        });

        if (App.config.basket.addItemToBasketConfirm === "preview")
        {
            ApiService.listen("AfterBasketItemAdd", data =>
            {
                this.show();
            });

            ApiService.listen("AfterBasketItemUpdate", data =>
            {
                if (!this.isBasketItemQuantityUpdate)
                {
                    this.show();
                }
            });
        }
    },

    methods:
    {
        show()
        {
            setTimeout(function()
            {
                const vueApp = document.querySelector("#vue-app");
                const basketOpenClass = (App.config.basket.previewType === "right") ? "open-right" : "open-hover";

                if (vueApp)
                {
                    vueApp.classList.add(basketOpenClass);
                }
            }, 1);
        }
    }
}
</script>