import { isNullOrUndefined } from "../../helper/utils";

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

const applyStyles = function(el, styles)
{
    Object.keys(styles).forEach(key =>
    {
        const value = styles[key];

        if (isNullOrUndefined(value))
        {
            el.style.removeProperty(key);
        }
        else
        {
            el.style[key] = value;
        }
    });
};

class StickyElement
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
    }

    enable()
    {
        this.vm.$nextTick(() =>
        {
            if (this.enabled || this.isMinWidth)
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
            this.tick();
        });
    }

    disable()
    {
        this.vm.$nextTick(() =>
        {
            if (!isNullOrUndefined(this.placeholder))
            {
                this.el.parentElement.removeChild(this.placeholder);
            }
            this.placeholder = null;
        });

        applyStyles(this.el, {
            position: null,
            top: null,
            left: null,
            width: null
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

    checkElement()
    {
        const elementRect = this.el.getBoundingClientRect();
        const placeholderRect = this.placeholder.getBoundingClientRect();
        const containerRect = this.el.parentElement.getBoundingClientRect();
        const maxBottom = Math.min(containerRect.bottom - elementRect.height - this.offsetTop, 0);

        this.position = {
            height: elementRect.height,
            width: placeholderRect.width,
            // eslint-disable-next-line id-length
            x: placeholderRect.left,
            // eslint-disable-next-line id-length
            y: maxBottom + this.offsetTop,
            isSticky: elementRect.height < containerRect.height && placeholderRect.top <= this.offsetTop
        };
    }

    updateStyles()
    {
        let styles = {
            position: null,
            top: null,
            left: null,
            width: null
        };

        let placeholderStyles = {
            "padding-top": null
        };

        if (this.position.isSticky)
        {
            styles = {
                position:   "fixed",
                top:        this.position.y + "px",
                left:       this.position.x + "px",
                width:      this.position.width + "px"
            };

            placeholderStyles = {
                "padding-top": this.position.height + "px"
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

    destroy()
    {
        window.removeEventListener("resize", this.resizeListener);
    }
}

Vue.directive("stick-in-parent",
    {
        bind(el, binding, vnode)
        {
            el.__sticky = new StickyElement(
                el,
                vnode.context,
                parseInt(binding.arg) || 768
            );

            if (binding.value === false)
            {
                el.__sticky.disable();
            }
            else
            {
                el.__sticky.enable();
            }
        },
        update(el, binding)
        {
            if (!isNullOrUndefined(el.__sticky))
            {
                el.__sticky.minWidth = parseInt(binding.arg) || 768;
                if (binding.value === false)
                {
                    el.__sticky.disable();
                }
                else
                {
                    el.__sticky.enable();
                }
                el.__sticky.checkMinWidth();
            }
        },
        unbind(el)
        {
            if (!isNullOrUndefined(el.__sticky))
            {
                el.__sticky.destroy();
                el.__sticky = null;
            }
        }
    });
