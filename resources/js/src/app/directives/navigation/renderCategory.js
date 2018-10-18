import store from "store/index.js";
import {isNullOrUndefined}from "../../helper/utils";

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

                if (!App.isCategoryView || currentCategoryType !== el.dataset.categoryType || currentCategoryType === "content")
                {
                    // check if touch device and change the ui handling
                    if (document.body.classList.contains("touch"))
                    {
                        if (openCategory && openCategory.contains(event.target) || binding.value.alwaysOpen)
                        {
                            store.dispatch("selectCategory", {categoryId: parseInt(el.dataset.categoryId), withReload: true});
                            window.open(store.state.navigation.currentCategory.url, "_self");
                        }
                    }
                    else
                    {
                        store.dispatch("selectCategory", {categoryId: parseInt(el.dataset.categoryId), withReload: true});
                        window.open(store.state.navigation.currentCategory.url, "_self");
                    }
                }
                // check if user click the opened category and change the ui handling
                else if ((openCategory && openCategory.contains(event.target)) || document.body.classList.contains("no-touch") || binding.value.alwaysOpen)
                {
                    store.dispatch("selectCategory", {categoryId: parseInt(el.dataset.categoryId)});

                    if (!isNullOrUndefined(binding.value.scrollToTop) && !isNaN(binding.value.scrollToTop))
                    {
                        $("html, body").animate({scrollTop: 0}, binding.value.scrollToTop);
                    }
                }
            };
        },
        update(el, binding)
        {
            el.dataset.categoryId = binding.value.id;
            el.dataset.categoryType = binding.value.type;
        }
    });
