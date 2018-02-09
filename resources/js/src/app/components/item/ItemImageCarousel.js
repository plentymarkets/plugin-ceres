Vue.component("item-image-carousel", {

    delimiters: ["${", "}"],

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

    computed:
    {
        carouselImages()
        {
            return this.orderByPosition(this.$options.filters.itemImages(this.currentVariation.documents[0].data.images, "urlPreview"));
        },

        singleImages()
        {
            return this.orderByPosition(this.$options.filters.itemImages(this.currentVariation.documents[0].data.images, this.imageUrlAccessor));
        },

        ...Vuex.mapState({
            currentVariation: state => state.item.variation
        })
    },

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

    mounted()
    {
        this.$nextTick(() =>
        {
            this.initCarousel();
            this.initThumbCarousel();
        });
    },

    methods:
    {
        getImageCount()
        {
            return this.carouselImages.length;
        },

        reInitialize()
        {
            const $owl = $(this.$refs.single);

            $owl.trigger("destroy.owl.carousel");
            $owl.html($owl.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $owl.find(".owl-item").remove();

            const $thumbs = $(this.$refs.thumbs);

            $thumbs.trigger("destroy.owl.carousel");
            $thumbs.html($thumbs.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $thumbs.find(".owl-item").remove();

            this.initCarousel();
            this.initThumbCarousel();
        },

        initCarousel()
        {
            const imageCount = this.getImageCount();

            $(this.$refs.single).owlCarousel({
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
                    const $thumb = $(this.$refs.thumbs);

                    $thumb.trigger("to.owl.carousel", [
                        event.page.index,
                        350
                    ]);
                }
            });

            $(this.$refs.single).on("changed.owl.carousel", event =>
            {
                this.currentItem = event.page.index;
            });
        },

        initThumbCarousel()
        {
            $(this.$refs.thumbs).owlCarousel({
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

        goTo(index)
        {
            const $owl = $(this.$refs.single);

            $owl.trigger("to.owl.carousel", [
                index,
                350
            ]);
        },

        orderByPosition(list)
        {
            return list.sort(
                (entryA, entryB) =>
                {
                    if (entryA.position > entryB.position)
                    {
                        return 1;
                    }
                    if (entryA.position < entryB.position)
                    {
                        return -1;
                    }

                    return 0;
                });
        },

        getAltText(image)
        {
            const altText = image && image.alternate ? image.alternate : this.$options.filters.itemName(this.currentVariation.documents[0].data);

            return altText;
        }
    }
});
