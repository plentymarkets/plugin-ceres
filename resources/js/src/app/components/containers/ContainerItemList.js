Vue.component("container-item-list", {

    delimiters: ["${", "}"],

    props:
    {
        template:
        {
            type: String,
            default: "#vue-container-item-list"
        },
        items:
        {
            type: Array,
            default: []
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
            if (this.items.length > 4)
            {
                this.initializeCarousel();
            }
        });
    },

    methods:
    {
        initializeCarousel()
        {
            $(this.$refs.carouselContainer).owlCarousel({
                autoHeight       : true,
                dots             : true,
                items            : 4,
                responsive: {
                    0: {
                        items: 1
                    },
                    544: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    1000: {
                        items: 4
                    }
                },
                lazyLoad         : false,
                loop             : false,
                margin           : 30,
                mouseDrag        : true,
                nav              : true,
                navClass         : [
                    "owl-single-item-nav left carousel-control list-control-special",
                    "owl-single-item-nav right carousel-control list-control-special"
                ],
                navContainerClass: "",
                navText          : [
                    "<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>",
                    "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"
                ],
                smartSpeed       : 350,
                onChanged: property =>
                {
                    const begin = property.item.index;
                    const end = begin + property.page.size;

                    for (let i = begin; i < end; i++)
                    {
                        const categoryItem = this.$refs["categoryItem_" + i];

                        if (categoryItem)
                        {
                            categoryItem[0].loadFirstImage();
                        }
                    }
                }
            });
        }
    }
});
