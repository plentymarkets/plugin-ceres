Vue.component("category-image-carousel", {

    props: [
        "imageUrls",
        "itemUrl",
        "altText",
        "showDots",
        "showNav",
        "disableLazyload",
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;

        this.disableLazyload = this.disableLazyload || false;
    },

    ready: function()
    {
        if (this.imageUrls && this.imageUrls.length > 0)
        {
            $(".owl-carousel").owlCarousel({
                dots     : (this.showDots === "true"),
                items    : 1,
                loop     : this.imageUrls.length > 1,
                lazyLoad : this.disableLazyload,
                margin   : 10,
                nav      : (this.showNav === "true"),
                navText  : [
                    "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                    "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
                ]
            });
        }
    }
});
