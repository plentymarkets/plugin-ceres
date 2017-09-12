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

        selectBillingAddress(state, billingAddress)
        {
            if (billingAddress)
            {
                state.billingAddressId = billingAddress.id;
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

        selectDeliveryAddress(state, deliveryAddress)
        {
            if (deliveryAddress)
            {
                state.deliveryAddressId = deliveryAddress.id;
                state.deliveryAddress = deliveryAddress;
            }
        },

        removeBillingAddress(state, billingAddress)
        {
            const index = state.billingAddressList.indexOf(billingAddress);

            if (index !== -1)
            {
                state.billingAddressList.splice(index, 1);

                if (state.billingAddress === billingAddress)
                {
                    state.billingAddress = null;
                    state.billingAddressId = null;
                }
            }
        },

        removeDeliveryAddress(state, deliveryAddress)
        {
            const index = state.deliveryAddressList.indexOf(deliveryAddress);

            if (index !== -1)
            {
                state.deliveryAddressList.splice(index, 1);

                if (state.deliveryAddress === deliveryAddress)
                {
                    state.deliveryAddress = state.deliveryAddress.find(address => address.id === -99);
                    state.deliveryAddressId = -99;
                }
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
                    state.billingAddressId = billingAddress.id;
                    state.billingAddress = billingAddress;
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
                    state.deliveryAddressId = deliveryAddress.id;
                    state.deliveryAddress = deliveryAddress;
                }
            }
        },

        updateBillingAddress(state, billingAddress)
        {
            if (billingAddress)
            {
                const indexToUpdate = state.billingAddressList.findIndex(entry => entry.id === billingAddress.id);

                // using this "trick" to trigger the address list to render again
                state.billingAddressList.splice(indexToUpdate, 1);
                state.billingAddressList.splice(indexToUpdate, 0, billingAddress);
            }
        },

        updateDeliveryAddress(state, deliveryAddress)
        {
            if (deliveryAddress)
            {
                const indexToUpdate = state.deliveryAddressList.findIndex(entry => entry.id === deliveryAddress.id);

                // using this "trick" to trigger the address list to render again
                state.deliveryAddressList.splice(indexToUpdate, 1);
                state.deliveryAddressList.splice(indexToUpdate, 0, deliveryAddress);
            }
        }
    };

const actions =
    {
        initBillingAddress({commit}, {id, addressList})
        {
            commit("setBillingAddressList", addressList);
            commit("selectBillingAddress", addressList.find(address => address.id === id));
        },

        initDeliveryAddress({commit}, {id, addressList})
        {
            commit("setDeliveryAddressList", addressList);
            commit("selectDeliveryAddress", addressList.find(address => address.id === id));
        },

        selectAddress({commit, state}, {selectedAddress, addressType})
        {
            return new Promise((resolve, reject) =>
            {
                let oldAddress = {};

                if (addressType === "1")
                {
                    oldAddress = state.billingAddress;
                    commit("selectBillingAddress", selectedAddress);
                }
                else if (addressType === "2")
                {
                    oldAddress = state.deliveryAddress;
                    commit("selectDeliveryAddress", selectedAddress);
                }

                ApiService.put("/rest/io/customer/address/" + selectedAddress.id + "?typeId=" + addressType, {supressNotifications: true})
                    .done(response =>
                    {
                        return resolve(response);
                    })
                    .fail(error =>
                    {
                        if (addressType === "1")
                        {
                            commit("selectBillingAddress", oldAddress);
                        }
                        else if (addressType === "2")
                        {
                            commit("selectDeliveryAddress", oldAddress);
                        }
                        reject(error);
                    });
            });
        },

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
                ApiService.post("/rest/io/customer/address?typeId=" + addressType, address, {supressNotifications: true})
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
