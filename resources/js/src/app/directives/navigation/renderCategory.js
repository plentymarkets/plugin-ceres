import store from "store/index.js";

Vue.directive("render-category",
    {
        bind(el, binding)
        {
            el.onclick = function(event)
            {
                event.preventDefault();

                store.dispatch("selectCategory", {categoryId: parseInt(binding.value)});

                if (!App.isCategoryView)
                {
                    const url = store.state.navigation.currentCategory.url;

                    window.open(url, "_self");
                }
            };
        }
    });
