const browserDetect = require("detect-browser");
const NotificationService = require("./services/NotificationService");
const AutoFocusService = require("./services/AutoFocusService");

import { debounce } from "./helper/debounce";
import Vue from "vue";
import { getStyle } from "./helper/dom";

// Frontend end scripts
// eslint-disable-next-line
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

        fixPopperZIndexes();
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

let headerParent = document.querySelector("[data-header-offset]");
let headerLoaded = false;
let allHeaderChildrenHeights = [];

if ( headerParent )
{
    function calculateBodyOffset()
    {
        headerParent = headerParent.offsetParent ? headerParent : document.querySelector("[data-header-offset]");

        if (headerLoaded && headerParent)
        {
            const vueApp = document.getElementById("vue-app");
            let bodyOffset = 0;

            for ( let i = 0; i < headerParent.children.length; i++ )
            {
                bodyOffset += headerParent.children[i].getBoundingClientRect().height;
            }
            vueApp.style.marginTop = bodyOffset + "px";
            vueApp.style.minHeight = "calc(100vh - " + bodyOffset + "px)";
        }
    }

    function getHeaderChildrenHeights()
    {
        headerParent = headerParent.offsetParent ? headerParent : document.querySelector("[data-header-offset]");

        allHeaderChildrenHeights = [];

        for (let i = 0; i < headerParent.children.length; i++)
        {
            allHeaderChildrenHeights.push(headerParent.children[i].getBoundingClientRect().height);
        }
    }

    function scrollHeaderElements()
    {
        headerParent = headerParent.offsetParent ? headerParent : document.querySelector("[data-header-offset]");

        if (headerLoaded && !App.isShopBuilder)
        {
            let absolutePos = 0;
            let fixedElementsHeight = 0;
            let offset = 0;
            const scrollTop = window.pageYOffset;
            let zIndex = 100;

            for (let i = 0; i < headerParent.children.length; i++)
            {
                const elem = headerParent.children[i];
                const elemHeight = allHeaderChildrenHeights[i];

                offset = absolutePos - scrollTop;
                elem.style.position = "absolute";
                elem.style.zIndex = zIndex;
                zIndex--;

                if (!elem.classList.contains("unfixed"))
                {
                    if (offset < 0)
                    {
                        elem.style.top = 0;
                    }
                    else
                    {
                        elem.style.top = offset + "px";
                    }

                    if (fixedElementsHeight > 0 && offset < fixedElementsHeight)
                    {
                        elem.style.top = fixedElementsHeight + "px";
                    }

                    fixedElementsHeight = fixedElementsHeight + elemHeight;
                }
                else
                {
                    elem.style.top = offset + "px";
                }
                absolutePos = absolutePos + elemHeight;
            }
        }
    }

    window.addEventListener("resize", debounce(function()
    {
        calculateBodyOffset();
        getHeaderChildrenHeights();
        scrollHeaderElements();
    }, 50));

    window.addEventListener("scroll", debounce(function()
    {
        scrollHeaderElements();
    }, 10));

    $(document).on("shopbuilder.before.viewUpdate shopbuilder.after.viewUpdate", function()
    {
        calculateBodyOffset();
        $(".owl-carousel").trigger("refresh.owl.carousel");
    });

    const headerImages = headerParent.querySelectorAll("img");

    Promise.all(
        Array.prototype.slice.call(headerImages).map(function(headerImage)
        {
            return new Promise(function(resolve)
            {
                if (headerImage.complete)
                {
                    resolve();
                }
                else
                {
                    headerImage.onload = function()
                    {
                        resolve();
                    };
                    headerImage.onerror = function()
                    {
                        resolve();
                    };
                }
            });
        })
    ).then(function()
    {
        // Initialize
        headerLoaded = true;
        getHeaderChildrenHeights();
        scrollHeaderElements();
        calculateBodyOffset();
    });

    calculateBodyOffset();
}

$(document).on("shopbuilder.after.drop shopbuilder.after.widget_replace", function(event, eventData, widgetElement)
{
    const compiled = Vue.compile(widgetElement[0].outerHTML, { delimiters: ["${", "}"] } );
    const component = new Vue({
        store: window.ceresStore,
        render: compiled.render,
        staticRenderFns: compiled.staticRenderFns
    });

    component.$mount( widgetElement[0] );
    $(component.$el).find("*").each(function(index, elem)
    {
        $(elem).click(function(event)
        {
            event.preventDefault();
        });
    });

    $(component.$el).find(".owl-carousel").on("resized.owl.carousel", function()
    {
        window.dispatchEvent(new Event("resize"));
    });
});

function fixPopperZIndexes()
{
    const elements = document.querySelectorAll(".popover.d-none");
    let counter = elements.length;

    elements.forEach(el =>
    {
        let zIndex = parseInt(getStyle(el, "z-index"));

        if (!isNaN(zIndex))
        {
            zIndex += --counter;

            el.style.zIndex = zIndex;
        }
    });
}
