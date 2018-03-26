const browserDetect = require("detect-browser");
// Frontend end scripts
// eslint-disable-next-line
var init = (function($, window, document)
{
    function CeresMain()
    {
        const browser = browserDetect.detect();

        if (browser && browser.name)
        {
            $("html").addClass(browser.name);
        }
        else
        {
            $("html").addClass("unkown-os");
        }

        $(window).scroll(function()
        {
            if ($(".wrapper-main").hasClass("isSticky"))
            {
                if ($(this).scrollTop() > 1)
                {
                    $(".wrapper-main").addClass("sticky");
                }
                else
                {
                    $(".wrapper-main").removeClass("sticky");
                }
            }
        });

        // init bootstrap tooltips
        $("[data-toggle=\"tooltip\"]").tooltip();

        // Replace all SVG images with inline SVG, class: svg
        $("img[src$=\".svg\"]").each(function()
        {
            var $img = jQuery(this);
            var imgURL = $img.attr("src");
            var attributes = $img.prop("attributes");

            $.get(imgURL, function(data)
            {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find("svg");

                // Remove any invalid XML tags
                $svg = $svg.removeAttr("xmlns:a");

                // Loop through IMG attributes and apply on SVG
                $.each(attributes, function()
                {
                    $svg.attr(this.name, this.value);
                });

                // Replace IMG with SVG
                $img.replaceWith($svg);
            }, "xml");
        });

        var $toggleListView = $(".toggle-list-view");
        var $mainNavbarCollapse = $("#mainNavbarCollapse");

        $(document).on("click", function(evt)
        {
            const basketOpenClass = (App.config.basket.previewType === "right") ? "open-right" : "open-hover";

            if ($("#vue-app").hasClass(basketOpenClass))
            {
                if ((evt.target != $(".basket-preview")) &&
                    (evt.target != document.querySelector(".basket-preview-hover")) &&
                    (evt.target.classList[0] != "message") &&
                    ($(evt.target).parents(".basket-preview").length <= 0 && $(evt.target).parents(".basket-preview-hover").length <= 0))
                {
                    evt.preventDefault();
                    $("#vue-app").toggleClass(basketOpenClass || "open-hover");
                }
            }

            if ((evt.target.id != "countrySettings") &&
                ($(evt.target).parents("#countrySettings").length <= 0) &&
                ($("#countrySettings").attr("aria-expanded") == "true"))
            {
                $("#countrySettings").collapse("hide");
            }

            if ((evt.target.id != "searchBox") &&
                ($(evt.target).parents("#searchBox").length <= 0) &&
                ($("#searchBox").attr("aria-expanded") == "true"))
            {
                $("#searchBox").collapse("hide");
            }

            if ((evt.target.id != "currencySelect") &&
                ($(evt.target).parents("#currencySelect").length <= 0) &&
                ($("#currencySelect").attr("aria-expanded") == "true"))
            {
                $("#currencySelect").collapse("hide");
            }
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

        function closeNav()
        {
            $("#mainNavbarCollapse").collapse("hide");
        }

        $(document).ready(function()
        {
            var offset = 250;
            var duration = 300;

            var isDesktop = window.matchMedia("(min-width: 768px)").matches;

            $(window).scroll(function()
            {
                if (isDesktop)
                {
                    if ($(this).scrollTop() > offset)
                    {
                        $(".back-to-top").fadeIn(duration);
                        $(".back-to-top-center").fadeIn(duration);
                    }
                    else
                    {
                        $(".back-to-top").fadeOut(duration);
                        $(".back-to-top-center").fadeOut(duration);
                    }
                }
            });

            window.addEventListener("resize", function()
            {
                isDesktop = window.matchMedia("(min-width: 768px)").matches;
            });

            $(".back-to-top").click(function(event)
            {
                event.preventDefault();

                $("html, body").animate({scrollTop: 0}, duration);

                return false;
            });

            $(".back-to-top-center").click(function(event)
            {
                event.preventDefault();

                $("html, body").animate({scrollTop: 0}, duration);

                return false;
            });
        });
    }

    window.CeresMain = new CeresMain();

})(jQuery, window, document);
