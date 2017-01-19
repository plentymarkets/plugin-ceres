var ApiService = require("services/ApiService");

Vue.component("coupon", {

    props: [
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        test: function()
        {
            ApiService.post("/rest/coupon", {couponCode: "RGCNXZ"})
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
