Vue.component("item-lazy-img", {

    props: [
        "imageUrl",
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        var self = this;

        setTimeout(function()
        {
            $(self.$els.lazyImg).show().lazyload({threshold : 100});
        }, 1);
    }
});
