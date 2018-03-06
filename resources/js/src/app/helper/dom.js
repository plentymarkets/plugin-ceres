export function findParent(element, parentSelector)
{
    // eslint-disable-next-line brace-style
    while ((element = element.parentElement) && !element.matches(parentSelector)) {}
    return element;
}

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
