import Vue from "vue";
import ApiService from "../../services/ApiService";
import { isDefined, isNull } from "../../helper/utils";

class SidenavigationChildrenLoader
{
    constructor(element, categoryId, currentUrl, isActive, showItemCount, childCount, openClassName, spacingPadding, inlinePadding)
    {
        this.categoryId = categoryId;
        this.element = element;
        this.currentUrl = currentUrl;
        this.showItemCount = showItemCount;
        this.childCount = childCount;
        this.openClassName = openClassName || "is-open";
        this.spacingPadding = spacingPadding || "";
        this.inlinePadding = inlinePadding || "";

        this.template = "";
        this.placeholders = [];

        if (isActive)
        {
            this.firstChildrenLoad = true;
            setTimeout(() =>
            {
                this.parent.classList.add(this.openClassName);
            }, 0);
        }
    }

    get parent()
    {
        return this.element.parentElement;
    }

    createElement(tag, classes, width, innerText, child, spacingPadding, inlinePadding)
    {
        const element = document.createElement(tag);

        if (isDefined(classes))
        {
            element.classList.add(classes);
        }

        if (isDefined(width))
        {
            element.style.width = width;
        }

        if (!isNull(innerText))
        {
            element.innerText = innerText;
        }

        if (isDefined(child))
        {
            element.appendChild(child);
        }

        if (isDefined(spacingPadding) && spacingPadding.length > 0)
        {
            const paddingClasses = spacingPadding.split(" ");

            element.classList.add(paddingClasses);
        }

        if (isDefined(inlinePadding) && inlinePadding.length > 0)
        {
            element.style = inlinePadding;
        }

        return element;
    }

    createPlaceholder()
    {
        for (let i = 0; i < this.childCount; i++)
        {
            const placeholder = this.createElement("ul", null, null, null,
                this.createElement("li", "nav-item", null, null,
                    this.createElement("a", "nav-link", null, null,
                        this.createElement("span", "placeholder",
                            Math.floor((Math.random() * 20) + 10) + "%", "."), this.spacingPadding, this.inlinePadding)));

            this.placeholders.push(placeholder);
            this.parent.appendChild(placeholder);
        }
    }

    removePlaceholder()
    {
        for (const placeholder of this.placeholders)
        {
            placeholder.parentNode.removeChild(placeholder);
        }
    }

    loadChildren()
    {
        return new Promise(resolve =>
        {
            ApiService.get("/rest/io/categorytree/template_for_children", {
                categoryId: this.categoryId,
                currentUrl: this.currentUrl,
                showItemCount: this.showItemCount ? 1 : 0,
                spacingPadding: this.spacingPadding,
                inlinePadding: this.inlinePadding
            })
                .then(result =>
                {
                    this.template = result;
                    resolve(this.template);
                });
        });
    }

    createChildren()
    {
        for (const template of this.getSplitMarkup())
        {
            const ul = document.createElement("ul");

            this.parent.appendChild(ul);

            // IE11 linebreak entity in string bricks vue compile
            while (template.includes("&#10;"))
            {
                template = template.replace("&#10;", "");
            }

            const compiled = Vue.compile(template);

            new Vue({
                store: window.ceresStore,
                render: compiled.render,
                staticRenderFns: compiled.staticRenderFns
            }).$mount(ul);
        }
    }

    getSplitMarkup()
    {
        const fragment = document.createRange().createContextualFragment(this.template);
        const elements = fragment.childNodes;
        const children = [];

        let i = 0;

        let node;

        while (node = elements[i++])
        {
            if (node.nodeType === 1)
            {
                children.push(node.outerHTML);
            }
        }

        return children;
    }

    toggle()
    {
        if (!this.firstChildrenLoad)
        {
            this.firstChildrenLoad = true;
            this.createPlaceholder();
            this.loadChildren().then(() =>
            {
                this.removePlaceholder();
                this.createChildren();
            });
        }

        this.parent.classList.toggle(this.openClassName);
    }
}

Vue.directive("sidenavigation-children", {
    bind(el, binding)
    {
        const categoryId = binding.value.categoryId;
        const currentUrl = binding.value.currentUrl;
        const isActive   = binding.value.isActive;
        const showItemCount = binding.value.showItemCount;
        const childCount = binding.value.childCount;
        const openClassName = binding.value.openClassName;
        const spacingPadding = binding.value.spacingPadding;
        const inlinePadding = binding.value.inlinePadding;

        const sidenavigationChildrenLoader = new SidenavigationChildrenLoader(
            el,
            categoryId,
            currentUrl,
            isActive,
            showItemCount,
            childCount,
            openClassName,
            spacingPadding,
            inlinePadding
        );

        el.addEventListener("click", () =>
        {
            sidenavigationChildrenLoader.toggle();
        });
    }
});
