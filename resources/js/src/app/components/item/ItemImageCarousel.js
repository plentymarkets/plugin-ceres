var ResourceService = require("services/ResourceService");

Vue.component("item-image-carousel", {

    props: [
        "currentVariation",
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.watch("currentVariation", function(newValue)
        {
            this.currentVariation = newValue;

            var self = this;

            $(window).load(function()
            {
                $(self.$els.single).owlCarousel({
                    autoHeight       : true,
                    items            : 1,
                    lazyLoad         : true,
                    loop             : true,
                    margin           : 10,
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
            });
        }.bind(this));
    }
});
