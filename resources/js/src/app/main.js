const browserDetect = require("detect-browser");
const NotificationService = require("services/NotificationService");
const AutoFocusService = require("services/AutoFocusService");

// Frontend end scripts
// eslint-disable-next-line
var init = (function($, window, document)
{
    const headerCollapses = [];

    function HeaderCollapse(selector)
    {
        headerCollapses.push(selector);
        $(document).ready(function()
        {
            $(selector).on("show.bs.collapse", () =>
            {
                headerCollapses.forEach(element =>
                {
                    if (!$(element).is(selector))
                    {
                        $(element).collapse("hide");
                    }
                });
            });

        });
    }

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

        // Detect Facebook integrated Browser
        if (typeof navigator !== "undefined" && /FBA[NV]\/([0-9\.]+)/.test(navigator.userAgent))
        {
            document.body.classList.add("facebook");
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

        window.onpopstate = function(event)
        {
            if (event.state && event.state.requireReload)
            {
                window.location.reload();
            }
        };

        // init bootstrap tooltips
        $("[data-toggle=\"tooltip\"]").tooltip();

        HeaderCollapse("#countrySettings");
        HeaderCollapse("#currencySelect");
        HeaderCollapse("#searchBox");

        const $toggleListView = $(".toggle-list-view");
        const $mainNavbarCollapse = $("#mainNavbarCollapse");

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

            headerCollapses.forEach(element =>
            {
                if (evt.target !== element && $(evt.target).parents(element).length <= 0)
                {
                    $(element).collapse("hide");
                }
            });
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
            const offset = 250;
            const duration = 300;

            let isDesktop = window.matchMedia("(min-width: 768px)").matches;

            AutoFocusService.autoFocus();

            $("#searchBox").on("shown.bs.collapse", function()
            {
                const searchInput = document.querySelector("input.search-input");

                if (searchInput)
                {
                    searchInput.focus();
                }
            });

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

                $("html, body").animate({ scrollTop: 0 }, duration);

                return false;
            });

            $(".back-to-top-center").click(function(event)
            {
                event.preventDefault();

                $("html, body").animate({ scrollTop: 0 }, duration);

                return false;
            });

            $("#accountMenuList").click(function()
            {
                $("#countrySettings").collapse("hide");
                $("#searchBox").collapse("hide");
                $("#currencySelect").collapse("hide");
            });
        });
    }

    window.CeresMain = new CeresMain();
    window.CeresNotification = NotificationService;

    const showShopNotification = function(event)
    {
        if (event.detail.type)
        {
            switch (event.detail.type)
            {
            case "info":
                NotificationService.info(event.detail.message);
                break;
            case "log":
                NotificationService.log(event.detail.message);
                break;
            case "error":
                NotificationService.error(event.detail.message);
                break;
            case "success":
                NotificationService.success(event.detail.message);
                break;
            case "warning":
                NotificationService.warn(event.detail.message);
                break;
            default:
                console.log("no type such as:" + event.detail.type);
                break;
            }
        }
    };

    document.addEventListener("showShopNotification", showShopNotification);

})(jQuery, window, document);
