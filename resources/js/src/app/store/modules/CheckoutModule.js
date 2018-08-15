import ApiService from "services/ApiService";

const state =
    {
        shipping: {
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
        }
    };

const actions =
    {
        setCheckout({commit}, checkout)
        {
            commit("setShippingCountryId", checkout.shippingCountryId);
            commit("setShippingProfile", checkout.shippingProfileId);
            commit("setShippingProfileList", checkout.shippingProfileList);
            commit("setMethodOfPaymentList", checkout.paymentDataList);
            commit("setMethodOfPayment", checkout.methodOfPaymentId);
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

                const isPostOffice = "1";
                const isParcelBox = "0";

                const ignoreCondition = (isPostOffice === "1" && isParcelBox === "1");

                if (!ignoreCondition &&
                    ((isPostOffice === "1" && getters.getSelectedAddress("2").address1 === "PACKSTATION") ||
                    (isParcelBox === "1" && getters.getSelectedAddress("2").address1 === "POSTFILIALE")))
                {
                    commit("selectDeliveryAddressById", -99);
                }

                ApiService.post("/rest/io/checkout/shippingId/", {shippingId: shippingProfile.parcelServicePresetId})
                    .done(response =>
                    {
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
