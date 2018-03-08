import store from "store/index.js";

Vue.directive("render-category",
    {
        bind(el, binding)
        {
            el.dataset.categoryId = binding.value.id;
            el.dataset.categoryType = binding.value.type;
            el.onclick = event =>
            {
                event.preventDefault();

                const currentCategoryType = store.state.navigation.currentCategory ? store.state.navigation.currentCategory.type : null;

                if (!App.isCategoryView || currentCategoryType !== el.dataset.categoryType)
                {
                    store.dispatch("selectCategory", {categoryId: parseInt(el.dataset.categoryId), withReload: true});

                    const url = store.state.navigation.currentCategory.url;

                    window.open(url, "_self");
                }
                else
                {
                    store.dispatch("selectCategory", {categoryId: parseInt(el.dataset.categoryId)});
                }
            };
        },
        update(el, binding)
        {
            el.dataset.categoryId = binding.value.id;
            el.dataset.categoryType = binding.value.type;
        }
    });
