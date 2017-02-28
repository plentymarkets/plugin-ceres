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
                dots     : false,
                items    : 1,
                loop     : this.imageUrls.length > 1,
                lazyLoad : true,
                mouseDrag: false,
                margin   : 10,
                nav      : true,
                navText  : [
                    "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                    "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
                ]
            });
        }
    }
});
