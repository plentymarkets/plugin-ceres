import { isNullOrUndefined } from "../../helper/utils";

const ApiService = require("../../services/ApiService");

const state = () => ({
    tree: [],
    cachedTrees: {},
    currentCategory: null,
    categoryChildren: []
});

const mutations =
    {
        setNavigationTree(state, navigationTree)
        {
            state.tree = navigationTree;
        },

        setCurrentCategory(state, category)
        {
            state.currentCategory = category;
        },

        addCachedPartialTree(state, { tree, categoryId })
        {
            state.cachedTrees[categoryId] = tree;
        },

        addCategoryChildren(state, children)
        {
            for (const category of children)
            {
                if (!state.categoryChildren.find(cat => cat.id === category.id))
                {
                    state.categoryChildren.push(category);
                }
            }
        }
    };

const actions =
    {
        loadPartialNavigationTree({ dispatch, commit, state }, categoryId)
        {
            return new Promise((resolve, reject) =>
            {
                if (isNullOrUndefined(state.cachedTrees[categoryId]))
                {
                    ApiService
                        .get("/rest/io/categorytree", { type: App.config.header.showCategoryTypes, categoryId })
                        .done(response =>
                        {
                            dispatch("buildNavigationTreeItem", { navigationTree: response });
                            commit("addCachedPartialTree", { tree: response, categoryId });
                            resolve(response);
                        })
                        .fail(error =>
                        {
                            reject(error);
                        });
                }
                else
                {
                    resolve(state.cachedTrees[categoryId]);
                }
            });
        },

        buildNavigationTreeItem({ dispatch }, { navigationTree, parent })
        {
            for (const category of navigationTree)
            {
                category.parent = parent;

                if (category.children)
                {
                    dispatch("buildNavigationTreeItem", { navigationTree: category.children, parent: category });
                }
            }
        },

        setCurrentCategoryById({ state, commit, dispatch }, { categoryId, categories })
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
                    dispatch("setCurrentCategoryById", { categoryId, categories: category.children });
                }
            }
        },

        loadCategoryChildrenChunk({ state, commit }, { categoryId, size })
        {
            return new Promise((resolve, reject) =>
            {
                ApiService
                    .get("/rest/io/categorytree/children", { categoryId, indexStart: state.categoryChildren.length, maxCount: size })
                    .done(response =>
                    {
                        commit("addCategoryChildren", response);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
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
