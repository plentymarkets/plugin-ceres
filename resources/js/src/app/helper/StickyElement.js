import { isNullOrUndefined } from "./utils";
import { applyStyles } from "./dom";
import { detectPassiveEvents } from "./featureDetect";
import { repeatAnimationFrame } from "./repeatAnimationFrame";

const STICKY_EVENTS = [
    "resize",
    "scroll",
    "touchstart",
    "touchmove",
    "touchend",
    "pageshow",
    "load",
    "move-sticky"
];

const STICKY_EVENTS_PASSIVE = [
    "scroll",
    "touchstart",
    "touchmove"
];

export class StickyElement
{
    constructor(el, vm, minWidth)
    {
        this.el = el;
        this.vm = vm;
        this.offsetTop = 0;
        this.minWidth = minWidth;
        this.isMinWidth = true;
        this.checkMinWidth();

        this.resizeListener = this.checkMinWidth.bind(this);

        window.addEventListener("resize", this.resizeListener);

        this.vm.$nextTick(() =>
        {
            const containerElement = this.getContainerElement();

            containerElement.__stickyElements = this.getContainerElement().__stickyElements || [];
            containerElement.__stickyElements.push(this);
            containerElement.__stickyElements.forEach(stickyElement => stickyElement.calculateOffset());
        });

        el.classList.add("sticky-element");

        const updateHandler = () =>
        {
            if (this.enabled)
            {
                this.checkElement();
                this.updateStyles();
            }
        };

        // Update if height of sticky element changes
        if ("ResizeObserver" in window)
        {
            this.resizeObserver = new ResizeObserver(updateHandler.bind(this));
            this.resizeObserver.observe(this.el);
        }
        // IE11 + Safari < 13.0
        else
        {
            this.el.addEventListener("updateStickyContainer", () =>
            {
                const stop = repeatAnimationFrame(updateHandler.bind(this));

                setTimeout(stop, 500);
            });
        }
    }

    enable()
    {
        this.vm.$nextTick(() =>
        {
            if (this.enabled || App.isShopBuilder)
            {
                return;
            }

            this.animationFrame = 0;
            this.placeholder = document.createElement("DIV");
            this.el.parentNode.insertBefore(this.placeholder, this.el);
            this.eventListener = () =>
            {
                if (this.shouldUpdate())
                {
                    if (this.checkElement())
                    {
                        if (this.animationFrame > 0)
                        {
                            cancelAnimationFrame(this.animationFrame);
                            this.animationFrame = 0;
                        }
                        this.animationFrame = requestAnimationFrame(this.updateStyles.bind(this));
                    }
                }
            };

            const isPassiveEventSupported = detectPassiveEvents();

            document.addEventListener("storeChanged", this.eventListener);
            STICKY_EVENTS.forEach(event =>
            {
                window.addEventListener(event, this.eventListener,
                    isPassiveEventSupported && !!STICKY_EVENTS_PASSIVE.includes(event) ? { passive: true } : false);
            });

            this.enabled = true;
            this.calculateOffset();
        });
    }

    disable()
    {
        this.vm.$nextTick(() =>
        {
            if (!isNullOrUndefined(this.placeholder))
            {
                this.getContainerElement().removeChild(this.placeholder);
            }
            this.placeholder = null;
        });

        applyStyles(this.el, {
            position: null,
            top: null,
            left: null,
            width: null,
            zIndex: null
        });

        document.removeEventListener("storeChanged", this.eventListener);
        STICKY_EVENTS.forEach(event =>
        {
            window.removeEventListener(event, this.eventListener);
        });
        this.eventListener = null;
        if (this.animationFrame > 0)
        {
            cancelAnimationFrame(this.animationFrame);
        }
        this.animationFrame = 0;
        this.enabled = false;
    }

    shouldUpdate()
    {
        return (this.enabled && this.isMinWidth) || (this.position || {}).isSticky;
    }

    checkElement(skipOffsetCalculation)
    {
        if (!this.enabled)
        {
            return false;
        }

        const oldValue        = this.position || {};
        const elementRect     = this.el.getBoundingClientRect();
        const placeholderRect = this.placeholder.getBoundingClientRect();
        const containerRect   = this.getContainerElement().getBoundingClientRect();
        const maxBottom       = Math.min(containerRect.bottom - elementRect.height - this.offsetTop - this.offsetBottom, 0);

        if (oldValue.height !== elementRect.height && !skipOffsetCalculation)
        {
            this.calculateOffset();
        }

        this.position = {
            height: elementRect.height,
            width: placeholderRect.width,
            // eslint-disable-next-line id-length
            x: placeholderRect.left,
            // eslint-disable-next-line id-length
            y: maxBottom + this.offsetTop,
            origY: placeholderRect.top,
            isSticky: elementRect.height < containerRect.height && placeholderRect.top <= this.offsetTop
        };

        // check if any property has changed
        return ["width", "height", "x", "y", "origY", "isSticky"]
            .some(property => oldValue[property] !== this.position[property]);
    }

    calculateOffset()
    {
        if (!this.enabled)
        {
            return;
        }

        this.offsetTop = 0;

        // Check if Custom Header
        if (document.querySelector("[data-header-offset]"))
        {
            const headerChildren = document.querySelector("[data-header-offset]").children;

            for (let i = 0; i < headerChildren.length; i++)
            {
                if (!headerChildren[i].classList.contains("unfixed"))
                {
                    this.offsetTop += headerChildren[i].getBoundingClientRect().height;
                }
            }
        }
        else
        {
            this.offsetTop += document.getElementById("page-header").getBoundingClientRect().height;
        }

        this.offsetBottom = 0;
        if (isNullOrUndefined(this.position))
        {
            this.checkElement(true);
        }

        this.getSiblingStickies()
            .forEach(stickyElement =>
            {
                if (isNullOrUndefined(stickyElement.position))
                {
                    stickyElement.checkElement(true);
                }

                if (stickyElement.position.origY + stickyElement.position.height <= this.position.origY)
                {
                    this.offsetTop += stickyElement.position.height;
                }
                else if (stickyElement.position.origY >= this.position.origY + this.position.height)
                {
                    this.offsetBottom += stickyElement.position.height;
                }
            });
    }

    updateStyles()
    {
        let styles = {
            position: null,
            top: null,
            left: null,
            width: null,
            zIndex: null,
            transform: null
        };

        let placeholderStyles = {
            paddingTop: null
        };

        if (this.position.isSticky)
        {
            // Fix blur while gpu accelerated
            const roundedPosition = Math.round(this.position.y / 2) * 2;

            styles = {
                position:   "fixed",
                top:        0,
                transform:  "translate3d(0, " + roundedPosition + "px, 0)",
                left:       this.position.x + "px",
                width:      this.position.width + "px"
            };

            placeholderStyles = {
                paddingTop: this.position.height + "px"
            };

            this.el.classList.add("is-sticky");
        }
        else
        {
            this.el.classList.remove("is-sticky");
        }

        applyStyles(this.el, styles);
        applyStyles(this.placeholder, placeholderStyles);
    }

    checkMinWidth()
    {
        this.isMinWidth = window.matchMedia("(min-width: " + this.minWidth + "px)").matches;
    }

    getSiblingStickies()
    {
        const container = this.getContainerElement();

        if (isNullOrUndefined(container))
        {
            return [];
        }

        if (isNullOrUndefined(container.__stickyElements))
        {
            container.__stickyElements = [];
        }

        return container.__stickyElements;
    }

    getContainerElement()
    {
        if (this.el.dataset.hasOwnProperty("stickyContainer"))
        {
            const container = document.querySelector(this.el.dataset.stickyContainer);

            if (!isNullOrUndefined(container))
            {
                return container;
            }
        }
        return this.el.parentElement;
    }

    destroy()
    {
        window.removeEventListener("resize", this.resizeListener);
        const idx = this.getSiblingStickies().indexOf(this);

        if (idx >= 0)
        {
            this.getContainerElement().__stickyElements.splice(idx, 1);
        }

        if (this.resizeObserver)
        {
            this.resizeObserver.unobserve(this.el);
        }

        this.el.classList.remove("sticky-element");
    }
}
