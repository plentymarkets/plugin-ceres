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
        enableCarousel : {type: Boolean},
        template       : {type: String}
    },

    created: function()
    {
        this.$options.template = this.template;

        this.enableCarousel = this.enableCarousel && this.imageUrls.length > 1;
    },

    ready: function()
    {
        if (this.enableCarousel)
        {
            this.initializeCarousel();
        }
    },

    methods:
    {
        initializeCarousel: function()
        {
            $(".owl-carousel").owlCarousel({
                dots     : (this.showDots === "true"),
                items    : 1,
                mouseDrag: false,
                loop     : this.imageUrls.length > 1,
                lazyLoad : !this.disableLazyLoad,
                margin   : 10,
                nav      : (this.showNav === "true"),
                navText  : [
                    "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                    "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
                ],
                onTranslated: function(event)
                {
                    var target = $(event.currentTarget);

                    var owlItem = $(target.find(".owl-item.active"));

                    owlItem.find(".img-fluid.lazy").show().lazyload({threshold : 100});
                },
                onTranslate: function(event)
                {
                    console.log(event);
                }
            });
        }
    }
});
