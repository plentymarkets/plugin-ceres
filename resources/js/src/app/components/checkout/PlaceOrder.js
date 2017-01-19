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
                checkout: {}
            };
        },

        created: function()
        {
            this.$options.template = this.template;

            ResourceService.bind("checkout", this);
        },

        methods: {

            preparePayment: function()
            {
                this.waiting = true;

                ApiService.post("/rest/io/checkout/payment")
                    .done(function(response)
                    {
                        var self = this;

                        var paymentType = response.type || "errorCode";
                        var paymentValue = response.value || "";

                        switch (paymentType)
                        {
                        case "continue":
                            var target = self.targetContinue;

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
                            self.showModal(paymentValue, true);
                            break;
                        case "htmlContent":
                            self.showModal(paymentValue, false);
                            break;

                        case "errorCode":
                            NotificationService.error(paymentValue);
                            break;
                        default:
                            NotificationService.error("Unknown response from payment provider: " + paymentType);
                            break;
                        }
                    })
                    .fail(function(response)
                    {
                        this.waiting = false;
                    });
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
