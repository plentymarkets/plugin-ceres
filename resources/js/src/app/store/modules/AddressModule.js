import dayjs from "dayjs";
const ApiService = require("../../services/ApiService");

const state = () => ({
    billingAddressId: null,
    billingAddress: null,
    billingAddressList: [],
    deliveryAddressId: null,
    deliveryAddress: null,
    deliveryAddressList: []
});

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

        selectBillingAddressById(state, billingAddressId)
        {
            if (billingAddressId)
            {
                const billingAddress = state.billingAddressList.find(address => address.id === billingAddressId);

                if (billingAddress)
                {
                    state.billingAddressId = billingAddress.id;
                    state.billingAddress = billingAddress;
                    document.dispatchEvent(new CustomEvent("billingAddressChanged", state.billingAddress));
                }
            }
        },

        selectDeliveryAddressById(state, deliveryAddressId)
        {
            if (!deliveryAddressId)
            {
                deliveryAddressId = -99;
            }

            if (deliveryAddressId)
            {
                const deliveryAddress = state.deliveryAddressList.find(address => address.id === deliveryAddressId);

                if (deliveryAddress)
                {
                    state.deliveryAddressId = deliveryAddress.id;
                    state.deliveryAddress = deliveryAddress;
                    document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
                }
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
                    document.dispatchEvent(new CustomEvent("billingAddressChanged", null));
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
                    state.deliveryAddress = state.deliveryAddressList.find(address => address.id === -99);
                    state.deliveryAddressId = -99;
                    document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
                }
            }
        },

        addBillingAddress(state, { billingAddress, addressIndex })
        {
            if (billingAddress)
            {
                if (addressIndex)
                {
                    state.billingAddressList.splice(addressIndex, 0, billingAddress);
                }
                else
                {
                    state.billingAddressList.push(billingAddress);
                    state.billingAddressId = billingAddress.id;
                    state.billingAddress = billingAddress;
                    document.dispatchEvent(new CustomEvent("billingAddressChanged", state.billingAddress));
                }
            }
        },

        addDeliveryAddress(state, { deliveryAddress, addressIndex })
        {
            if (deliveryAddress)
            {
                if (addressIndex)
                {
                    state.deliveryAddressList.splice(addressIndex, 0, deliveryAddress);
                }
                else
                {
                    state.deliveryAddressList.push(deliveryAddress);
                    state.deliveryAddressId = deliveryAddress.id;
                    state.deliveryAddress = deliveryAddress;
                    document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
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

                if (billingAddress.id === state.billingAddressId)
                {
                    state.billingAddress = billingAddress;
                    document.dispatchEvent(new CustomEvent("billingAddressChanged", state.billingAddress));
                }
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

                if (deliveryAddress.id === state.deliveryAddressId)
                {
                    state.deliveryAddress = deliveryAddress;
                    document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
                }

            }
        },

        resetAddress(state, addressType)
        {
            if (addressType === "1")
            {
                state.billingAddress = null;
                state.billingAddressId = null;
                state.billingAddressList = [];
                document.dispatchEvent(new CustomEvent("billingAddressChanged", null));
            }
            else if (addressType === "2")
            {
                state.deliveryAddressList = [{ id: -99 }];
                state.deliveryAddress = state.deliveryAddressList[0];
                state.deliveryAddressId = state.deliveryAddressList[0].id;
                document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
            }
        }
    };

const actions =
    {
        initBillingAddress({ commit }, { id, addressList })
        {
            // format dates from the old ui into ISO
            addressList.forEach(address =>
            {
                const option = address.options.find(option => option.typeId === 9);

                if (option && isNaN(Date.parse(option.value)))
                {
                    option.value = dayjs(option.value * 1000).format("YYYY-MM-DD");
                }
            });

            commit("setBillingAddressList", addressList);
            commit("selectBillingAddress", addressList.find(address => address.id === id));
            document.dispatchEvent(new CustomEvent("billingAddressChanged", state.billingAddress));
        },

        initDeliveryAddress({ commit }, { id, addressList })
        {
            addressList.unshift({ id: -99 });
            if (addressList.every(address => address.id !== id))
            {
                id = -99;
            }

            commit("setDeliveryAddressList", addressList);
            commit("selectDeliveryAddress", addressList.find(address => address.id === id));
            document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
        },

        selectAddress({ commit, state, rootState, dispatch }, { selectedAddress, addressType })
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

                commit("setIsBasketLoading", true);

                ApiService.put("/rest/io/customer/address/" + selectedAddress.id + "?typeId=" + addressType, { supressNotifications: true })
                    .done(response =>
                    {
                        commit("setIsBasketLoading", false);
                        if (addressType === "1")
                        {
                            document.dispatchEvent(new CustomEvent("billingAddressChanged", state.billingAddress));
                        }
                        else if (addressType === "2")
                        {
                            document.dispatchEvent(new CustomEvent("deliveryAddressChanged", state.deliveryAddress));
                        }
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

                        commit("setIsBasketLoading", false);
                        reject(error);
                    });
            });
        },

        deleteAddress({ dispatch, state, commit }, { address, addressType })
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

                ApiService.del("/rest/io/customer/address/" + address.id + "?typeId=" + addressType, null, { keepOriginalResponse: true })
                    .done(response =>
                    {
                        if (addressType === "1" && response.events && response.events.CheckoutChanged && response.events.CheckoutChanged.checkout)
                        {
                            const billingAddressId = response.events.CheckoutChanged.checkout.billingAddressId;

                            commit("selectBillingAddressById", billingAddressId);
                        }

                        resolve(response);
                    })
                    .fail(error =>
                    {
                        if (addressType === "1")
                        {
                            commit("addBillingAddress", { billingAddress: address, addressIndex });
                        }
                        else if (addressType === "2")
                        {
                            commit("addDeliveryAddress", { deliveryAddress: address, addressIndex });
                        }
                        reject(error);
                    });
            });
        },

        createAddress({ commit, dispatch }, { address, addressType })
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.post("/rest/io/customer/address?typeId=" + addressType, address, { supressNotifications: true })
                    .done(response =>
                    {
                        if (addressType === "1")
                        {
                            commit("addBillingAddress", { billingAddress: response });
                        }
                        else if (addressType === "2")
                        {
                            commit("addDeliveryAddress", { deliveryAddress: response });
                        }

                        resolve(response);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        },

        updateAddress({ commit, dispatch }, { address, addressType })
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.post("/rest/io/customer/address?typeId=" + addressType, address, { supressNotifications: true, keepOriginalResponse: true })
                    .done(response =>
                    {
                        if (addressType === "1")
                        {
                            commit("updateBillingAddress", address);

                            if (addressType === "1" && response.events && response.events.CheckoutChanged && response.events.CheckoutChanged.checkout)
                            {
                                const billingAddressId = response.events.CheckoutChanged.checkout.billingAddressId;

                                commit("selectBillingAddressById", billingAddressId);
                            }
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
        }
    };

const getters =
    {
        getSelectedAddress: state => addressType =>
        {
            let selectedAddress;

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
