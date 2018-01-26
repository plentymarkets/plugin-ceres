import {updateCategoryHtml}from "services/CategoryService";

const state =
    {
        tree: [],
        currentCategory: null
    };

const mutations =
    {
        setNavigationTree(state, navigationTree)
        {
            state.tree = navigationTree;
        },

        setCurrentCategory(state, category)
        {
            state.currentCategory = category;
        }
    };

const actions =
    {
        initNavigationTree({dispatch, commit}, navigationTree)
        {
            if (navigationTree)
            {
                dispatch("buildNavigationTreeItem", {navigationTree});
            }

            commit("setNavigationTree", navigationTree);
        },

        buildNavigationTreeItem({state, commit, dispatch}, {navigationTree, parent})
        {
            let showChildren = false;

            for (const category of navigationTree)
            {
                category.parent = parent;

                // hide category if there is no translation
                if (!category.details[0])
                {
                    category.hideCategory = true;
                }
                else
                {
                    const parentUrl = parent ? parent.url : "";

                    category.url = parentUrl + "/" + category.details[0].nameUrl;
                    showChildren = true;

                    if (category.children)
                    {
                        dispatch("buildNavigationTreeItem", {navigationTree: category.children, parent: category});
                    }
                }
            }

            if (parent)
            {
                parent.showChildren = showChildren;
            }
        },

        selectCategory({state, commit, dispatch}, {category, categoryId, withReload})
        {
            if (category)
            {
                commit("setCurrentCategory", category);
            }
            else if (categoryId)
            {
                dispatch("setCurrentCategoryById", {categoryId});
            }

            if (!withReload)
            {
                updateCategoryHtml();

                commit("setItemListPage", 1);
                commit("setSelectedFacetsByIds", []);

                dispatch("retrieveItemList");
            }
        },

        setCurrentCategoryById({state, commit, dispatch}, {categoryId, categories})
        {
            categories = categories || state.tree;

            for (const category of categories)
            {
                if (category.id === categoryId)
                {
                    commit("setCurrentCategory", category);
                    return;
                }
                else if (category.children)
                {
                    dispatch("setCurrentCategoryById", {categoryId, categories: category.children});
                }
            }
        }
    };

const getters =
    {
        breadcrumbs(state)
        {
            const breadcrumbs = [];

            if (state.currentCategory)
            {
                let currentIteration = state.currentCategory;

                while (currentIteration)
                {
                    breadcrumbs.unshift(currentIteration);
                    currentIteration = currentIteration.parent;
                }
            }

            return breadcrumbs;
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
