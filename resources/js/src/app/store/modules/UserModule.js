import {isDefined}from "../../helper/utils";

const state =
    {
        userData: null
    };

const mutations =
    {
        setUserData(state, userData)
        {
            state.userData = userData;
        }
    };

const getters =
    {
        username(state)
        {
            let username = "";

            if (isDefined(state.userData))
            {
                if (state.userData.firstName.length > 0 && state.userData.lastName.length > 0)
                {
                    username = state.userData.firstName + " " + state.userData.lastName;
                }
                else
                {
                    username = state.userData.options[0].value;
                }
            }

            return username;
        },

        isLoggedIn(state)
        {
            return isDefined(state.userData) && state.userData.id > 0;
        }
    };

export default
{
    state,
    mutations,
    getters
};
