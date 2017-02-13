var ResourceService = require("services/ResourceService");

Vue.component("accept-gtc-check", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            isChecked: false,
            checkoutValidation: {gtc: {}}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
        ResourceService.bind("checkoutValidation", this);
        this.checkoutValidation.gtc.validate = this.validate;
    },

    methods:
    {
        validate: function()
        {
            this.checkoutValidation.gtc.showError = !this.isChecked;
        }
    },

    watch:
    {
        isChecked: function()
        {
            this.checkoutValidation.gtc.showError = false;
        }
    }
});
