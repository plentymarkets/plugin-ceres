Vue.component("item-lazy-img", {

    delimiters: ["${", "}"],

    props: [
        "imageUrl",
        "template"
    ],

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            setTimeout(() =>
            {
                $(this.$refs.lazyImg).show().lazyload({threshold : 100});
            }, 1);
        });
    },

    methods:
    {
        loadImage()
        {
            $(this.$refs.lazyImg).trigger("appear");
        }
    }
});
