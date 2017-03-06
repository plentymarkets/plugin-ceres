Vue.component("category-image-carousel", {

    props: [
        "imageUrls",
        "itemUrl",
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        if (this.imageUrls && this.imageUrls.length > 0)
        {
            $(".owl-carousel").owlCarousel({
                dots     : true,
                items    : 1,
                loop     : false,
                lazyLoad : true,
                margin   : 10,
                nav      : false
            });
        }
    }
});
