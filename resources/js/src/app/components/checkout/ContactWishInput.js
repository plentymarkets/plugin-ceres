const ResourceService = require("services/ResourceService");

Vue.component("contact-wish-input", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            contactWish: ""
        };
    },

    created: function()
    {
        this.$options.template = this.template;
        ResourceService.bind("contactWish", this);
    }
});
