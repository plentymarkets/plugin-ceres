Vue.component("category-image-carousel", {

    delimiters: ["${", "}"],

    props: {
        imageUrlsData  : {type: Array},
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

    data()
    {
        return {
            $_enableCarousel: false
        };
    },

    computed:
    {
        imageUrls()
        {
            return this.imageUrlsData.sort((imageUrlA, imageUrlB) =>
            {
                if (imageUrlA.position > imageUrlB.position)
                {
                    return 1;
                }
                if (imageUrlA.position < imageUrlB.position)
                {
                    return -1;
                }

                return 0;
            });
        }
    },

    created: function()
    {
        this.$options.template = this.template;

        this.$_enableCarousel = this.enableCarousel && this.imageUrls.length > 1;
    },

    mounted: function()
    {
        this.$nextTick(() =>
        {
            if (this.$_enableCarousel)
            {
                this.initializeCarousel();
            }
        });
    },

    methods:
    {
        initializeCarousel: function()
        {
            $("#owl-carousel-" + this._uid).owlCarousel({
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
                }
            });
        },

        getAltText(image)
        {
            const altText = image && image.alternate ? image.alternate : this.altText;

            return altText;
        },

        loadFirstImage()
        {
            const itemLazyImage = this.$refs.itemLazyImage;

            if (itemLazyImage)
            {
                itemLazyImage.loadImage();
            }
        }
    }
});
