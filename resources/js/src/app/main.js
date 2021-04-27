import { getContainingComponent } from "./helper/utils";

const browserDetect = require("detect-browser");
const NotificationService = require("./services/NotificationService");
const AutoFocusService = require("./services/AutoFocusService");

import { debounce } from "./helper/debounce";
import Vue from "vue";
import { getStyle } from "./helper/dom";
import { detectPassiveEvents } from "./helper/featureDetect";

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

    const $mainNavbarCollapse = $("#mainNavbarCollapse");

    // prevent hidding collapses in the shopbuilder, for editing search bar results
    if (!App.isShopBuilder)
    {
        $(document).on("click", function(evt)
        {
            headerCollapses.forEach(element =>
            {
                if (evt.target !== element && $(evt.target).parents(element).length <= 0)
                {
                    $(element).collapse("hide");
                }
            });
        });
    }

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

        window.addEventListener("scroll", function()
        {
            if (isDesktop)
            {
                if ($(window).scrollTop() > offset)
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
        }, detectPassiveEvents() ? { passive: true } : false );

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

        // Emit event for Sticky Containers to update
        $(".collapse").on("show.bs.collapse hide.bs.collapse", function()
        {
            this.dispatchEvent(new CustomEvent("updateStickyContainer",
                {
                    bubbles: true
                }));
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

let headerParent = document.querySelector("[data-header-offset]");

if ( headerParent )
{
    let headerLoaded = false;

    let allHeaderChildrenHeights = [];

    let headerHeight = 0;

    let hasCalculatedBodyOffset = false;

    // Calculate top offset for vue-app node because header is not part of document flow
    function calculateBodyOffset(isScrollTop = false)
    {
        const vueApp = document.getElementById("vue-app");

        // if the page is at the top, unset the margin-top and min-height
        if (isScrollTop)
        {
            vueApp.style.marginTop = null;
            vueApp.style.minHeight = null;
            hasCalculatedBodyOffset = false;
        }
        else if (!hasCalculatedBodyOffset)
        {
            headerParent = headerParent.offsetParent ? headerParent : document.querySelector("[data-header-offset]");

            if (headerLoaded && headerParent)
            {
                vueApp.style.marginTop = headerHeight + "px";
                vueApp.style.minHeight = "calc(100vh - " + headerHeight + "px)";
            }

            hasCalculatedBodyOffset = true;
        }
    }

    // Set descending z-index for all header elements and create list of elements with unfixed class for later use
    function prepareHeaderElements()
    {
        if (headerLoaded && !App.isShopBuilder)
        {
            headerParent = headerParent.offsetParent ? headerParent : document.querySelector("[data-header-offset]");

            let zIndex = 100;

            for (let i = 0; i < headerParent.children.length; i++)
            {
                const elem = headerParent.children[i];

                elem.style.zIndex = zIndex;
                zIndex--;
            }
        }
    }

    // Collect heights of header elements for later use
    function getHeaderHeights()
    {
        headerParent = headerParent.offsetParent ? headerParent : document.querySelector("[data-header-offset]");

        allHeaderChildrenHeights = [];

        headerHeight = 0;

        for (let i = 0; i < headerParent.children.length; i++)
        {
            const elementHeight = headerParent.children[i].getBoundingClientRect().height;

            allHeaderChildrenHeights.push(elementHeight);
            headerHeight += elementHeight;
        }
    }

    // Scroll header elements depending on if they are unfixed or not
    function scrollHeaderElements()
    {
        if (headerLoaded && !App.isShopBuilder)
        {
            headerParent = headerParent.offsetParent ? headerParent : document.querySelector("[data-header-offset]");

            let absolutePos = 0;

            let fixedElementsHeight = 0;

            let offset = 0;

            const scrollTop = window.pageYOffset;
            const isScrollTop = scrollTop <= 0;
            const header = document.querySelector("#page-header");

            for (let i = 0; i < headerParent.children.length; i++)
            {
                const elem = headerParent.children[i];
                const elemHeight = allHeaderChildrenHeights[i];

                if (scrollTop <= 0)
                {
                    elem.style.top = null;
                    elem.style.position = null;
                    continue;
                }

                offset = absolutePos - scrollTop;
                elem.style.position = "absolute";

                // Element is unfixed and should scroll indefinetly
                if (elem.classList.contains("unfixed"))
                {
                    elem.style.top = offset + "px";
                }
                // Element is fixed and should scroll until it hits top of header or next fixed element
                else
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
                absolutePos = absolutePos + elemHeight;
            }

            // fixate the header only, if the user scrolls down
            if (isScrollTop)
            {
                header.classList.remove("fixed-top");
            }
            else
            {
                header.classList.add("fixed-top");
            }

            calculateBodyOffset(isScrollTop);
        }
    }

    window.addEventListener("resize", debounce(function()
    {
        getHeaderHeights();
        calculateBodyOffset();
        scrollHeaderElements();
    }, 50));

    window.addEventListener("load", function()
    {
        getHeaderHeights();
        calculateBodyOffset();
        prepareHeaderElements();
        scrollHeaderElements();

        let timeout;

        window.addEventListener("scroll", function()
        {
            if (timeout)
            {
                window.cancelAnimationFrame(timeout);
            }

            timeout = window.requestAnimationFrame(scrollHeaderElements);

        }, detectPassiveEvents() ? { passive: true } : false);
    });

    if (document.fonts)
    {
        document.fonts.onloadingdone = function(evt)
        {
            getHeaderHeights();
            calculateBodyOffset();
            prepareHeaderElements();
            scrollHeaderElements();
        };
    }

    $(document).on("shopbuilder.before.viewUpdate shopbuilder.after.viewUpdate", function()
    {
        calculateBodyOffset();
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
        getHeaderHeights();
        calculateBodyOffset();
        scrollHeaderElements();
    });

    calculateBodyOffset();
}

$(document).on("shopbuilder.after.drop shopbuilder.after.widget_replace", function(event, eventData, widgetElement)
{
    const parent = widgetElement[1];

    const parentComponent = getContainingComponent(parent);

    const compiled = Vue.compile(widgetElement[0].outerHTML, { delimiters: ["${", "}"] } );
    const component = new Vue({
        store: window.ceresStore,
        render: compiled.render,
        staticRenderFns: compiled.staticRenderFns,
        parent: parentComponent
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
