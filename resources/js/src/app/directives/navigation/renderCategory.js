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

                // get currently open category
                const ddownElements = [].slice.call(document.getElementsByClassName("ddown"));
                const openCategory = ddownElements.find(element => element.classList.contains("hover"));

                if (!App.isCategoryView || currentCategoryType !== el.dataset.categoryType)
                {
                    store.dispatch("selectCategory", {categoryId: parseInt(el.dataset.categoryId), withReload: true});

                    const url = store.state.navigation.currentCategory.url;

                    // check if touch device and change the ui handling
                    if (document.body.classList.contains("touch"))
                    {
                        if (openCategory && openCategory.contains(event.target) || binding.value.isMobileNavigation)
                        {
                            window.open(url, "_self");
                        }
                    }
                    else
                    {
                        window.open(url, "_self");
                    }
                }
                // check if user click the opened category and change the ui handling
                else if (openCategory && openCategory.contains(event.target))
                {
                    store.dispatch("selectCategory", {categoryId: parseInt(el.dataset.categoryId)});
                }
                else if (document.body.classList.contains("no-touch") || binding.value.isMobileNavigation)
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
