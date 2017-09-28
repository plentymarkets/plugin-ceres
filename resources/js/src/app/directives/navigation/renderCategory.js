Vue.directive("render-category",
    {
        bind()
        {
            this.el.addEventListener("click", event =>
            {
                event.preventDefault();

                if (!App.isCategoryView)
                {
                    window.ceresStore.dispatch("setCurrentCategoryById", {categoryId: parseInt(this.expression)});
                    const url = window.ceresStore.state.navigation.currentCategory.url;

                    window.open(url, "_self");
                }
                else
                {
                    window.ceresStore.dispatch("selectCategory", {categoryId: parseInt(this.expression)});
                }
            });
        }
    });
