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
            console.log("setBillingAddressList");
        },

        setBillingAddressId(state, billingAddressId)
        {
            if (billingAddressId)
            {
                state.billingAddressId = billingAddressId;
            }
            console.log("setBillingAddressId");
        },

        setBillingAddress(state, billingAddress)
        {
            if (billingAddress)
            {
                state.billingAddress = billingAddress;
            }
            console.log("setBillingAddress");
        },

        setDeliveryAddressList(state, deliveryAddressList)
        {
            if (Array.isArray(deliveryAddressList))
            {
                state.deliveryAddressList = deliveryAddressList;
            }
            console.log("setDeliveryAddressList");
        },

        setDeliveryAddressId(state, deliveryAddressId)
        {
            if (deliveryAddressId)
            {
                state.deliveryAddressId = deliveryAddressId;
            }
            console.log("setDeliveryAddressId");
        },

        setDeliveryAddress(state, deliveryAddress)
        {
            if (deliveryAddress)
            {
                state.deliveryAddress = deliveryAddress;
            }
            console.log("setDeliveryAddress");
        },

        removeBillingAddress(state, billingAddress)
        {
            const index = state.billingAddressList.indexOf(billingAddress);

            if (index !== -1)
            {
                state.billingAddressList.splice(index, 1);
            }
            console.log("removeBillingAddress");
        },

        removeDeliveryAddress(state, deliveryAddress)
        {
            const index = state.deliveryAddressList.indexOf(deliveryAddress);

            if (index !== -1)
            {
                state.deliveryAddressList.splice(index, 1);
            }
            console.log("removeDeliveryAddress");
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
            console.log("addBillingAddress");
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
            console.log("addDeliveryAddress");
        },

        updateBillingAddress(state, billingAddress)
        {
            if (billingAddress)
            {
                addressToUpdate = state.billingAddressList.find(entry => entry.id === billingAddress.id);
                addressToUpdate = billingAddress;
            }
            console.log("updateBillingAddress");
        },

        updateDeliveryAddress(state, deliveryAddress)
        {
            if (deliveryAddress)
            {
                addressToUpdate = state.deliveryAddressList.find(entry => entry.id === deliveryAddress.id);
                addressToUpdate = deliveryAddress;
            }
            console.log("updateDeliveryAddress");
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
                        resolve();
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
                        reject();
                    });
            });
        },

        ceateAddress({commit}, {address, addressType})
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.post("/rest/io/customer/address?typeId=" + addressType, address, {supressNotifications: true})
                    .done(response =>
                    {
                        if (addressType === "1")
                        {
                            commit("addBillingAddress", address);
                        }
                        else if (addressType === "2")
                        {
                            commit("addDeliveryAddress", address);
                        }

                        resolve();
                    })
                    .fail(error =>
                    {
                        reject();
                    });
            });
        },

        updateAddress({commit}, {address, addressType})
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.put("/rest/io/customer/address/" + newData.id + "?typeId=" + addressType, newData, {supressNotifications: true})
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

                        resolve();
                    })
                    .fail(error =>
                    {
                        reject();
                    });
            });
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
