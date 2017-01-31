var ApiService = require("services/ApiService");
var ResourceService = require("services/ResourceService");

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
                    console.log("Success response:", response);
                })
                .fail(function(response)
                {
                    console.log("Fail response:", response);
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
                    console.log("Success response:", response);
                })
                .fail(function(response)
                {
                    console.log("Fail response:", response);
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
