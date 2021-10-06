import { getContainingComponent } from "./helper/utils";

const browserDetect = require("detect-browser");
const NotificationService = require("./services/NotificationService");
const AutoFocusService = require("./services/AutoFocusService");

import Vue from "vue";
import { getStyle } from "./helper/dom";
import { detectPassiveEvents } from "./helper/featureDetect";
import HeaderScroller from "./helper/HeaderScroller";

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

    window.onpopstate = function(event)
    {
        if (event.state && event.state.requireReload)
        {
            window.location.reload();
        }
    };

    // init bootstrap tooltips
    document.querySelectorAll("[data-toggle=\"tooltip\"]").forEach(el =>
    {
        $(el).tooltip();
    });

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

// fixate the header elements
new HeaderScroller();

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
