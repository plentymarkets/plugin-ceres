const state =
    {
        tree: []
    };

const mutations =
    {
        setNavigationTree(state, navigationTree)
        {
            state.tree = navigationTree;
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
        }
    };

const getters =
    {
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
