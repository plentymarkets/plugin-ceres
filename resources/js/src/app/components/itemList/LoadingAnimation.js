var ResourceService = require("services/ResourceService");

Vue.component("loading-animation", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            itemSearch: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        ResourceService.bind("itemSearch", this);
    }
});
