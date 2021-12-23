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
        // indicates, if the user is in the shopbuilder and the header is fixed
        this.isShopBuilderHeaderFixated = false;

        if (isDefined(this.headerParent))
        {
            if (!App.isShopBuilder)
            {
                this.registerEventsListeners();
            }
            else
            {
                this.registerSBEventsListeners();
            }
        }
    }

    // The header parent element.
    get headerParent()
    {
        // Check if the element _headerParent is still a child of the document. Also check if document.contains is defined (IE11).
        if (this._headerParent && document.contains && document.contains(this._headerParent))
        {
            return this._headerParent;
        }

        this._headerParent = document.querySelector("[data-header-offset]");
        return this._headerParent;
    }

    /**
     * Initialize the fixed header scrolling behavior. Collect the heights of the elements and update their zindexes.
     * Is called on 'load'; when the fonts have load; when the images in the header have load, on window resize.
     */
    initialize()
    {
        this.collectHeaderElementHeights();
        this.updateZIndexes();

        // Initialize only, if the user has scrolled down from the top and is not in the shopbuilder.
        if (!App.isShopBuilder && window.pageYOffset > 0)
        {
            this.calculateBodyOffset();
            this.scrollHeaderElements();
            // If the header content gets active in the shopbuilder, the event listener for 'shopbuilder.after.activate-container' will fixate the header.
            this.fixateHeader();

            this.initialized = true;
        }
    }

    // Collect heights of header elements for later use
    collectHeaderElementHeights()
    {
        this.headerHeight = 0;
        this.allHeaderChildrenHeights = [];

        Array.from(this.headerParent?.children).forEach(element =>
        {
            let elementHeight = 0;

            // skip elements with the data attribute "data-scroll-void" and interpret their height as zero
            if (!element.dataset.hasOwnProperty("scrollVoid"))
            {
                elementHeight = element.getBoundingClientRect().height;
            }

            this.allHeaderChildrenHeights.push(elementHeight);
            this.headerHeight += elementHeight;
        });
    }

    // Set descending z-index for all header elements and create list of elements with unfixed class for later use.
    updateZIndexes()
    {
        if (!App.isShopBuilder)
        {
            let zIndex = 100;

            Array.from(this.headerParent?.children).forEach(element =>
            {
                element.style.zIndex = zIndex--;
            });
        }
    }

    // Calculate top offset for vue-app node because header is not part of document flow.
    calculateBodyOffset(unset = false)
    {
        if (this.headerParent)
        {
            const app = document.getElementById("vue-app");

            app.style.marginTop = unset ? null : this.headerHeight + "px";
            app.style.minHeight = unset ? null : window.innerHeight - this.headerHeight + "px";
        }
    }

    // Scroll header elements depending on if they are unfixed or not
    scrollHeaderElements()
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

            // Element should not be considerd in height calculation of following elements
            if (elem.dataset.hasOwnProperty("scrollVoid"))
            {
                continue;
            }
            // Element is unfixed and should scroll indefinetly
            else if (elem.classList.contains("unfixed"))
            {
                elem.style.top = offset + "px";
            }
            // Element is fixed and should scroll until it hits top of header or next fixed element
            else
            {
                elem.style.top = offset < 0 ? 0 : offset + "px";

                if (fixedElementsHeight > 0 && offset < fixedElementsHeight)
                {
                    elem.style.top = fixedElementsHeight + "px";
                }

                fixedElementsHeight = fixedElementsHeight + elemHeight;
            }
            absolutePos = absolutePos + elemHeight;
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
    }

    // Register event listeners for the shopbuilder environment.
    registerSBEventsListeners()
    {
        $(document).on("shopbuilder.before.viewUpdate shopbuilder.after.viewUpdate", () =>
        {
            if (this.isShopBuilderHeaderFixated)
            {
                this.collectHeaderElementHeights();
                this.calculateBodyOffset();
            }
        });

        // when the active dropzone in the shopbuilder changes
        $(document).on("shopbuilder.after.activate-container", (event, data) =>
        {
            if (data?.container === "Ceres::Header")
            {
                this.fixateHeader();
                this.calculateBodyOffset();
                this.isShopBuilderHeaderFixated = true;
            }
            else
            {
                this.unfixHeader();
                this.calculateBodyOffset(true);
                this.isShopBuilderHeaderFixated = false;
            }
        });
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

    // Add the class .fixed-top to the header element.
    fixateHeader()
    {
        document.querySelector("#page-header")?.classList.add("fixed-top");
    }

    // Remove the class .fixed-top from the header element.
    unfixHeader()
    {
        document.querySelector("#page-header")?.classList.remove("fixed-top");
    }
}
