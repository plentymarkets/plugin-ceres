vueApp = new Vue({
    el: "body"
});

// Frontend end scripts

(function($, window, document)
{

    function CallistoMain()
    {

        // Sticky sidebar single item
        if (window.matchMedia("(min-width: 768px)").matches)
        {
            var $singleRightside = $(".single-rightside");

            $singleRightside.stick_in_parent({});

            $singleRightside.on("sticky_kit:bottom", function()
            {
                $(this).parent().css("position", "static");
            })
                .on("sticky_kit:unbottom", function()
                {
                    $(this).parent().css("position", "relative");
                });
        }

        var $singleBigImage      = $("#single-big-image");
        var $singleCarousel      = $("#single-carousel");
        var $toggleListView      = $(".toggle-list-view");
        var $toggleBasketPreview = $("#toggleBasketPreview, #closeBasketPreview");
        var $mainNavbarCollapse  = $("#mainNavbarCollapse");

        $singleBigImage.owlCarousel({
            singleItem           : true,
            slideSpeed           : 1000,
            navigation           : true,
            navigationText       : [
                "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
            ],
            pagination           : false,
            afterAction          : syncPosition,
            responsiveRefreshRate: 200
        });

        $singleCarousel.owlCarousel({
            items                : 8,
            itemsDesktop         : [1199, 8],
            itemsDesktopSmall    : [979, 8],
            itemsTablet          : [768, 6],
            itemsMobile          : [479, 4],
            navigation           : true,
            navigationText       : [
                "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
            ],
            pagination           : false,
            responsiveRefreshRate: 100,
            afterInit            : function(el)
            {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        $singleCarousel.on("click", ".owl-item", function(event)
        {
            event.preventDefault();
            var number = $(this).data("owlItem");

            $singleBigImage.trigger("owl.goTo", number);
        });

        $toggleBasketPreview.on("click", function(evt)
        {
            evt.preventDefault();
            $("body").toggleClass("open-right");
        });

        $toggleListView.on("click", function(evt)
        {
            evt.preventDefault();

            // toggle it's own state
            $toggleListView.toggleClass("grid");

            // toggle internal style of thumbs
            $(".product-list, .cmp-product-thumb").toggleClass("grid");
        });

        $mainNavbarCollapse.collapse("hide");

        // Add click listener outside the navigation to close it
        $mainNavbarCollapse.on("show.bs.collapse", function()
        {
            $(".main").one("click", closeNav);
        });

        $mainNavbarCollapse.on("hide.bs.collapse", function()
        {
            $(".main").off("click", closeNav);
        });

        function syncPosition(el)
        {
            var current         = this.currentItem;
            var $singleCarousel = $("#single-carousel");

            $singleCarousel
                .find(".owl-item")
                .removeClass("synced")
                .eq(current)
                .addClass("synced");

            if (typeof $singleCarousel.data("owlCarousel") !== "undefined")
            {
                center(current);
            }
        }

        function center(number)
        {
            var sync2visible = $singleCarousel.data("owlCarousel").owl.visibleItems;
            var num          = number;
            var found        = false;

            for (var i in sync2visible)
            {
                if (num === sync2visible[i])
                {
                    found = true;
                    break;
                }
            }

            if (found === false)
            {
                if (num > sync2visible[sync2visible.length - 1])
                {
                    $singleCarousel.trigger("owl.goTo", num - sync2visible.length + 2);
                }
                else
                {
                    if ((num - 1) < 0)
                    {
                        num = 0;
                    }
                    $singleCarousel.trigger("owl.goTo", num);
                }
            }
            else if (num === sync2visible[sync2visible.length - 1])
            {
                $singleCarousel.trigger("owl.goTo", sync2visible[1]);
            }
            else if (num === sync2visible[0])
            {
                $singleCarousel.trigger("owl.goTo", num - 1);
            }

        }

        function closeNav()
        {
            $("#mainNavbarCollapse").collapse("hide");
        }

    }

    window.CallistoMain = new CallistoMain();

})(jQuery, window, document);
