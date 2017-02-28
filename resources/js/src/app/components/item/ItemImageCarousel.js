var ResourceService = require("services/ResourceService");

Vue.component("item-image-carousel", {

    props: [
        "currentVariation",
        "imageUrlAccessor",
        "template"
    ],

    data: function()
    {
        return {
            init: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.watch("currentVariation", function(newValue)
        {
            this.currentVariation = newValue;

            var self = this;

            if (!this.init)
            {
                $(window).load(function()
                {
                    self.initCarousel();

                    self.init = true;
                });
            }

            else
            {
                setTimeout(function()
                {
                    self.reInitialize();
                }, 1);
            }

        }.bind(this));
    },

    methods:
    {
        getImageCount: function()
        {
            var images = this.currentVariation.documents[0].data.images;

            return images.variation.length || images.all.length;
        },

        reInitialize: function()
        {
            var $owl = $(this.$els.single);

            $owl.trigger("destroy.owl.carousel");
            $owl.html($owl.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $owl.find(".owl-item").remove();

            this.initCarousel();
        },

        initCarousel: function()
        {
            var imageCount = this.getImageCount();

            $(this.$els.single).owlCarousel({
                autoHeight       : true,
                items            : 1,
                lazyLoad         : true,
                loop             : imageCount > 1,
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
                smartSpeed       : 350
            });
        }
    }
});
