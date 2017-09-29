const state =
    {
        data: {},
        items: [],
        latestEntry: {
            item: {},
            quantity: null
        }
    };

const mutations =
    {
        setBasket(state, basket)
        {
            state.data = basket;
        },

        setBasketItems(state, basketItems)
        {
            state.items = basketItems;
        },

        setLatestBasketEntry(state, latestBasketEntry)
        {
            state.latestEntry = latestBasketEntry;
        }
    };

const actions =
    {

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
