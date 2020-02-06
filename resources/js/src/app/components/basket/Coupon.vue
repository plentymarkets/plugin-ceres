<template>
    <div class="cmp">
        <p v-if="isCheckoutReadonly && !!$translate('Ceres::Template.couponReadonlyInfoText')">
            {{ couponReadonlyInfoText }}
        </p>
        <div :class="{'input-group':true, 'component-loading':isCheckoutReadonly, 'isLoading':isCheckoutReadonly}">
            <input type="text" class="form-control" v-model="couponCode" :placeholder="$translate('Ceres::Template.couponEnterCoupon')" @keyup.enter="redeemCode()" :disabled="disabled || isCheckoutReadonly">
            <span class="input-group-btn">
                <button class="btn btn-medium btn-primary btn-appearance" type="button" @click="redeemCode()" :disabled="waiting || isCheckoutReadonly" v-if="!disabled">
                    <icon icon="gift" :loading="waiting"></icon>
                    {{ $translate("Ceres::Template.couponRedeem") }}
                </button>
                <button class="btn btn-medium btn-danger" type="button" @click="removeCode()" :disabled="waiting || isCheckoutReadonly" v-else>
                    <icon icon="trash" :loading="waiting"></icon>
                    {{ $translate("Ceres::Template.couponRemove") }}
                </button>
            </span>
        </div>
    </div>
</template>

<script>
const NotificationService = require("../../services/NotificationService");

import TranslationService from "../../services/TranslationService";
import { mapState } from "vuex";

export default {

    props: {
        template:
        {
            type: String,
            default: "#vue-coupon"
        }
    },

    data()
    {
        return {
            waiting: false,
            couponCode: ""
        };
    },

    watch:
    {
        redeemedCouponCode(val)
        {
            this.couponCode = val;
        }
    },

    computed:
    {
        disabled()
        {
            if (this.redeemedCouponCode)
            {
                return true;
            }

            return false;
        },

        ...mapState({
            redeemedCouponCode: state => state.basket.data.couponCode,
            isBasketLoading: state => state.basket.isBasketLoading,
            isCheckoutReadonly: state => state.checkout.readOnly
        })
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            if (this.redeemedCouponCode)
            {
                this.couponCode = this.redeemedCouponCode;
            }
        });
    },

    methods:
    {
        redeemCode()
        {
            // remove whitespaces
            this.couponCode = this.couponCode.replace(/\s/g, "");

            if (this.couponCode.length > 0)
            {
                this.waiting = true;

                this.$store.dispatch("redeemCouponCode", this.couponCode).then(
                    response =>
                    {
                        this.waiting = false;
                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.couponRedeemSuccess")
                        ).closeAfter(10000);
                    },
                    error =>
                    {
                        this.waiting = false;
                        NotificationService.error(this.getCouponRedemtionErrorMessage(error)).closeAfter(10000);
                    });
            }
            else
            {
                NotificationService.error(
                    TranslationService.translate("Ceres::Template.couponIsEmpty")
                ).closeAfter(10000);
            }
        },

        removeCode()
        {
            this.waiting = true;

            this.$store.dispatch("removeCouponCode", this.couponCode).then(
                response =>
                {
                    this.waiting = false;
                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.couponRemoveSuccess")
                    ).closeAfter(10000);
                },
                error =>
                {
                    this.waiting = false;
                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.couponRemoveFailure")
                    ).closeAfter(10000);
                });
        },

        getCouponRedemtionErrorMessage(error)
        {
            const errorMessageKeys = {
                18:     "couponMinOrderValueNotReached",
                51:     "couponnotUsableForSpecialOffer",
                70:     "couponAlreadyUsedOrInvalidCouponCode",
                78:     "couponCampaignExpired",
                126:    "couponNoMatchingItemInBasket",
                329:    "couponOnlySubscription",
                330:    "couponOnlySingleUsage",
                331:    "couponNoOpenAmount",
                332:    "couponExpired",
                334:    "couponOnlyForNewCustomers",
                335:    "couponOnlyForExistingCustomers",
                336:    "couponWrongCustomerGroup",
                337:    "couponWrongCustomerType",
                338:    "couponNoCustomerTypeProvided",
                339:    "couponNoCustomerTypeActivated",
                340:    "couponNoCustomerGroupActivated",
                341:    "couponCampaignNoWebstoreActivated",
                342:    "couponCampaignWrongWebstoreId",
                343:    "couponCampaignNoWebstoreIdGiven"
            };

            if (error && error.error && error.code && errorMessageKeys[error.code])
            {
                return TranslationService.translate("Ceres::Template." + errorMessageKeys[error.code]);
            }

            return TranslationService.translate("Ceres::Template.couponRedeemFailure");
        }
    }
}
</script>