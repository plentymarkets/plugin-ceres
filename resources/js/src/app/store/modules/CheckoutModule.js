import ApiService from "services/ApiService";

const state =
    {
        shipping: {
            shippingCountryId: null,
            shippingProfileId: null,
            shippingProfileList: []
        },
        payment: {
            methodOfPaymentId: null,
            methodOfPaymentList: []
        },
        contactWish: null,
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
        setShippingCountryId(state, shippingCountryId)
        {
            if (shippingCountryId)
            {
                state.shipping.shippingCountryId = shippingCountryId;
                document.dispatchEvent(new CustomEvent("afterShippingCountryChanged", {detail: shippingCountryId}));
            }
        },

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

        selectMethodOfPayment({commit, dispatch}, methodOfPayment)
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.post("/rest/io/checkout/paymentId/", {paymentId: methodOfPayment.id})
                    .done(response =>
                    {
                        commit("setMethodOfPayment", methodOfPayment);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
                resolve();
            });
        },

        selectShippingProfile({commit, dispatch}, shippingProfile)
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.post("/rest/io/checkout/shippingId/", {shippingId: shippingProfile.parcelServicePresetId})
                    .done(response =>
                    {
                        commit("setShippingProfile", shippingProfile.parcelServicePresetId);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
                resolve();
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
