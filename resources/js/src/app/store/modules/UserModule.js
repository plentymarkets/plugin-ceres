import { isDefined } from "../../helper/utils";

const state = () => ({
    userData: null,
    guestData: null
});

const mutations =
    {
        setUserData(state, userData)
        {
            state.userData = userData;
        },

        setGuestData(state, guestData)
        {
            state.guestData = guestData;
        }
    };

const getters =
    {
        username(state)
        {
            let username = "";

            if (isDefined(state.userData))
            {
                if (state.userData.firstName.length)
                {
                    username = state.userData.firstName + " ";
                }
                if (state.userData.lastName.length)
                {
                    username += state.userData.lastName;
                }
                if (!username.length)
                {
                    const emailOption = state.userData.options.find(option => option.typeId === 2 && option.subTypeId === 4);

                    if (emailOption)
                    {
                        username = emailOption.value;
                    }
                }
            }

            return username.trim();
        },

        isLoggedIn(state)
        {
            return isDefined(state.userData) && state.userData.id > 0;
        },

        isGuest(state)
        {
            return !!state.guestData?.isGuest;
        }
    };

export default
{
    state,
    mutations,
    getters
};
