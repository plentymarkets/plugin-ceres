import Vue from "vue";
import { isNullOrUndefined } from "./app/helper/utils";
import { compileToFunctions, ssrCompileToFunctions } from "vue-template-compiler";

const kebabCase = require("lodash/kebabCase");

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
    return originalComponentFn.call(this, id, applyOverride(definition, id));
}

/**
 * Compile and assign custom template to component if defined.
 * Recursively apply overrides for defined child components.
 *
 * @param {Object|Function} component The vue component to apply the override to.
 * @param {string} name Tag name of the component. Used to query custom templates by. If not defined, the name property of the component object will be used. (Optional)
 */
function applyOverride(component, name)
{
    // use ssr optimized compiler function if document is not defined
    const compileFn = typeof document !== "undefined" ? compileToFunctions : ssrCompileToFunctions;

    if (typeof component === "object")
    {
        if (component.components)
        {
            applyOverrideToChildren(component);
        }

        const customTemplate = getComponentTemplate(name || component.name);

        // overridden component is defined in the common way: Vue.component('...', { ... })
        return Object.assign(
            component,
            customTemplate ? compileFn(customTemplate) : {}
        );
    }
    else if (typeof component === "function")
    {
        // overridden component is defined asynchronously
        return () =>
        {
            // invoke async loading function
            const asyncComponent = component();
            const customTemplate = getComponentTemplate(name || component.name);

            if (asyncComponent instanceof Promise)
            {
                return asyncComponent.then((module) =>
                {
                    if (module.default.components)
                    {
                        applyOverrideToChildren(module.default);
                    }

                    if (customTemplate)
                    {
                        // override template after resolving external chunk
                        delete module.default.render;
                        module.default.template = replaceDelimiters(customTemplate);
                    }

                    return module;
                });
            }
            else
            {
                // may never gets called
                if (asyncComponent && asyncComponent.components)
                {
                    applyOverrideToChildren(asyncComponent);
                }

                if (customTemplate)
                {
                    // override component definition of already loaded async component
                    Object.assign(
                        asyncComponent,
                        compileFn(customTemplate)
                    );
                }

                return asyncComponent;
            }
        };
    }

    return component;
}

/**
 * Check if component has the components field set and calls applyOverride for each entry.
 * @param {Object} component
 * @return {Object}
 */
function applyOverrideToChildren(component)
{
    component.components = Object.keys(component.components).reduce((components, key) =>
    {
        return {
            ...components,
            [key]: applyOverride(component.components[key], kebabCase(key))
        };
    }, {});

    return component;
}

/**
 * Get overridden template for a vue component.
 * During ssr templates are queried from global object, during clientside render related script tags will be queried.
 * @param {string} templateOverride The component tag to get the override for
 * @return {string}
 */
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
            componentTemplates = Object.keys(templates || {}).reduce((result, key) =>
            {
                return {
                    ...result,
                    [key]: replaceDelimiters(templates[key])
                };
            }, {});
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
