import store from "../../store/index";
import {isNullOrUndefined}from "../../helper/utils";

const navigateToCategoryById = (element, event) =>
{
    let url;

    store.dispatch("selectCategory", {categoryId: parseInt(element.dataset.categoryId), withReload: true});

    if (isNullOrUndefined(store.state.navigation.currentCategory) && event.target && event.target.href)
    {
        url = event.target.href;
    }
    else
    {
        url = store.state.navigation.currentCategory.url;
    }

    if (!isNullOrUndefined(url))
    {
        window.open(url, "_self");
    }
};

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
                            navigateToCategoryById(el, event);
                        }
                    }
                    else
                    {
                        navigateToCategoryById(el, event);
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
