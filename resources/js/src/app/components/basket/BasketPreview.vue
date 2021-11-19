<template>
    <div class="basket-preview-wrapper h-100" :class="{ 'empty': !basketItems.length, 'open-hover': hover, 'open-right': !hover }">
        <div class="position-relative h-100">
            <div class="basket-preview d-flex flex-column flex-nowrap bg-white shadow w-100">

                <header class="basket-preview-header border-bottom p-3">
                    <span class="h3 mb-0">{{ $translate("Ceres::Template.basketPreview") }}</span>
                    <button v-toggle-basket-preview type="button" class="close" :aria-label="$translate('Ceres::Template.closeIcon')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </header>

                <div v-if="basketNotifications.length > 0">
                    <div class="w-100 alert alert-danger" v-for="notification in basketNotifications" :key="notification.id">
                        <div>{{ notification.message }}</div>
                    </div>
                </div>

                <div class="basket-preview-content d-flex flex-fill">
                    <basket-list class="item-list d-flex flex-fill flex-nowrap flex-column overflow-auto px-3" :is-preview="true">
                        <template #before-basket-item>
                            <slot name="before-basket-item"></slot>
                        </template>
                        <template #after-basket-item>
                            <slot name="after-basket-item"></slot>
                        </template>
                    </basket-list>

                    <div class="totals d-flex flex-nowrap flex-column px-3 pt-3">

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
                            <a v-waiting-animation-infinite :href="$ceres.urls.basket" rel="nofollow" class="btn btn-outline-primary btn-block" :title="$translate('Ceres::Template.basket')">
                                <i class="fa fa-shopping-cart"></i>
                                {{ $translate("Ceres::Template.basket") }}
                            </a>

                            <slot name="before-checkout-button"></slot>
                            <a v-waiting-animation-infinite :href="$ceres.urls.checkout" rel="nofollow" class="btn btn-primary btn-block" :title="$translate('Ceres::Template.basketCheckout')">
                                <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                {{ $translate("Ceres::Template.basketCheckout") }}
                            </a>
                            <slot name="after-checkout-button"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="basket-preview-overlay" v-toggle-basket-preview></div>
    </div>
</template>

<script>
import ApiService from "../../services/ApiService";
import { mapState } from "vuex";

export default {
    name: "basket-preview",

    props:
    {
        showNetPrices:
        {
            type: Boolean,
            default: false
        }
    },

    computed: {
        hover()
        {
            return App.config.basket.previewType === 'hover';
        },

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

    /**
     * Bind to basket and bind the basket items
     */
    mounted()
    {
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
                document.body.classList.add("basket-open");
            }, 1);
        }
    }
}
</script>
