Vue.component("item-lazy-img", {

    delimiters: ["${", "}"],

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
                $(this.$refs.lazyImg).show().lazyload({threshold : 100});
            }, 1);
        });
    }
});
