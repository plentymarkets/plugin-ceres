var ApiService = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");

(function($)
{
    Vue.component("place-order", {

        props: [
            "targetContinue",
            "template"
        ],

        data: function()
        {
            return {
                waiting: false,
                checkout: {},
                checkoutValidation: {}
            };
        },

        created: function()
        {
            this.$options.template = this.template;

            ResourceService.bind("checkout", this);
            ResourceService.bind("checkoutValidation", this);
        },

        methods: {

            preparePayment: function()
            {
                this.waiting = true;
                var self = this;

                ApiService.post("/rest/io/checkout/payment")
                    .done(function(response)
                    {
                        if (self.validateCheckout())
                        {
                            self.afterPreparePayment(response);
                        }
                    })
                    .fail(function(response)
                    {
                        self.waiting = false;
                    });
            },

            validateCheckout: function()
            {
                var valid = false;

                for (var i in this.checkoutValidation)
                {
                    if (!this.checkoutValidation[i].isValid)
                    {
                        this.checkoutValidation[i].showError = true;
                        valid = true;
                    }
                }

                return valid;
            },

            afterPreparePayment: function(response)
            {
                var paymentType = response.type || "errorCode";
                var paymentValue = response.value || "";

                switch (paymentType)
                {
                case "continue":
                    var target = this.targetContinue;

                    if (target)
                        {
                        window.location.assign(target);
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
                    break;
                default:
                    NotificationService.error("Unknown response from payment provider: " + paymentType);
                    break;
                }
            },

            showModal: function(content, isExternalContent)
            {
                var $modal = $(this.$els.modal);
                var $modalBody = $(this.$els.modalContent);

                if (isExternalContent)
                {
                    $modalBody.html("<iframe src=\"" + content + "\">");
                }
                else
                {
                    $modalBody.html(content);
                }

                $modal.modal("show");

            }
        },

        computed:
        {
            waitingForInput: function()
            {
                var addressIsNotSet = this.checkout.billingAddressId === 0 || this.checkout.billingAddressId === "0";
                var shippingIsNotSet = this.checkout.shippingProfileId === 0 || this.checkout.shippingProfileId === "0";
                var paymentIsNotSet = this.checkout.methodOfPaymentId === 0 || this.checkout.methodOfPaymentId === "0";

                return addressIsNotSet || shippingIsNotSet || paymentIsNotSet;
            }
        }
    });
})(jQuery);
