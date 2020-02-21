import { isNullOrUndefined } from "./utils";

/**
 * Get first parent element which matches a given selector
 *
 * @param {HTMLElement}     element           The element to get the parent for
 * @param {string}          parentSelector    Selector to match parent element
 *
 * @returns {HTMLElement}
 */
export function findParent(element, parentSelector)
{
    // eslint-disable-next-line brace-style
    while ((element = element.parentElement) && !is(element, parentSelector)) {}
    return element;
}

/**
 * Check if element matches a given selector
 *
 * @param {HTMLElement} element   The element to check
 * @param {string}      selector  The selector to match on given element
 *
 * @returns {boolean}
 */
// eslint-disable-next-line complexity
export function is(element, selector)
{
    // polyfill from https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
    if (!Element.prototype.matches)
    {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(sel)
            {
                const matches = (this.document || this.ownerDocument).querySelectorAll(sel);

                let i = matches.length;

                // eslint-disable-next-line brace-style
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    return element.matches(selector);
}

/**
 * Get the width of a specified text depending on the font-family
 *
 * @param {string} text
 * @param {string} fontFamily
 *
 * @returns {integer}
 */
export function textWidth(text, fontFamily)
{
    const tag = document.createElement("div");

    tag.style.position = "absolute";
    tag.style.left = "-99in";
    tag.style.whiteSpace = "nowrap";
    tag.style.font = fontFamily;
    tag.innerHTML = text;

    document.body.appendChild(tag);

    const result = tag.clientWidth;

    document.body.removeChild(tag);

    return result;
}

export function applyStyles(el, styles)
{
    Object.keys(styles).forEach(key =>
    {
        const value = styles[key];

        if (isNullOrUndefined(value))
        {
            const propertyName = key.replace(/[A-Z]/g, match => "-" + match.toLowerCase());

            el.style.removeProperty(propertyName);
        }
        else
        {
            el.style[key] = value;
        }
    });
}

export function getStyle(el, styleProp)
{
    let value;

    if (window.getComputedStyle)
    {
        value = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    }
    else if (el.currentStyle)
    {
        value = el.currentStyle[styleProp];
    }

    return value;
}
