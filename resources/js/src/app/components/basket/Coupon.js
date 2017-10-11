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
                    NotificationService.error(Translations.Template.couponRedeemFailure).closeAfter(10000);
                });
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
        }
    }
});
