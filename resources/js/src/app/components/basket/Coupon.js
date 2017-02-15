var ApiService = require("services/ApiService");
var ResourceService = require("services/ResourceService");
var NotificationService = require("services/NotificationService");

Vue.component("coupon", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            couponCode: "",
            basket: {},
            waiting: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
        ResourceService.bind("basket", this);
    },

    ready: function()
    {
        if (this.disabled)
        {
            this.couponCode = this.basket.couponCode;
        }
    },

    methods:
    {
        redeemCode: function()
        {
            this.waiting = true;
            var self = this;

            ApiService.post("/rest/io/coupon", {couponCode: this.couponCode})
                .always(function()
                {
                    self.waiting = false;
                })
                .done(function(response)
                {
                    NotificationService.success(Translations.Template.couponRedeemSuccess).closeAfter(10000);
                })
                .fail(function(response)
                {
                    NotificationService.error(Translations.Template.couponRedeemFailure).closeAfter(10000);
                });
        },

        removeCode: function()
        {
            this.waiting = true;
            var self = this;

            ApiService.delete("/rest/io/coupon/" + this.basket.couponCode)
                .always(function()
                {
                    self.waiting = false;
                })
                .done(function(response)
                {
                    self.couponCode = "";
                    NotificationService.success(Translations.Template.couponRemoveSuccess).closeAfter(10000);
                })
                .fail(function(response)
                {
                    NotificationService.error(Translations.Template.couponRemoveFailure).closeAfter(10000);
                });
        }
    },

    computed:
    {
        disabled: function()
        {
            if (this.basket.couponCode)
            {
                return true;
            }

            return false;
        }
    }
});
