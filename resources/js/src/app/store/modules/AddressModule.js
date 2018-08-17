import ApiService from "services/ApiService";
import NotificationService from "services/NotificationService";
import TranslationService from "services/TranslationService";

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

        selectBillingAddressById(state, billingAddressId)
        {
            if (billingAddressId)
            {
                const billingAddress = state.billingAddressList.find(address => address.id === billingAddressId);

                if (billingAddress)
                {
                    state.billingAddressId = billingAddress.id;
                    state.billingAddress = billingAddress;
                }
            }
        },

        selectDeliveryAddressById(state, deliveryAddressId)
        {
            if (deliveryAddressId)
            {
                const deliveryAddress = state.deliveryAddressList.find(address => address.id === deliveryAddressId);

                if (deliveryAddress)
                {
                    state.deliveryAddressId = deliveryAddress.id;
                    state.deliveryAddress = deliveryAddress;
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
                }
            }
        },

        addBillingAddress(state, {billingAddress, addressIndex})
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
                }
            }
        },

        addDeliveryAddress(state, {deliveryAddress, addressIndex})
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
            }
            else if (addressType === "2")
            {
                state.deliveryAddressList = [{id: -99}];
                state.deliveryAddress = state.deliveryAddressList[0];
                state.deliveryAddressId = state.deliveryAddressList[0].id;
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

        selectAddress({commit, state, getters, dispatch}, {selectedAddress, addressType})
        {
            let changeNotAllowed = false;

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

                    const shippingProfile = getters.getSelectedShippingProfile;
                    const shippingProfileList = getters.getShippingProfileList;

                    const isPostOffice = shippingProfile.isPostOffice;
                    const isParcelBox = shippingProfile.isParcelBox;

                    const ignoreCondition = (isPostOffice && isParcelBox);

                    if (!ignoreCondition &&
                        (isParcelBox && selectedAddress.address1 === "POSTFILIALE") ||
                        ((!isParcelBox && !isPostOffice) && selectedAddress.address1 === "POSTFILIALE"))
                    {
                        let profileToSelect = shippingProfileList.find( shipping => shipping.isPostOffice );

                        if(!profileToSelect)
                        {
                            changeNotAllowed = true;
                        }
                        else
                        {
                            dispatch("selectShippingProfile", profileToSelect);

                            NotificationService.warn(TranslationService.translate("Ceres::Template.addressShippingChangedWarning"));
                        }
                    }
                    else if(!ignoreCondition &&
                            (isPostOffice && selectedAddress.address1 === "PACKSTATION") ||
                            ((!isParcelBox && !isPostOffice) && selectedAddress.address1 === "PACKSTATION"))
                    {
                        let profileToSelect = shippingProfileList.find( shipping => shipping.isParcelBox );

                        if(!profileToSelect)
                        {
                            changeNotAllowed = true;
                        }
                        else
                        {
                            dispatch("selectShippingProfile", profileToSelect);

                            NotificationService.warn(TranslationService.translate("Ceres::Template.addressShippingChangedWarning"));
                        }
                    }
                }

                if(!changeNotAllowed)
                {
                    commit("setIsBasketLoading", true);

                    ApiService.put("/rest/io/customer/address/" + selectedAddress.id + "?typeId=" + addressType, {supressNotifications: true})
                        .done(response =>
                        {
                            commit("setIsBasketLoading", false);
    
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
                }
                else
                {
                    commit("selectDeliveryAddress", oldAddress);

                    NotificationService.error(TranslationService.translate("Ceres::Template.addressSelectedNotAllowed"));
                }
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

                ApiService.delete("/rest/io/customer/address/" + address.id + "?typeId=" + addressType, null, {keepOriginalResponse: true})
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
                            commit("addBillingAddress", {billingAddress: address, addressIndex});
                        }
                        else if (addressType === "2")
                        {
                            commit("addDeliveryAddress", {deliveryAddress: address, addressIndex});
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
                            commit("addBillingAddress", {billingAddress: response});
                        }
                        else if (addressType === "2")
                        {
                            commit("addDeliveryAddress", {deliveryAddress: response});
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
                ApiService.post("/rest/io/customer/address?typeId=" + addressType, address, {supressNotifications: true, keepOriginalResponse: true})
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
