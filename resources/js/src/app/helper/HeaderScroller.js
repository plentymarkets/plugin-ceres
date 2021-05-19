import { debounce } from "./debounce";
import { detectPassiveEvents } from "./featureDetect";
import { isDefined } from "./utils";

/**
 * This class is used to fixate the shop header when scrolling.
 */
export default class HeaderScroller
{
    constructor(headerParent = null)
    {
        // the header element
        this._headerParent = headerParent;
        // the height of all header elements
        this.headerHeight = 0;
        // array of the header element heights
        this.allHeaderChildrenHeights = [];
        // indicates, if the scrolling behavior has been initialized
        this.initialized = false;
        // last requested animation frame
        this.animationFrameTimeout = null;

        if (isDefined(this.headerParent))
        {
            this.registerEventsListeners();
        }
        else
        {
            console.warn("No header parent found.");
        }
    }

    // The header parent element.
    get headerParent()
    {
        if (this._headerParent)
        {
            return this._headerParent;
        }

        this._headerParent = this._headerParent?.offsetParent ? this._headerParent : document.querySelector("[data-header-offset]");
        return this._headerParent;
    }

    // Initialize the scrolling behavior, collect heights and set indexes.
    initialize()
    {
        this.collectHeaderElementHeights();
        this.updateZIndexes();

        // only initialize, if the client is not at the top
        if (window.pageYOffset > 0)
        {
            this.calculateBodyOffset();
            this.scrollHeaderElements();

            document.querySelector("#page-header")?.classList.add("fixed-top");
            this.initialized = true;
        }
    }

    // Collect heights of header elements for later use
    collectHeaderElementHeights()
    {
        this.headerHeight = 0;
        this.allHeaderChildrenHeights = [];

        this.headerParent?.children.forEach(element =>
        {
            const elementHeight = element.getBoundingClientRect().height;

            this.allHeaderChildrenHeights.push(elementHeight);
            this.headerHeight += elementHeight;
        });
    }

    // Set descending z-index for all header elements and create list of elements with unfixed class for later use
    updateZIndexes()
    {
        if (!App.isShopBuilder)
        {
            let zIndex = 100;

            this.headerParent?.children.forEach(element =>
            {
                element.style.zIndex = zIndex--;
            });
        }
    }

    // Calculate top offset for vue-app node because header is not part of document flow
    calculateBodyOffset()
    {
        if (this.headerParent)
        {
            const app = document.getElementById("vue-app");

            app.style.marginTop = this.headerHeight + "px";
            app.style.minHeight = window.innerHeight - this.headerHeight + "px";
        }
    }

    // Scroll header elements depending on if they are unfixed or not
    scrollHeaderElements()
    {
        if (!App.isShopBuilder)
        {
            let absolutePos = 0;

            let fixedElementsHeight = 0;

            let offset = 0;

            for (let i = 0; i < this.headerParent.children.length; i++)
            {
                const elem = this.headerParent.children[i];
                const elemHeight = this.allHeaderChildrenHeights[i];

                offset = absolutePos - window.pageYOffset;
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
        }
    }

    // Register all the event listeners, to realize the header scrolling behavior.
    registerEventsListeners()
    {
        window.addEventListener("load", () => this.initialize());

        if (document.fonts)
        {
            document.fonts.onloadingdone = () => this.initialize();
        }

        this.checkForHeaderImages().then(() => this.initialize());

        window.addEventListener("resize", debounce(() => this.initialize(), 50));

        // The listener for user scrolling. If this class is not fully initialized, call the initialize method on scroll.
        window.addEventListener("scroll", () =>
        {
            if (this.initialized)
            {
                if (this.animationFrameTimeout)
                {
                    window.cancelAnimationFrame(this.animationFrameTimeout);
                }

                this.animationFrameTimeout = window.requestAnimationFrame(
                    this.scrollHeaderElements.bind(this)
                );
            }
            else
            {
                this.initialize();
            }
        }, detectPassiveEvents() ? { passive: true } : false);

        if (App.isShopBuilder)
        {
            $(document).on("shopbuilder.before.viewUpdate shopbuilder.after.viewUpdate", () =>
            {
                this.collectHeaderElementHeights();
                this.calculateBodyOffset();
            });
        }

    }

    // Check all the images present in the header, and recalculate header height, when needed.
    checkForHeaderImages()
    {
        const headerImages = this.headerParent.querySelectorAll("img");

        return Promise.all(
            Array.prototype.slice.call(headerImages).map(headerImage =>
            {
                return new Promise((resolve) =>
                {
                    if (headerImage.complete)
                    {
                        resolve();
                    }
                    else
                    {
                        headerImage.onload = () => resolve();
                        headerImage.onerror = () => resolve();
                    }
                });
            })
        );
    }
}
