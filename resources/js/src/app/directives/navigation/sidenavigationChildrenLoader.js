import Vue from "vue";
import ApiService from "../../services/ApiService";

class SidenavigationChildrenLoader
{
    constructor(element, categoryId, currentUrl, isActive, showItemCount, openClassName)
    {
        this.categoryId = categoryId;
        this.element = element;
        this.currentUrl = currentUrl;
        this.showItemCount = showItemCount;
        this.openClassName = openClassName || "is-open";

        this.template = "";

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

    loadChildren()
    {
        return new Promise(resolve =>
        {
            ApiService.get("/rest/io/categorytree/children", {
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
            this.loadChildren().then(() =>
            {
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

        const sidenavigationChildrenLoader = new SidenavigationChildrenLoader(
            el,
            categoryId,
            currentUrl,
            isActive,
            showItemCount
        );

        el.addEventListener("click", () =>
        {
            sidenavigationChildrenLoader.toggle();
        });
    }
});
