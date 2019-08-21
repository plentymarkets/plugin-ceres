import Vue from "vue";
import "owl.carousel";

Vue.component("carousel", {

    components:
    {
        SlotComponent:
        {
            functional: true,
            render: (createElement, context) => context.props.vnode
        }
    },

    props: {
        template:
        {
            type: String,
            default: "#vue-carousel"
        },
        itemsPerPage:
        {
            type: Number,
            default: 4
        }
    },

    data()
    {
        return {
            itemCount: 0
        };
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
                "col-12",
                itemsPerPage === 1 ? "col-sm-12" : "col-sm-6",
                "col-md-" + (12 / itemsPerPage)
            ];
        }
    },

    created()
    {
        if (this.$slots.items)
        {
            this.itemCount = this.$slots.items.length;
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            if (this.itemCount > this.itemsPerPage)
            {
                this.initializeCarousel();
            }
        });
    },

    methods:
    {
        initializeCarousel()
        {
            const self = this;

            $(this.$refs.carouselContainer).owlCarousel({
                autoHeight       : true,
                dots             : true,
                items            : self.itemsPerPage,
                responsive: {
                    0:   { items: 1 },
                    576: { items: self.itemsPerPage > 1 ? 2 : 1 },
                    768: { items: self.itemsPerPage > 3 ? 3 : self.itemsPerPage },
                    992: { items: self.itemsPerPage }
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
                        const childComponent = self.$children[i];

                        if (childComponent && childComponent.loadFirstImage)
                        {
                            childComponent.loadFirstImage();
                        }
                    }
                }
            });
        }
    }
});
