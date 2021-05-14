import Vue from "vue";
import { isNullOrUndefined } from "./app/helper/utils";
import { compileToFunctions, ssrCompileToFunctions } from "vue-template-compiler";

const originalMountFn = Vue.prototype.$mount;
const originalComponentFn = Vue.component;

/**
 * Custom mount function to inject component template from theme plugins before mounting vue components.
 *
 * @param {Element} el
 * @param {boolean} hydrating
 * @returns {Vue}
 */
function mount(el, hydrating)
{
    let componentTemplate;

    if (this.$props && this.$props.templateOverride)
    {
        // template element is references from property for current component instance
        const rawTemplate = getTemplateOverride(this.$props.templateOverride);

        if (isNullOrUndefined(rawTemplate))
        {
            console.warn("Overriding a component template has failed. Did you import the template into the DOM?");
        }
        else
        {
            componentTemplate = replaceDelimiters(rawTemplate);
        }
    }
    else if (this.$options && this.$options._componentTag)
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
 * Custom component function the override template before registering the component.
 * @param {string}          id          Id/selector of the component
 * @param {object|function} definition  Component definition or async load callback.
 * @return {*}
 */
function component(id, definition)
{
    const customTemplate = getComponentTemplate(id);
    const compileFn = typeof document !== "undefined" ? compileToFunctions : ssrCompileToFunctions;

    let newDefinition = definition;

    if (customTemplate)
    {
        if (typeof definition === "object")
        {
            newDefinition = Object.assign(
                definition,
                compileFn(customTemplate)
            );
        }
        else if (typeof definition === "function")
        {
            newDefinition = () =>
            {
                const asyncComponent = definition();

                if (asyncComponent instanceof Promise)
                {
                    return asyncComponent.then((module) =>
                    {
                        delete module.default.render;
                        module.default.template = replaceDelimiters(customTemplate);
                        return module;
                    });
                }
                else
                {
                    Object.assign(
                        asyncComponent,
                        compileFn(customTemplate)
                    );
                    return asyncComponent;
                }
            };
        }
    }

    return originalComponentFn.call(this, id, newDefinition);
}

function getTemplateOverride(templateOverride)
{
    if (typeof document !== "undefined")
    {
        return (document.querySelector(templateOverride) || {}).innerHTML;
    }
    else if (typeof templates !== "undefined")
    {
        return templates[templateOverride];
    }

    return "";
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
        if (typeof document !== "undefined")
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
        else if (typeof templates !== "undefined")
        {
            componentTemplates = templates;
        }
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

export { mount, component };
