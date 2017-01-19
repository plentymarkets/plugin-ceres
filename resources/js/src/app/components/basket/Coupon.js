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
            basket: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
        ResourceService.bind("basket", this);
    },

    methods:
    {
        redeemCode: function()
        {
            ApiService.post("/rest/io/coupon", {couponCode: this.couponCode})
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
            ApiService.delete("/rest/io/coupon/" + this.basket.couponCode)
                .done(function(response)
                {
                    console.log("Success response:", response);
                })
                .fail(function(response)
                {
                    console.log("Fail response:", response);
                });
        }
    }
});
