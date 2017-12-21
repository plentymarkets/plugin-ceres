const NotificationService = require("services/NotificationService");

Vue.component("coupon", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    data()
    {
        return {
            waiting: false,
            couponCode: ""
        };
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

        ...Vuex.mapState({
            redeemedCouponCode: state => state.basket.data.couponCode
        })
    },

    created()
    {
        this.$options.template = this.template;
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
                        NotificationService.success(Translations.Template.couponRedeemSuccess).closeAfter(10000);
                    },
                    error =>
                    {
                        this.waiting = false;
                        NotificationService.error(this.getCouponRedemtionErrorMessage(error)).closeAfter(10000);
                    });
            }
            else
            {
                NotificationService.error(Translations.Template.couponIsEmpty).closeAfter(10000);
            }
        },

        removeCode()
        {
            this.waiting = true;

            this.$store.dispatch("removeCouponCode", this.couponCode).then(
                response =>
                {
                    this.waiting = false;
                    NotificationService.success(Translations.Template.couponRemoveSuccess).closeAfter(10000);
                },
                error =>
                {
                    this.waiting = false;
                    NotificationService.error(Translations.Template.couponRemoveFailure).closeAfter(10000);
                });
        },

        getCouponRedemtionErrorMessage(error)
        {
            const errorMessageKeys = {
                18:     "couponminOrderValueNotReached",
                51:     "couponnotUsableForSpecialOffer",
                70:     "couponalreadyUsedOrInvalidCouponCode",
                78:     "couponcampaignExpired",
                126:    "couponnoMatchingItemInBasket",
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

            if (error && error.error && error.error.code && errorMessageKeys[error.error.code])
            {
                return Translations.Template[errorMessageKeys[error.error.code]];
            }

            return Translations.Template.couponRedeemFailure;
        }
    }
});
