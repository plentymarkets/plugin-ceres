var ResourceService = require("services/ResourceService");

Vue.component("loading-animation", {

    template: "#vue-loading-animation",

    data: function()
    {
        return {
            itemSearch: {}
        };
    },

    ready: function()
    {
        ResourceService.bind("itemSearch", this);
    }
});
