import {renderItems}from "services/CategoryRendererService";

Vue.directive("render-category",
    {
        bind()
        {
            this.el.addEventListener("click", event =>
            {
                event.preventDefault();
                window.ceresStore.dispatch("setCurrentCategoryById", {categoryId: parseInt(this.expression)});
                renderItems();
            });
        }
    });
