import Vue from "vue";
import ApiService from "../../services/ApiService";
import { isDefined } from "../../helper/utils";

class SidenavigationChildrenLoader
{
    constructor(element, categoryId, currentUrl, isActive, showItemCount, childCount, openClassName)
    {
        this.categoryId = categoryId;
        this.element = element;
        this.currentUrl = currentUrl;
        this.showItemCount = showItemCount;
        this.childCount = childCount;
        this.openClassName = openClassName || "is-open";

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

    createElement(tag, classes, width, innerText, child)
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

        element.innerText = innerText;

        if (isDefined(child))
        {
            element.appendChild(child);
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
                            Math.floor((Math.random() * 20) + 10) + "%", "."))));

            this.placeholders.push(placeholder);
            this.parent.appendChild(placeholder);
        }
    }

    removePlaceholder()
    {
        for (const placeholder of this.placeholders)
        {
            placeholder.remove();
        }
    }

    loadChildren()
    {
        return new Promise(resolve =>
        {
            ApiService.get("/rest/io/categorytree/template_for_children", {
                categoryId: this.categoryId,
                currentUrl: this.currentUrl,
                showItemCount: this.showItemCount ? 1 : 0
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
        const elements = fragment.children;
        const data = [];

        for (const element of elements)
        {
            data.push(element.outerHTML);
        }

        return data;
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

        const sidenavigationChildrenLoader = new SidenavigationChildrenLoader(
            el,
            categoryId,
            currentUrl,
            isActive,
            showItemCount,
            childCount
        );

        el.addEventListener("click", () =>
        {
            sidenavigationChildrenLoader.toggle();
        });
    }
});
