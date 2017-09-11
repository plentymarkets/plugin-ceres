import ApiService from "services/ApiService";

const state =
    {
        billingAddressId: null,
        billingAddress: null,
        billingAddressList: [],
        deliveryAddressId: null,
        deliveryAddress: null,
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

        setBillingAddress(state, billingAddress)
        {
            if (billingAddress)
            {
                state.billingAddress = billingAddress;
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
        },

        setDeliveryAddress(state, deliveryAddress)
        {
            if (deliveryAddress)
            {
                state.deliveryAddress = deliveryAddress;
            }
        },

        removeBillingAddress(state, billingAddress)
        {
            const index = state.billingAddressList.indexOf(billingAddress);

            if (index !== -1)
            {
                state.billingAddressList.splice(index, 1);
            }
        },

        removeDeliveryAddress(state, deliveryAddress)
        {
            const index = state.deliveryAddressList.indexOf(deliveryAddress);

            if (index !== -1)
            {
                state.deliveryAddressList.splice(index, 1);
            }
        },

        addBillingAddress(state, billingAddress, index)
        {
            if (billingAddress)
            {
                if (index)
                {
                    state.billingAddressList.splice(index, 0, billingAddress);
                }
                else
                {
                    state.billingAddressList.push(billingAddress);
                }
            }
        },

        addDeliveryAddress(state, deliveryAddress, index)
        {
            if (deliveryAddress)
            {
                if (index)
                {
                    state.deliveryAddressList.splice(index, 0, deliveryAddress);
                }
                else
                {
                    state.deliveryAddressList.push(deliveryAddress);
                }
            }
        },

        updateBillingAddress(state, billingAddress)
        {
            if (billingAddress)
            {
                addressToUpdate = state.billingAddressList.find(entry => entry.id === billingAddress.id);
                addressToUpdate = billingAddress;
            }
        },

        updateDeliveryAddress(state, deliveryAddress)
        {
            if (deliveryAddress)
            {
                addressToUpdate = state.deliveryAddressList.find(entry => entry.id === deliveryAddress.id);
                addressToUpdate = deliveryAddress;
            }
        }
    };

const actions =
    {
        initBillingAddress({commit}, {id, addressList})
        {
            commit("setBillingAddressList", addressList);
            commit("setBillingAddressId", id);
            commit("setBillingAddress", addressList.find(address => address.id === id));
        },

        initDeliveryAddress({commit}, {id, addressList})
        {
            commit("setDeliveryAddressList", addressList);
            commit("setDeliveryAddressId", id);
            commit("setDeliveryAddress", addressList.find(address => address.id === id));
        },

        selectAddress({dispatch}, {selectedAddress, addressType})
        {
            if (addressType === "1")
            {
                return dispatch("selectBillingAddress", selectedAddress);
            }
            else if (addressType === "2")
            {
                return dispatch("selectDeliveryAddress", selectedAddress);
            }

            return new Promise();
        },

        selectBillingAddress({commit}, selectedAddress)
        {
            return new Promise((resolve, reject) =>
            {
                // TODO add call to set address
                commit("setBillingAddressId", selectedAddress.id);
                commit("setBillingAddress", selectedAddress);
            });
        },

        selectDeliveryAddress({commit}, selectedAddress)
        {
            return new Promise((resolve, reject) =>
            {
                // TODO add call to set address
                commit("setDeliveryAddressId", selectedAddress.id);
                commit("setDeliveryAddress", selectedAddress);
            });
        },

        // TODO what to do after a selected address is deleted
        deleteAddress({dispatch, state, commit}, {address, addressType})
        {
            return new Promise((resolve, reject) =>
            {
                let addressIndex = -1;

                if (addressType === "1")
                {
                    addressIndex = state.billingAddressList.indexOf(address);
                    commit("removeBillingAddress", address);
                }
                else if (addressType === "2")
                {
                    addressIndex = state.deliveryAddressList.indexOf(address);
                    commit("removeDeliveryAddress", address);
                }

                ApiService.delete("/rest/io/customer/address/" + address.id + "?typeId=" + addressType)
                    .done(response =>
                    {
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        if (addressType === "1")
                        {
                            commit("addBillingAddress", address, addressIndex);
                        }
                        else if (addressType === "2")
                        {
                            commit("addDeliveryAddress", address, addressIndex);
                        }
                        reject(error);
                    });
            });
        },

        createAddress({commit}, {address, addressType})
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.post("/rest/io/customer/address?typeId=" + addressType, address, {supressNotifications: true})
                    .done(response =>
                    {
                        if (addressType === "1")
                        {
                            commit("addBillingAddress", response);
                        }
                        else if (addressType === "2")
                        {
                            commit("addDeliveryAddress", response);
                        }

                        resolve(response);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        },

        updateAddress({commit}, {address, addressType})
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.put("/rest/io/customer/address/" + address.id + "?typeId=" + addressType, address, {supressNotifications: true})
                    .done(response =>
                    {
                        if (addressType === "1")
                        {
                            commit("updateBillingAddress", address);
                        }
                        else if (addressType === "2")
                        {
                            commit("updateDeliveryAddress", address);
                        }

                        resolve(response);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        },

        emptyAddressList({commit, dispatch}, {addressType})
        {
            // TODO remove address and unselect
            // keep -99 for shipping
        }
    };

const getters =
    {
        getSelectedAddress: state => addressType =>
        {
            let selectedAddress = {};

            if (addressType === "1")
            {
                selectedAddress = state.billingAddress;
            }
            else if (addressType === "2")
            {
                selectedAddress = state.deliveryAddress;
            }

            return selectedAddress;
        },

        getAddressList: state => addressType =>
        {
            let addressList = [];

            if (addressType === "1")
            {
                addressList = state.billingAddressList;
            }
            else if (addressType === "2")
            {
                addressList = state.deliveryAddressList;
            }

            return addressList;
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
