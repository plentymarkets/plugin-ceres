import store from "store/index.js";

Vue.directive("render-category",
    {
        bind(el, binding)
        {
            el.onclick = event =>
            {
                event.preventDefault();

                const currentCategoryType = store.state.navigation.currentCategory ? store.state.navigation.currentCategory.type : null;

                if (!App.isCategoryView || currentCategoryType !== binding.value.type)
                {
                    store.dispatch("selectCategory", {categoryId: binding.value.id, withReload: true});

                    const url = store.state.navigation.currentCategory.url;

                    window.open(url, "_self");
                }
                else
                {
                    store.dispatch("selectCategory", {categoryId: binding.value.id});
                }
            };
        }
    });
