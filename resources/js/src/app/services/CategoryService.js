import store from "../store/index";
import TranslationService from "services/TranslationService";

const ApiService = require("services/ApiService");
let _categoryTree = {};
let firstInitDone = false;

/**
 * render items in relation to location
 * @param currentCategory
 */
export function updateCategoryHtml()
{
    const currentCategory = store.state.navigation.currentCategory;

    document.querySelector("body").classList.remove("menu-is-visible");

    if ($.isEmptyObject(_categoryTree))
    {
        _categoryTree = store.state.navigation.tree;
    }

    if (App.isCategoryView && currentCategory.details.length)
    {
        if (!firstInitDone)
        {
            firstInitDone = true;
            _firstRendering();
        }

        _handleCurrentCategory();

        document.dispatchEvent(new CustomEvent("afterCategoryChanged", {detail:
        {
            currentCategory,
            categoryTree: _categoryTree
        }}));
    }
}

/**
 * bundle functions
 * @param currentCategory
 */
function _handleCurrentCategory()
{
    const currentCategory = store.state.navigation.currentCategory;

    _removeTempDesc();
    _updateCategoryTexts(currentCategory);
}

function _removeTempDesc()
{
    const tempDesc = document.querySelectorAll("[data-category-description]");

    if (tempDesc)
    {
        _setDescriptions(tempDesc, "");
    }
}

function _updateCategoryTexts(currentCategory)
{
    const categoryTitle = currentCategory.details[0].metaTitle ?
                            currentCategory.details[0].metaTitle :
                            currentCategory.details[0].name;

    const categoryNameElement = document.querySelector(".category-title");

    if (categoryNameElement)
    {
        categoryNameElement.innerHTML = currentCategory.details[0].name;
    }

    document.title = categoryTitle + " | " + TranslationService.translate("Ceres::Template.headerCompanyName");

    _loadOptionalData(currentCategory);
}

function _loadOptionalData(currentCategory)
{
    const categoryImage = currentCategory.details[0].imagePath;
    const parallaxImgContainer = document.querySelector(".parallax-img-container");

    if (parallaxImgContainer)
    {
        if (categoryImage)
        {
            parallaxImgContainer.style.backgroundImage = "url(/documents/" + currentCategory.details[0].imagePath + ")";
        }
        else
        {
            parallaxImgContainer.style.removeProperty("background-image");
        }
    }

    const categoryDesc1Container = document.querySelectorAll("[data-category-description=\"1\"]");
    const categoryDesc2Container = document.querySelectorAll("[data-category-description=\"2\"]");

    const getCategoryDescription1 = categoryDesc1Container.length > 0 ? 1 : 0;
    const getCategoryDescription2 = categoryDesc2Container.length > 0 ? 1 : 0;

    if (getCategoryDescription1 || getCategoryDescription2)
    {
        ApiService.get("/rest/io/category/description/" + currentCategory.id, {description1: getCategoryDescription1, description2: getCategoryDescription2})
        .done(response =>
        {
            if (response.description1)
            {
                _setDescriptions(categoryDesc1Container, response.description1);
            }

            if (response.description2)
            {
                _setDescriptions(categoryDesc2Container, response.description2);
            }
        });
    }
}

function _setDescriptions(elements, description)
{
    for (const element of elements)
    {
        element.innerHTML = description;
    }
}

function _firstRendering()
{
    const twigBreadcrumbs = document.querySelectorAll("[data-component=\"breadcrumbs\"][data-renderer=\"twig\"]");
    const vueBreadcrumbs = document.querySelectorAll("[data-component=\"breadcrumbs\"][data-renderer=\"vue\"]");

    for (let i = 0; i < twigBreadcrumbs.length; i++)
    {
        twigBreadcrumbs[i].remove();
    }

    for (let j = 0; j < vueBreadcrumbs.length; j++)
    {
        vueBreadcrumbs[j].style.removeProperty("display");
    }
}

export default {
    updateCategoryHtml
};
