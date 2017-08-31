// import ApiService from "services/ApiService";

const state =
    {
        billingAddressId: null,
        billingAddressList: [],
        deliveryAddressId: null,
        deliveryAddressList: []
    };

const mutations =
    {
        setBillingAddressList(state, billingAddressList)
        {
            if (Array.isArray(billingAddressList))
            {
                state.billingAddressList = billingAddressList;
            }
        },

        setBillingAddressId(state, billingAddressId)
        {
            if (billingAddressId)
            {
                state.billingAddressId = billingAddressId;
            }
        },

        setDeliveryAddressList(state, deliveryAddressList)
        {
            if (Array.isArray(deliveryAddressList))
            {
                state.deliveryAddressList = deliveryAddressList;
            }
        },

        setDeliveryAddressId(state, deliveryAddressId)
        {
            if (deliveryAddressId)
            {
                state.deliveryAddressId = deliveryAddressId;
            }
        }
    };

const actions =
    {
        setBillingAddress({commit}, {id, addressList})
        {
            commit("setBillingAddressList", addressList);
            commit("setBillingAddressId", id);
        },

        setDeliveryAddress({commit}, {id, addressList})
        {
            commit("setDeliveryAddressList", addressList);
            commit("setDeliveryAddressId", id);
        },

        setSelectedAddress({dispatch}, {selectedAddressId, addressType})
        {
            if (addressType === "1")
            {
                dispatch("setSelectedBillingAddressId", selectedAddressId);
            }
            else if (addressType === "2")
            {
                dispatch("setSelectedDeliveryAddressId", selectedAddressId);
            }
        },

        setSelectedBillingAddressId({commit}, selectedAddressId)
        {
            // TODO add call to set address
            commit("setBillingAddressId", selectedAddressId);
        },

        setSelectedDeliveryAddressId({commit}, selectedAddressId)
        {
            // TODO add call to set address
            commit("setDeliveryAddressId", selectedAddressId);
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
