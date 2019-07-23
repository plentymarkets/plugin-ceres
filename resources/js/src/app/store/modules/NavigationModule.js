import { isNullOrUndefined } from "../../helper/utils";

const ApiService = require("services/ApiService");

const state =
    {
        tree: [],
        cachedTrees: {},
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
        },

        addCachedPartialTree(state, { tree, categoryId })
        {
            state.cachedTrees[categoryId] = tree;
        }
    };

const actions =
    {
        loadNavigationTree({ dispatch }, categoryId = null )
        {
            return new Promise((resolve, reject) =>
            {
                ApiService
                    .get("/rest/io/categorytree", { type: App.config.header.showCategoryTypes, categoryId })
                    .done(response =>
                    {
                        dispatch("initNavigationTree", response);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        },

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
                            commit("addCachedPartialTree", { tree: response, categoryId });
                            dispatch("initNavigationTree", response);
                            resolve(response);
                        })
                        .fail(error =>
                        {
                            reject(error);
                        });
                }
                else
                {
                    dispatch("initNavigationTree", state.cachedTrees[categoryId]);
                    resolve(state.cachedTrees[categoryId]);
                }
            });
        },

        initNavigationTree({ dispatch, commit }, navigationTree)
        {
            if (navigationTree)
            {
                dispatch("buildNavigationTreeItem", { navigationTree });
            }

            commit("setNavigationTree", navigationTree);
        },

        buildNavigationTreeItem({ state, commit, dispatch }, { navigationTree, parent })
        {
            let showChildren = false;

            for (const category of navigationTree)
            {
                category.parent = parent;

                // hide category if there is no translation
                // if (!category.details[0])
                // {
                //     category.hideCategory = true;
                // }
                // else
                // {
                //     let parentUrl = "";

                //     if (parent)
                //     {
                //         parentUrl = parent.url;

                //         if (App.urlTrailingSlash)
                //         {
                //             parentUrl = parentUrl.substring(0, parentUrl.length - 1);
                //         }
                //     }
                //     else if (App.defaultLanguage != category.details[0].lang)
                //     {
                //         parentUrl = "/" + category.details[0].lang;
                //     }

                //     category.url = parentUrl + "/" + category.details[0].nameUrl;

                //     if (App.urlTrailingSlash)
                //     {
                //         category.url += "/";
                //     }

                showChildren = true;

                if (category.children)
                {
                    dispatch("buildNavigationTreeItem", { navigationTree: category.children, parent: category });
                }
            }

            if (parent)
            {
                parent.showChildren = showChildren;
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
