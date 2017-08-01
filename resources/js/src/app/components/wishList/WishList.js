Vue.component("wish-list", {

    props: [
        "template",
        "wishList"
    ],

    data: function()
    {
        return {
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods:
    {
    }
});
