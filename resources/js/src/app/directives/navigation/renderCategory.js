Vue.directive("render-category",
    {
        bind()
        {
            this.el.addEventListener("click", event =>
            {
                event.preventDefault();

                window.ceresStore.dispatch("selectCategory", {categoryId: parseInt(this.expression)});
                
                if (!App.isCategoryView)
                {
                    const url = window.ceresStore.state.navigation.currentCategory.url;

                    window.open(url, "_self");
                }
            });
        }
    });
