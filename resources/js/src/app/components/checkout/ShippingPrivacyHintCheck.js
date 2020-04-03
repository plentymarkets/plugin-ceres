import TranslationService from "../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";

const NotificationService = require("../../services/NotificationService");

export default Vue.component("shipping-privacy-hint-check", {

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

        currentPrivacyHints()
        {
            if (this.currentShippingProfile && this.currentShippingProfile.shippingPrivacyInformation)
            {
                return this.currentShippingProfile.shippingPrivacyInformation.filter(entry => !!entry.showDataPrivacyAgreementHint);
            }

            return [];
        },

        privacyHintContent()
        {
            const andTranslation = TranslationService.translate("Ceres::Template.checkoutShippingPrivacyHintAnd");

            let parcelServiceInformation = "";

            for (const hint of this.currentPrivacyHints)
            {
                if (parcelServiceInformation !== "")
                {
                    parcelServiceInformation += ` ${andTranslation} `;
                }

                parcelServiceInformation += `<strong>${hint.parcelServiceName}, ${hint.parcelServiceAddress}</strong>`;
            }

            return TranslationService.translate("Ceres::Template.checkoutShippingPrivacyHint", { parcelServiceInformation });
        },

        ...mapState({
            shippingProfileList: state => state.checkout.shipping.shippingProfileList,
            shippingProfileId: state => state.checkout.shipping.shippingProfileId,
            shippingPrivacyHintAccepted: state => state.checkout.shippingPrivacyHintAccepted
        })
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
            if (this.shippingPrivacyHintAccepted && value.parcelServiceId !== oldValue.parcelServiceId)
            {
                this.setValue(false);

                $(this.$refs.formCheck).fadeTo(100, 0.1).fadeTo(400, 1.0);

                NotificationService.error(TranslationService.translate("Ceres::Template.checkoutShippingPrivacyReseted"));
            }
            else if (!value.shippingPrivacyInformation[0].showDataPrivacyAgreementHint)
            {
                this.setValue(false);
            }
        }
    }
});
