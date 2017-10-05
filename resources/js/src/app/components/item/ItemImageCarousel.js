Vue.component("item-image-carousel", {

    props: [
        "imageUrlAccessor",
        "template"
    ],

    data()
    {
        return {
            init            : false,
            currentItem     : 0
        };
    },

    computed: Vuex.mapState({
        currentVariation: state => state.item.variation
    }),

    watch: {
        currentVariation: {
            handler(val, oldVal)
            {
                if (!this.init)
                {
                    $(window).load(() =>
                    {
                        this.initCarousel();
                        this.initThumbCarousel();

                        this.init = true;
                    });
                }

                else
                {
                    setTimeout(() =>
                    {
                        this.reInitialize();
                    }, 1);
                }
            },
            deep: true
        }
    },

    created()
    {
        this.$options.template = this.template;

        // ResourceService.watch("currentVariation", newValue =>
        // {
        //     this.currentVariation = newValue;

        //     if (!this.init)
        //     {
        //         $(window).load(() =>
        //         {
        //             this.initCarousel();
        //             this.initThumbCarousel();

        //             this.init = true;
        //         });
        //     }

        //     else
        //     {
        //         setTimeout(() =>
        //         {
        //             this.reInitialize();
        //         }, 1);
        //     }
        //
        // });
    },

    methods:
    {
        getImageCount()
        {
            var images = this.currentVariation.documents[0].data.images;

            if (images.variation && images.variation.length)
            {
                return images.variation.length;
            }

            return images.all.length;

        },

        reInitialize()
        {
            var $owl = $(this.$els.single);

            $owl.trigger("destroy.owl.carousel");
            $owl.html($owl.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $owl.find(".owl-item").remove();

            var $thumbs = $(this.$els.thumbs);

            $thumbs.trigger("destroy.owl.carousel");
            $thumbs.html($thumbs.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $thumbs.find(".owl-item").remove();

            this.initCarousel();
            this.initThumbCarousel();
        },

        initCarousel()
        {
            var imageCount = this.getImageCount();

            $(this.$els.single).owlCarousel({
                autoHeight       : true,
                dots             : true,
                items            : 1,
                lazyLoad         : true,
                loop             : true,
                margin           : 10,
                mouseDrag        : imageCount > 1,
                nav              : imageCount > 1,
                navClass         : [
                    "owl-single-item-nav left carousel-control",
                    "owl-single-item-nav right carousel-control"
                ],
                navContainerClass: "",
                navText          : [
                    "<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>",
                    "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"
                ],
                smartSpeed       : 350,
                onChanged: function(event)
                {
                    var $thumb = $(this.$els.thumbs);

                    $thumb.trigger("to.owl.carousel", [
                        event.page.index,
                        350
                    ]);
                }.bind(this)
            });

            $(this.$els.single).on("changed.owl.carousel", function(event)
            {
                this.currentItem = event.page.index;
            }.bind(this));
        },

        initThumbCarousel: function()
        {
            $(this.$els.thumbs).owlCarousel({
                autoHeight       : true,
                dots             : false,
                items            : 5,
                lazyLoad         : true,
                loop             : false,
                margin           : 10,
                mouseDrag        : false,
                center           : false,
                nav              : true,
                navClass         : [
                    "owl-single-item-nav left carousel-control",
                    "owl-single-item-nav right carousel-control"
                ],
                navContainerClass: "",
                navText          : [
                    "<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>",
                    "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"
                ],
                smartSpeed       : 350
            });
        },

        goTo: function(index)
        {
            var $owl = $(this.$els.single);

            $owl.trigger("to.owl.carousel", [
                index,
                350
            ]);
        }
    }
});
