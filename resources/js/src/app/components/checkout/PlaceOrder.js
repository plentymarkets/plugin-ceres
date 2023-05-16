import { isDefined } from "../../helper/utils";
import { navigateTo } from "../../services/UrlService";
import Vue from "vue";
import { mapState } from "vuex";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

const ApiService = require("../../services/ApiService");
const NotificationService = require("../../services/NotificationService");

export default Vue.component("place-order", {

    mixins: [ButtonSizePropertyMixin],

    props:
    {
        template:
        {
            type: String,
            default: "#vue-place-order"
        },
        targetContinue:
        {
            type: String
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        }
    },

    data()
    {
        return {
            waiting: false,
            isInvalidShippingCountry: false
        };
    },

    computed:
    {
        buttonClasses()
        {
            const classes = [];

            if (isDefined(this.buttonSizeClass))
            {
                classes.push(this.buttonSizeClass);
            }

            if (isDefined(this.paddingClasses))
            {
                classes.push(this.paddingClasses.split(" "));
            }

            return classes;
        },

        activeNewsletterSubscriptions()
        {
            const activeNewsletterSubscriptions = [];

            for (const emailFolder in this.newsletterSubscription)
            {
                const emailFolderValue = this.newsletterSubscription[emailFolder];

                if (emailFolderValue)
                {
                    activeNewsletterSubscriptions.push(emailFolder);
                }
            }

            return activeNewsletterSubscriptions;
        },

        ...mapState({
            checkoutValidation: state => state.checkout.validation,
            contactWish: state => state.checkout.contactWish,
            customerSign: state => state.checkout.customerSign,
            isBasketLoading: state => state.basket.isBasketLoading,
            basketItemQuantity: state => state.basket.data.itemQuantity,
            isBasketInitiallyLoaded: state => state.basket.isBasketInitiallyLoaded,
            shippingPrivacyHintAccepted: state => state.checkout.shippingPrivacyHintAccepted,
            newsletterSubscription: state => state.checkout.newsletterSubscription,
            billingAddress: state => state.address.billingAddress,
            deliveryAddress: state => state.address.deliveryAddress,
            deliveryAddressId: state => state.address.deliveryAddressId,
            shippingCountryList: state => state.localization.shippingCountries
        })
    },

    mounted()
    {
        this.checkDeliveryAddressError();
    },

    methods: {
        placeOrder()
        {
            if (this.validateCheckout())
            {
                this.waiting = true;

                const url = "/rest/io/order/additional_information";
                const params = {
                    orderContactWish: this.contactWish,
                    orderCustomerSign: this.customerSign,
                    shippingPrivacyHintAccepted: this.shippingPrivacyHintAccepted,
                    newsletterSubscriptions: this.activeNewsletterSubscriptions
                };
                const options = { supressNotifications: true };

                ApiService.post(url, params, options)
                    .always(() =>
                    {
                        this.preparePayment();
                    });
            }
        },

        preparePayment()
        {
            this.waiting = true;

            if (this.basketItemQuantity > 0)
            {
                ApiService.post("/rest/io/checkout/payment")
                    .done(response =>
                    {
                        this.afterPreparePayment(response);
                    })
                    .fail(error =>
                    {
                        this.waiting = false;
                    });
            }
            else
            {
                this.waiting = false;
            }
        },

        validateCheckout()
        {
            if (this.isInvalidShippingCountry)
            {
                return false;
            }
            let isValid = true;

            for (const index in this.checkoutValidation)
            {
                if (this.checkoutValidation[index].validate)
                {
                    this.checkoutValidation[index].validate();

                    if (this.checkoutValidation[index].showError)
                    {
                        isValid = !this.checkoutValidation[index].showError;
                    }
                }
            }

            return isValid;
        },

        afterPreparePayment(response)
        {
            const paymentType = response.type || "errorCode";
            const paymentValue = response.value || "";

            switch (paymentType)
            {
            case "continue":
                if (this.targetContinue)
                {
                    navigateTo(this.targetContinue);
                }
                break;
            case "redirectUrl":
                // redirect to given payment provider
                window.location.assign(paymentValue);
                break;
            case "externalContentUrl":
                // show external content in iframe
                this.showModal(paymentValue, true);
                break;
            case "htmlContent":
                this.showModal(paymentValue, false);
                break;

            case "errorCode":
                NotificationService.error(paymentValue);
                this.waiting = false;
                break;
            default:
                NotificationService.error("Unknown response from payment provider: " + paymentType);
                this.waiting = false;
                break;
            }
        },

        showModal(content, isExternalContent)
        {
            if (isExternalContent)
            {
                this.$emit("payment-response", "<iframe src=\"" + content + "\">");
            }
            else
            {
                this.$emit("payment-response", content);
            }
        },

        checkAddressError()
        {
            const countryId = Number(this.deliveryAddress.id) === -99 ? this.billingAddress?.countryId : this.deliveryAddress?.countryId;

            if (countryId)
            {
                const validShippingCountry = this.shippingCountryList.find((country) => country.id === countryId);

                this.isInvalidShippingCountry = !validShippingCountry;
            }
        }

    },

    watch: {
        billingAddress()
        {
            if (Number(this.deliveryAddress.id) === -99)
            {
                this.checkAddressError();
            }
        },

        deliveryAddress()
        {
            this.checkAddressError();
        }
    }
});
