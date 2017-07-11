var ResourceService = require("services/ResourceService");

Vue.component("mobile-breadcrumbs", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            breadcrumbs: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("breadcrumbs", this);
    },

    methods:
    {
        navigateToHome()
        {
            $("#mainNavbarCollapsable").removeClass("open");
            $("body").removeClass("menu-is-visible");

            window.location.href = "/";
        }
    }
});
