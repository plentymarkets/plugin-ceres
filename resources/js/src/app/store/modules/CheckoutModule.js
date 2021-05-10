import { isNullOrUndefined } from "../../helper/utils";

const ApiService = require("../../services/ApiService");

const state = () => ({
    shipping: {
        isParcelBoxAvailable: false,
        isPostOfficeAvailable: false,
        selectedShippingProfile: null,
        shippingProfileId: null,
        shippingProfileList: [],
        maxDeliveryDays: null
    },
    payment: {
        methodOfPaymentId: null,
        methodOfPaymentList: []
    },
    contactWish: null,
    customerSign: null,
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
    },
    newsletterSubscription: {},
    readOnly: false
});

const mutations =
    {
        setShippingProfile(state, shippingProfileId)
        {
            if (shippingProfileId)
            {
                state.shipping.shippingProfileId = shippingProfileId;

                const selectedShippingProfile = state.shipping.shippingProfileList.find(shipping => shipping.parcelServicePresetId === shippingProfileId);

                state.shipping.selectedShippingProfile = selectedShippingProfile;
            }
        },

        setSelectedShippingProfile(state, shippingProfile)
        {
            state.shipping.selectedShippingProfile = shippingProfile;
            state.shipping.shippingProfileId = shippingProfile.parcelServicePresetId;
        },

        setShippingProfileList(state, shippingProfileList)
        {
            if (Array.isArray(shippingProfileList))
            {
                state.shipping.shippingProfileList = shippingProfileList;
            }
        },

        setMaxDeliveryDays(state, maxDeliveryDays)
        {
            state.shipping.maxDeliveryDays = maxDeliveryDays;
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

        setCustomerSign(state, customerSign)
        {
            state.customerSign = customerSign;
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
        },

        setSubscribeNewsletterCheck(state, { emailFolder, value })
        {
            Vue.set(state.newsletterSubscription, emailFolder, value);
        },

        addSubscribeNewsletterValidate(state, { emailFolder, validator })
        {
            Vue.set(state.validation, `subscribeNewsletter_${emailFolder}`, { validate: validator, showError: false });
        },

        setSubscribeNewsletterShowErr(state, { emailFolder, showError })
        {
            Vue.set(state.validation[`subscribeNewsletter_${emailFolder}`], "showError", showError);
        },

        setIsCheckoutReadonly(state, readOnly)
        {
            state.readOnly = !!readOnly;
        }
    };

const actions =
    {
        setCheckout({ commit, dispatch }, checkout)
        {
            commit("setShippingCountryId", checkout.shippingCountryId);
            commit("setShippingProfile", checkout.shippingProfileId);
            commit("setShippingProfileList", checkout.shippingProfileList);
            commit("setMaxDeliveryDays", checkout.maxDeliveryDays);
            commit("setMethodOfPaymentList", checkout.paymentDataList);
            commit("setMethodOfPayment", checkout.methodOfPaymentId);
            commit("setIsCheckoutReadonly", checkout.readOnly);
            commit("setContactWish", checkout.contactWish);

            dispatch("setShippingProfileById", checkout.shippingProfileId);
            dispatch("initProfileAvailabilities");
        },

        setShippingProfileById({ state, commit }, shippingProfileId)
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

        selectMethodOfPayment({ commit, state }, methodOfPaymentId)
        {
            return new Promise((resolve, reject) =>
            {
                const oldMethodOfPayment = state.payment.methodOfPaymentId;

                commit("setIsBasketLoading", true);
                commit("setMethodOfPayment", methodOfPaymentId);

                ApiService.post("/rest/io/checkout/paymentId/", { paymentId: methodOfPaymentId })
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

        selectShippingProfile({ commit, state }, shippingProfile)
        {
            return new Promise((resolve, reject) =>
            {
                const oldShippingProfile = state.shipping.shippingProfileId;

                const params = { shippingId: shippingProfile.parcelServicePresetId };

                commit("setIsBasketLoading", true);
                commit("setShippingProfile", shippingProfile.parcelServicePresetId);

                if (shippingProfile.excludedPaymentMethodIds.includes(state.payment.methodOfPaymentId))
                {
                    const methodOfPaymentList = state.payment.methodOfPaymentList;

                    for (let i = 0; i < methodOfPaymentList.length; i++)
                    {
                        const methodOfPayment = methodOfPaymentList[i];

                        if (!shippingProfile.excludedPaymentMethodIds.includes(methodOfPayment.id))
                        {
                            params.methodOfPaymentId = methodOfPayment.id;
                            break;
                        }
                    }
                }

                ApiService.post("/rest/io/checkout/shippingId/", params)
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

        refreshCheckout({ commit, dispatch })
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

        initProfileAvailabilities({ commit, state })
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
