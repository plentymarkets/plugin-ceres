const state =
    {
        components:
        {
            // comp tag -> loaded bool
        }
    };

const actions =
    {
        setComponent(state, { component, loaded })
        {
            state.components[component] = loaded;
        }
    };

const mutations =
    {
        loadComponent({ commit }, component)
        {
            commit("setComponent", { component, loaded: true });
        },

        addComponent({ commit }, component)
        {
            commit("setComponent", { component, loaded: false });
        }
    };

export default
{
    state,
    actions,
    mutations
};
