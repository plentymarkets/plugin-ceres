import Vue from "vue";
import { isNullOrUndefined } from "./app/helper/utils";

const originalMountFn = Vue.prototype.$mount;

/**
 * Custom mount function to inject component template from theme plugins before mounting vue components.
 *
 * @param {Element} el
 * @param {boolean} hydrating
 * @returns {Vue}
 */
export default function(el, hydrating)
{
    let componentTemplate;

    if (this.$props.templateOverride)
    {
        // template element is references from property for current component instance
        const rawTemplate = (document.querySelector(this.$props.templateOverride) || {}).innerHTML;

        if (isNullOrUndefined(rawTemplate))
        {
            console.warn("Overriding a component template has failed. Did you import the template into the DOM?");
        }
        else
        {
            componentTemplate = replaceDelimiters(rawTemplate);
        }
    }
    else
    {
        // check for global template override
        componentTemplate = getComponentTemplate(this.$options._componentTag);
    }

    if (componentTemplate)
    {
        Object.assign(
            this.$options,
            Vue.compile(componentTemplate)
        );
    }

    return originalMountFn.call(this, el, hydrating);
}

/**
 * Collection of custom vue component templates read from script elements on first mount.
 *
 * @type {?Object<string,string>}
 */
let componentTemplates = null;

/**
 * Read component templates from script elements.
 * Query elements only once on first component mount
 *
 * @param {string} tagName
 * @returns {string}
 */
function getComponentTemplate(tagName)
{
    if (isNullOrUndefined(componentTemplates))
    {
        componentTemplates = [].slice.call(document.querySelectorAll("script[data-component], template[data-component]"))
            .reduce(
                (obj, el) =>
                {
                    return {
                        ...obj,
                        [el.dataset.component]: replaceDelimiters(el.innerHTML)
                    };
                },
                {}
            );
    }

    return componentTemplates[tagName];
}

/**
 * Replace ES2015 delimiters ['${', '}'] with default vue delimiters ['{{', '}}']
 *
 * @param {string} template
 * @returns {string}
 */
function replaceDelimiters(template)
{
    let posStart = 0;

    const offset = 0;

    let content;

    while ((posStart = template.indexOf("${", offset)) >= 0 && posStart <= template.length)
    {
        // read delimiter content from template starting behind opening delimiter (= posStart + "${".length)
        content = readDelimiterContent(template, posStart + 2);

        /* eslint-disable */
        template = template.substr(0, posStart)               // template content before opening delimiter
            + "{{"                                                  // new opening delimiter
            + content                                               // content between delimiters
            + "}}"                                                  // new closing delimiter
            + template.substr(posStart + content.length + 3); // template content after closing delimiter (skip "${" and "}")
        /* eslint-enable */
    }

    return template;
}

/**
 * Read string until closing delimiter occurs.
 *
 * @param {string} input
 * @param {number} offset
 * @returns string
 */
function readDelimiterContent(input, offset)
{
    let count = 0;

    let i = offset;

    let current;

    while ((current = input.charAt(i)) !== "")
    {
        if (current === "}" && count === 0)
        {
            return input.substr(offset, i - offset);
        }

        if (current === "{")
        {
            count++;
        }
        else if (current === "}")
        {
            count--;
        }
        i++;
    }

    return "";
}
