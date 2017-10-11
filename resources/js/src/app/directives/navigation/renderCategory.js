Vue.directive("render-category",
    {
        bind(el, binding)
        {
            el.onclick = function(event)
            {
                event.preventDefault();

                window.ceresStore.dispatch("selectCategory", {categoryId: parseInt(binding.value)});

                if (!App.isCategoryView)
                {
                    const url = window.ceresStore.state.navigation.currentCategory.url;

                    window.open(url, "_self");
                }
            };
        }
    });
