import TranslationService from "services/TranslationService";

const NotificationService = require("services/NotificationService");

Vue.component("shipping-privacy-hint-check", {

    props: {
        template:
        {
            type: String,
            default: "#vue-shipping-privacy-hint-check"
        }
    },

    computed:
    {
        currentShippingProfile()
        {
            return this.shippingProfileList.find(profile => profile.parcelServicePresetId === this.shippingProfileId);
        },

        showHint()
        {
            return this.currentShippingProfile.showDataPrivacyAgreementHint;
        },

        currentShippingProviderAddress()
        {
            return this.currentShippingProfile.shippingServiceProviderAddress;
        },

        privacyHint()
        {
            return TranslationService.translate("Ceres::Template.checkoutShippingPrivacyHint",
                {
                    parcelServiceName: this.currentShippingProfile.parcelServiceName,
                    parcelServiceAddress: this.currentShippingProviderAddress
                });
        },

        ...Vuex.mapState({
            shippingProfileList: state => state.checkout.shipping.shippingProfileList,
            shippingProfileId: state => state.checkout.shipping.shippingProfileId,
            shippingPrivacyHintAccepted: state => state.checkout.shippingPrivacyHintAccepted
        })
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        setValue(value)
        {
            this.$store.commit("setShippingPrivacyHintAccepted", value);
        }
    },

    watch:
    {
        currentShippingProfile(value, oldValue)
        {
            if (value.parcelServiceId !== oldValue.parcelServiceId || !value.showDataPrivacyAgreementHint)
            {
                if (this.shippingPrivacyHintAccepted)
                {
                    this.setValue(false);

                    $(this.$refs.variationTotalPrice).fadeTo(100, 0.1).fadeTo(400, 1.0);

                    NotificationService.error(TranslationService.translate("Ceres::Template.checkoutShippingPrivacyReseted"));
                }
            }
        }
    }
});
