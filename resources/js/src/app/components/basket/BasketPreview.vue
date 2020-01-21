<template>
    <div v-if="!hover" class="basket-preview w-100 h-100">
        <header class="basket-header p-3">
            <div class="d-inline-block basket-header-caption">{{ $translate("Ceres::Template.basketPreview") }}</div>
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
            <!-- BASKET LIST -->
            <div class="list col-sm-7 col-md-12 py-3">
                <div class="cmp cmp-basket-preview-list">
                    <basket-list :is-preview="true">
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
                </div>
            </div>
            <!-- ./BASKET LIST -->

            <!-- BASKET PREVIEW BOTTOM -->
            <div class="bg-light totals col-sm-5 col-md-12 pt-3">

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

                <div class="basket-preview-footer row">
                    <div class="col-6 col-sm-6 mb-3">
                        <a v-waiting-animation-infinite
                        :href="basketUrl"
                        rel="nofollow"
                        class="btn btn-outline-primary btn-block basketBtn"
                        :class="{ 'disabled': basketItems.length <= 0 }"
                        :title="$translate('Ceres::Template.basket')">
                            <i class="fa fa-shopping-cart d-sm-none d-md-inline-block"></i>
                            {{ $translate("Ceres::Template.basket") }}
                        </a>
                    </div>

                    <div class="col-6 col-sm-6">
                        <slot name="before-checkout-button"></slot>

                        <div>
                            <a v-waiting-animation-infinite
                            :href="checkoutUrl"
                            :class="{ 'disabled': basketItems.length <= 0 }"
                            class="btn btn-primary btn-block checkOutBtn"
                            rel="nofollow"
                            :title="$translate('Ceres::Template.basketCheckout')">
                                <i class="fa fa-arrow-right d-sm-none d-md-inline-block" aria-hidden="true"></i>
                                {{ $translate("Ceres::Template.basketCheckout") }}
                            </a>
                        </div>

                        <slot name="after-checkout-button"></slot>
                    </div>
                </div>
            </div>
            <!-- ./BASKET PREVIEW BOTTOM -->
        </div>
    </div>

    <div v-else class="basket-preview-hover-wrapper" :class="{ 'empty': !basketItems.length }">
        <div class="basket-preview-hover-wrapper-inner">
            <div class="basket-preview-hover" :class="{ 'empty': !basketItems.length }">

                <header class="basket-header mb-4 d-lg-none">
                    <div class="d-inline-block m-a-0 h3">{{ $translate("Ceres::Template.basketPreview") }}</div>
                    <button v-toggle-basket-preview type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </header>

                <basket-list class="item-list" v-if="basketItems.length" :is-preview="true">
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
                <div class="no-items" v-else>{{ $translate("Ceres::Template.basketNoItems") }}</div>

                <div class="basket-totals" v-if="basketItems.length">

                    <hr class="mb-4">

                    <div v-if="basketNotifications.length > 0">
                        <div class="w-100 alert alert-danger" v-for="notification in basketNotifications" :key="notification.id">
                            <div>{{ notification.message }}</div>
                        </div>
                    </div>

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

                    <div class="row">
                        <div class="col-6">
                            <a v-waiting-animation-infinite :href="basketUrl" rel="nofollow" class="btn btn-outline-primary btn-block basketBtn" :title="$translate('Ceres::Template.basket')">
                                <i class="fa fa-shopping-cart"></i>
                                {{ $translate("Ceres::Template.basket") }}
                            </a>
                        </div>

                        <div class="col-6">
                            <slot name="before-checkout-button"></slot>

                            <div>
                                <a v-waiting-animation-infinite :href="checkoutUrl" rel="nofollow" class="btn btn-primary btn-block checkOutBtn" :title="$translate('Ceres::Template.basketCheckout')">
                                    <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                    {{ $translate("Ceres::Template.basketCheckout") }}
                                </a>
                            </div>

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
        hover: Boolean
    },

    computed: {
        showShippingCountrySelect()
        {
            return App.config.basket.showShippingCountrySelect;
        },

        basketUrl()
        {
            return App.urls.basket;
        },

        checkoutUrl()
        {
            return App.urls.checkout;
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
