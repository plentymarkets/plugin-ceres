const state =
    {
        testField: ""
    };

const mutations =
    {
        updateField(state, text)
        {
            state.testField = text;
        }
    };

const actions =
    {
        updateField({commit, state}, text)
        {
            commit("updateField", text);
        }
    };

export default
{
    state,
    mutations,
    actions
};
