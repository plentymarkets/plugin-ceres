const state = () => ({
    components: {
        // comp tag -> loaded bool
    }
});

const mutations =
    {
        setComponent(state, { component, loaded })
        {
            Vue.set(state.components, component, loaded);
        }
    };

const actions =
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
