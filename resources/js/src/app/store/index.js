// import test from "store/modules/test";

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
            console.log("text changed:", text);
        }
    };

export default new Vuex.Store(
    {
        state,
        mutations,
        actions
        // modules:
        // {
        //     test
        // }
    });
