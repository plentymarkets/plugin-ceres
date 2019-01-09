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
        },
        itemsPerPage:
        {
            type: Number,
            default: 4
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
            if (this.items.length > this.itemsPerPage)
            {
                this.initializeCarousel();
            }
        });
    },

    computed:
    {
        columnWidths()
        {
            let itemsPerPage = this.itemsPerPage;

            if (itemsPerPage < 1)
            {
                itemsPerPage = 1;
            }
            else if (itemsPerPage > 4)
            {
                itemsPerPage = 4;
            }

            return [
                "col-xs-12",
                itemsPerPage === 1 ? "col-sm-12" : "col-sm-6",
                "col-md-" + (12 / itemsPerPage)
            ];
        }
    },

    methods:
    {
        initializeCarousel()
        {
            $(this.$refs.carouselContainer).owlCarousel({
                autoHeight       : true,
                dots             : true,
                items            : this.itemsPerPage,
                responsive: {
                    0: {
                        items: 1
                    },
                    544: {
                        items: (this.itemsPerPage > 1) ? 2 : 1
                    },
                    768: {
                        items: (this.itemsPerPage > 3) ? 3 : this.itemsPerPage
                    }, 
                    992: {
                        items: this.itemsPerPage
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
