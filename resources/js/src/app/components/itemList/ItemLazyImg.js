Vue.component("item-lazy-img", {

    props: [
        "imageUrl",
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    mounted: function()
    {
        this.$nextTick(() =>
        {
            setTimeout(() =>
            {
                $(this.$els.lazyImg).show().lazyload({threshold : 100});
            }, 1);
        });
    }
});
