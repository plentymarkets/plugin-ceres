// import ApiService from "services/ApiService";

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
                state.shipping.ShippingCountryId = shippingCountryId;
            }
        },

        setShippingProfile(state, shippingProfile)
        {
            if (shippingProfile)
            {
                state.shipping.shippingProfileId = shippingProfile.parcelServicePresetId;
            }
        },

        setShippingProfileList(state, shippingProfileList)
        {
            if (Array.isArray(shippingProfileList))
            {
                state.shipping.shippingProfileList = shippingProfileList;
            }
        },

        setMethodOfPayment(state, methodOfPayment)
        {
            if (methodOfPayment)
            {
                state.payment.methodOfPaymentId = methodOfPayment.id;
            }
        },

        setMethodOfPaymentList(state, methodOfPaymentList)
        {
            if (Array.isArray(methodOfPaymentList))
            {
                state.payment.methodOfPaymentList = methodOfPaymentList;
            }
        }
    };

const actions =
    {
        setCheckout({commit}, checkout)
        {
            commit("setShippingCountryId", checkout.shippingCountryId);
            commit("setShippingProfile", checkout.shippingProfileList.find(profile => profile.parcelServicePresetId === checkout.shippingProfileId));
            commit("setShippingProfileList", checkout.shippingProfileList);
            commit("setMethodOfPayment", checkout.methodOfPaymentList.find(profile => profile.id === checkout.methodOfPaymentId));
            commit("setMethodOfPaymentList", checkout.methodOfPaymentList);
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
