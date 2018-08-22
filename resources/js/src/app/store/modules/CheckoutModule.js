import ApiService from "services/ApiService";
import NotificationService from "services/NotificationService";
import TranslationService from "services/TranslationService";
import {isNullOrUndefined}from "../../helper/utils";

const state =
    {
        shipping: {
            isParcelBoxAvailable: false,
            isPostOfficeAvailable: false,
            selectedShippingProfile: null,
            shippingProfileId: null,
            shippingProfileList: []
        },
        payment: {
            methodOfPaymentId: null,
            methodOfPaymentList: []
        },
        contactWish: null,
        shippingPrivacyHintAccepted: false,
        validation: {
            gtc: {
                showError: false,
                validate: null
            },
            invoiceAddress: {
                showError: false,
                validate: null
            },
            paymentProvider: {
                showError: false,
                validate: null
            },
            shippingProfile: {
                showError: false,
                validate: null
            }
        }
    };

const mutations =
    {
        setShippingProfile(state, shippingProfileId)
        {
            if (shippingProfileId)
            {
                state.shipping.shippingProfileId = shippingProfileId;
            }
        },

        setSelectedShippingProfile(state, shippingProfile)
        {
            state.shipping.selectedShippingProfile = shippingProfile;
        },

        setShippingProfileList(state, shippingProfileList)
        {
            if (Array.isArray(shippingProfileList))
            {
                state.shipping.shippingProfileList = shippingProfileList;
            }
        },

        setMethodOfPayment(state, methodOfPaymentId)
        {
            if (methodOfPaymentId)
            {
                state.payment.methodOfPaymentId = methodOfPaymentId;
            }
        },

        setMethodOfPaymentList(state, methodOfPaymentList)
        {
            if (Array.isArray(methodOfPaymentList))
            {
                state.payment.methodOfPaymentList = methodOfPaymentList;
            }
        },

        setContactWish(state, contactWish)
        {
            state.contactWish = contactWish;
        },

        setShippingPrivacyHintAccepted(state, value)
        {
            state.shippingPrivacyHintAccepted = value;
        },

        setPaymentProviderValidator(state, paymentProviderValidator)
        {
            state.validation.paymentProvider.validate = paymentProviderValidator;
        },

        setPaymentProviderShowError(state, showError)
        {
            state.validation.paymentProvider.showError = showError;
        },

        setShippingProfileValidator(state, shippingProfileValidator)
        {
            state.validation.shippingProfile.validate = shippingProfileValidator;
        },

        setShippingProfileShowError(state, showError)
        {
            state.validation.shippingProfile.showError = showError;
        },

        setGtcValidator(state, gtcValidator)
        {
            state.validation.gtc.validate = gtcValidator;
        },

        setGtcShowError(state, showError)
        {
            state.validation.gtc.showError = showError;
        },

        setInvoiceAddressValidator(state, invoiceAddressValidator)
        {
            state.validation.invoiceAddress.validate = invoiceAddressValidator;
        },

        setInvoiceAddressShowError(state, showError)
        {
            state.validation.invoiceAddress.showError = showError;
        },

        setParcelBoxAvailability(state, availability)
        {
            state.shipping.isParcelBoxAvailable = availability;
        },

        setPostOfficeAvailability(state, availability)
        {
            state.shipping.isPostOfficeAvailable = availability;
        }
    };

const actions =
    {
        setCheckout({commit, dispatch}, checkout)
        {
            commit("setShippingCountryId", checkout.shippingCountryId);
            commit("setShippingProfile", checkout.shippingProfileId);
            commit("setShippingProfileList", checkout.shippingProfileList);
            commit("setMethodOfPaymentList", checkout.paymentDataList);
            commit("setMethodOfPayment", checkout.methodOfPaymentId);

            dispatch("setShippingProfileById", checkout.shippingProfileId);
            dispatch("initProfileAvailabilities");
        },

        setShippingProfileById({state, commit}, shippingProfileId)
        {
            const shippingProfile = state.shipping.shippingProfileList.find(profile =>
            {
                return profile.parcelServicePresetId === shippingProfileId;
            });

            if (!isNullOrUndefined(shippingProfile))
            {
                commit("setSelectedShippingProfile", shippingProfile);
            }
        },

        selectMethodOfPayment({commit, dispatch}, methodOfPaymentId)
        {
            return new Promise((resolve, reject) =>
            {
                const oldMethodOfPayment = state.payment.methodOfPaymentId;

                commit("setIsBasketLoading", true);
                commit("setMethodOfPayment", methodOfPaymentId);

                ApiService.post("/rest/io/checkout/paymentId/", {paymentId: methodOfPaymentId})
                    .done(response =>
                    {
                        commit("setIsBasketLoading", false);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        commit("setIsBasketLoading", false);
                        commit("setMethodOfPayment", oldMethodOfPayment);
                        reject(error);
                    });
            });
        },

        selectShippingProfile({commit, dispatch, getters}, shippingProfile)
        {
            return new Promise((resolve, reject) =>
            {
                commit("setIsBasketLoading", true);
                commit("setShippingProfile", shippingProfile.parcelServicePresetId);

                const oldShippingProfile = state.shipping.shippingProfileId;
                const isPostOfficeAndParcelBoxActive = shippingProfile.isPostOffice && shippingProfile.isParcelBox;
                const isAddressPostOffice = getters.getSelectedAddress("2").address1 === "POSTFILIALE";
                const isAddressParcelBox = getters.getSelectedAddress("2").address1 === "PACKSTATION";

                if (!isPostOfficeAndParcelBoxActive && (isAddressPostOffice || isAddressParcelBox))
                {
                    const isUnsupportedPostOffice = isAddressPostOffice && !shippingProfile.isPostOffice;
                    const isUnsupportedParcelBox = isAddressParcelBox && !shippingProfile.isParcelBox;

                    if (isUnsupportedPostOffice || isUnsupportedParcelBox)
                    {
                        commit("selectDeliveryAddressById", -99);
                        NotificationService.warn(TranslationService.translate("Ceres::Template.addressChangedWarning"));
                    }
                }

                ApiService.post("/rest/io/checkout/shippingId/", {shippingId: shippingProfile.parcelServicePresetId})
                    .done(response =>
                    {
                        commit("setSelectedShippingProfile", shippingProfile);
                        commit("setIsBasketLoading", false);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        commit("setIsBasketLoading", false);
                        commit("setShippingProfile", oldShippingProfile);
                        reject(error);
                    });
            });
        },

        refreshCheckout({commit, dispatch})
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.get("/rest/io/checkout/")
                        .done(checkout =>
                        {
                            dispatch("setCheckout", checkout);
                            resolve(checkout);
                        })
                        .fail(error =>
                        {
                            reject(error);
                        });
            });
        },

        initProfileAvailabilities({commit, state})
        {
            commit("setParcelBoxAvailability", !isNullOrUndefined(state.shipping.shippingProfileList.find(shipping => shipping.isParcelBox)));

            commit("setPostOfficeAvailability", !isNullOrUndefined(state.shipping.shippingProfileList.find(shipping => shipping.isPostOffice)));
        }
    };

const getters =
    {
        isParcelOrOfficeAvailable: state =>
        {
            return state.shipping.isParcelBoxAvailable || state.shipping.isPostOfficeAvailable;
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
