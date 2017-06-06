Vue.component("category-image-carousel", {

    props: {
        imageUrls      : {type: Array},
        itemUrl        : {type: String},
        altText        : {type: String},
        showDots       : {type: String},
        showNav        : {type: String},
        disableLazyLoad: {
            type   : Boolean,
            default: false
        },
        template       : {type: String}
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        if (this.imageUrls && this.imageUrls.length > 0)
        {
            $(".owl-carousel").owlCarousel({
                dots    : (this.showDots === "true"),
                items   : 1,
                loop    : this.imageUrls.length > 1,
                lazyLoad: !this.disableLazyLoad,
                margin  : 10,
                nav     : (this.showNav === "true"),
                navText : [
                    "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                    "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
                ]
            });
        }
    }
});
