import { isNullOrUndefined } from "./utils";
import { applyStyles } from "./dom";

const IS_CONTENT_BUILDER = (new URLSearchParams(window.location.search)).get("isContentBuilder") === "1";

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

export class StickyElement
{
    constructor(el, vm, minWidth)
    {
        this.el = el;
        this.vm = vm;
        this.offsetTop = 0;
        this.minWidth = minWidth;
        this.isMinWidth = true;
        this.resizeListener = this.checkMinWidth.bind(this);
        window.addEventListener("resize", this.resizeListener);
        this.checkMinWidth();

        this.vm.$nextTick(() =>
        {
            this.el.parentElement.__stickyElements = this.el.parentElement.__stickyElements || [];
            this.el.parentElement.__stickyElements.push(this);
            this.el.parentElement.__stickyElements.forEach(stickyElement => stickyElement.calculateOffset());
        });
    }

    enable()
    {
        this.vm.$nextTick(() =>
        {
            if (this.enabled || this.isMinWidth || IS_CONTENT_BUILDER)
            {
                return;
            }

            this.animationFrame = 0;
            this.placeholder = document.createElement("DIV");
            this.el.parentNode.insertBefore(this.placeholder, this.el);
            this.eventListener = this.tick.bind(this);
            this.offsetTop = document.getElementById("page-header").getBoundingClientRect().height;

            document.addEventListener("storeChanged", this.eventListener);
            STICKY_EVENTS.forEach(event =>
            {
                window.addEventListener(event, this.eventListener);
            });

            this.enabled = true;
            this.calculateOffset();
            this.tick();
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
        this.animationFrame = 0;
        this.enabled = false;

    }

    tick()
    {
        if (this.enabled)
        {
            if (this.animationFrame > 0)
            {
                cancelAnimationFrame(this.animationFrame);
            }

            this.animationFrame = requestAnimationFrame(() =>
            {
                this.checkElement();
                this.updateStyles();
                this.animationFrame = 0;
            });
        }
    }

    checkElement(skipOffsetCalculation)
    {
        const oldValue          = this.position || {};
        const elementRect       = this.el.getBoundingClientRect();
        const placeholderRect   = this.placeholder.getBoundingClientRect();
        const containerRect     = this.getContainerElement().getBoundingClientRect();
        const maxBottom         = Math.min(containerRect.bottom - elementRect.height - this.offsetTop - this.offsetBottom, 0);

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
    }

    calculateOffset()
    {
        if (!this.enabled)
        {
            return;
        }
        this.offsetTop = document.getElementById("page-header").getBoundingClientRect().height;
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
            zIndex: null
        };

        let placeholderStyles = {
            paddingTop: null
        };

        if (this.position.isSticky)
        {
            styles = {
                position:   "fixed",
                top:        this.position.y + "px",
                left:       this.position.x + "px",
                width:      this.position.width + "px",
                zIndex:     1
            };

            placeholderStyles = {
                paddingTop: this.position.height + "px"
            };
        }

        applyStyles(this.el, styles);
        applyStyles(this.placeholder, placeholderStyles);
    }

    checkMinWidth()
    {
        const oldValue = this.isMinWidth;

        if (window.matchMedia("(min-width: " + this.minWidth + "px)").matches)
        {
            this.isMinWidth = false;
            if (oldValue)
            {
                this.enable();
            }
        }
        else
        {
            this.isMinWidth = true;
            if (!oldValue)
            {
                this.disable();
            }
        }
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
        return this.el.parentElement;
    }

    destroy()
    {
        window.removeEventListener("resize", this.resizeListener);
        const idx = this.getSiblingStickies().indexOf(this);

        if (idx >= 0)
        {
            this.el.parentElement.__stickyElements.splice(idx, 1);
        }
    }
}
