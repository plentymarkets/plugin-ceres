import ApiService from "services/ApiService";
import NotificationService from "services/NotificationService";
import TranslationService from "services/TranslationService";
import {isNullOrUndefined, isNull}from "../../helper/utils";

const state =
    {
        shipping: {
            shippingProfileId: null,
            shippingProfileSelected: null,
            shippingProfileList: [],
            isParcelBoxAvailable: false,
            isPostOfficeAvailable: false
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
            state.shipping.shippingProfileSelected = shippingProfile;
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
                const oldShippingProfile = state.shipping.shippingProfileId;

                commit("setIsBasketLoading", true);
                commit("setShippingProfile", shippingProfile.parcelServicePresetId);

                const isPostOffice = shippingProfile.isPostOffice;
                const isParcelBox = shippingProfile.isParcelBox;

                const ignoreCondition = (isPostOffice && isParcelBox);

                if (!ignoreCondition &&
                    ((isPostOffice && getters.getSelectedAddress("2").address1 === "PACKSTATION") ||
                    (isParcelBox && getters.getSelectedAddress("2").address1 === "POSTFILIALE")) ||
                    ((!isParcelBox && !isPostOffice) &&
                    (getters.getSelectedAddress("2").address1 === "PACKSTATION" || getters.getSelectedAddress("2").address1 === "POSTFILIALE")))
                {
                    commit("selectDeliveryAddressById", -99);

                    NotificationService.warn(TranslationService.translate("Ceres::Template.addressChangedWarning"));
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
        getSelectedShippingProfile: state =>
        {
            return state.shipping.shippingProfileSelected;
        },

        getShippingProfileList: state =>
        {
            return state.shipping.shippingProfileList;
        },

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
