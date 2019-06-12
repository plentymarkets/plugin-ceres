const ApiService = require("services/ApiService");
const NotificationService = require("services/NotificationService");

import { isDefined } from "../../helper/utils";
import { navigateTo } from "services/UrlService";

Vue.component("place-order", {
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
        buttonSize:
        {
            type: [String, null],
            default: null,
            validator: value =>
            {
                return ["sm", "lg"].indexOf(value) !== -1;
            }
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
            waiting: false
        };
    },

    computed:
    {
        buttonClasses()
        {
            const classes = [];

            if (isDefined(this.buttonSize))
            {
                classes.push(`btn-${this.buttonSize}`);
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

        ...Vuex.mapState({
            checkoutValidation: state => state.checkout.validation,
            contactWish: state => state.checkout.contactWish,
            isBasketLoading: state => state.basket.isBasketLoading,
            basketItemQuantity: state => state.basket.data.itemQuantity,
            isBasketInitiallyLoaded: state => state.basket.isBasketInitiallyLoaded,
            shippingPrivacyHintAccepted: state => state.checkout.shippingPrivacyHintAccepted,
            newsletterSubscription: state => state.checkout.newsletterSubscription
        })
    },

    methods: {
        placeOrder()
        {
            this.waiting = true;

            const url = "/rest/io/order/additional_information";
            const params = {
                orderContactWish: this.contactWish,
                shippingPrivacyHintAccepted: this.shippingPrivacyHintAccepted,
                newsletterSubscriptions: this.activeNewsletterSubscriptions
            };
            const options = { supressNotifications: true };

            ApiService.post(url, params, options)
                .always(() =>
                {
                    this.preparePayment();
                });
        },

        preparePayment()
        {
            this.waiting = true;

            if (this.validateCheckout() && this.basketItemQuantity > 0)
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
                var target = this.targetContinue;

                if (target)
                {
                    navigateTo(target);
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
        }
    }
});
