Vue.component("item-image-carousel", {

    props: [
        "imageUrlAccessor",
        "template"
    ],

    data()
    {
        return {
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
                if (val !== oldVal)
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
    },

    ready()
    {
        this.initCarousel();
        this.initThumbCarousel();
    },

    methods:
    {
        getImageCount()
        {
            const images = this.currentVariation.documents[0].data.images;

            if (images.variation && images.variation.length)
            {
                return images.variation.length;
            }

            return images.all.length;

        },

        reInitialize()
        {
            const $owl = $(this.$els.single);

            $owl.trigger("destroy.owl.carousel");
            $owl.html($owl.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $owl.find(".owl-item").remove();

            const $thumbs = $(this.$els.thumbs);

            $thumbs.trigger("destroy.owl.carousel");
            $thumbs.html($thumbs.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $thumbs.find(".owl-item").remove();

            this.initCarousel();
            this.initThumbCarousel();
        },

        initCarousel()
        {
            const imageCount = this.getImageCount();

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
                onChanged: event =>
                {
                    const $thumb = $(this.$els.thumbs);

                    $thumb.trigger("to.owl.carousel", [
                        event.page.index,
                        350
                    ]);
                }
            });

            $(this.$els.single).on("changed.owl.carousel", event =>
            {
                this.currentItem = event.page.index;
            });
        },

        initThumbCarousel()
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

        goTo: index =>
        {
            const $owl = $(this.$els.single);

            $owl.trigger("to.owl.carousel", [
                index,
                350
            ]);
        }
    }
});
