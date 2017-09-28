const ItemListService = require("services/ItemListService");
const ApiService = require("services/ApiService");
let _categoryTree = {};
let firstInitDone = false;

/**
 * render items in relation to location
 * @param currentCategory
 */
export function renderItems()
{
    const currentCategory = window.ceresStore.state.navigation.currentCategory;

    $("body").removeClass("menu-is-visible");

    if ($.isEmptyObject(_categoryTree))
    {
        _categoryTree = window.ceresStore.state.navigation.tree;
    }

    if (!App.isCategoryView)
    {
        window.open(currentCategory.url, "_self");
    }
    else if (currentCategory.details.length)
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
    const currentCategory = window.ceresStore.state.navigation.currentCategory;

    _removeTempDesc();
    _updateItemList(currentCategory);
    _updateHistory(currentCategory);
}

/**
 * update the current item list without reloading
 * @param currentCategory
 */
function _updateItemList(currentCategory)
{
    ItemListService.setCategoryId(currentCategory.id);

    window.ceresStore.dispatch("selectItemListPage", 1);
    // ItemListService.setPage(1);
    window.ceresStore.dispatch()
    // ItemListService.getItemList();
}

/**
 * update page informations
 * @param currentCategory
 */
function _updateHistory(currentCategory)
{
    var title = document.getElementsByTagName("title")[0].innerHTML;

    window.history.replaceState({}, title, currentCategory.url + window.location.search);

    _updateCategoryTexts(currentCategory);
}

function _removeTempDesc()
{
    const tempDesc = document.querySelector(".category-description");

    if (tempDesc)
    {
        tempDesc.innerHTML = "";
    }
}

function _updateCategoryTexts(currentCategory)
{
    document.querySelector(".category-title").innerHTML = currentCategory.details[0].name;
    document.title = currentCategory.details[0].name + " | " + App.config.shopName;

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

    const categoryDescContainer = document.querySelector(".category-description");

    if (categoryDescContainer)
    {
        ApiService.get("/rest/io/category/description/" + currentCategory.id)
        .done(response =>
        {
            if (typeof response !== "object")
            {
                categoryDescContainer.innerHTML = response;
            }
        });
    }
}

function _firstRendering()
{
    const twigBreadcrumbs = document.querySelector("#twig-rendered-breadcrumbs");

    twigBreadcrumbs.parentElement.removeChild(twigBreadcrumbs);

    document.querySelector("#vue-rendered-breadcrumbs").style.removeProperty("display");
}

export default {
    renderItems
};
