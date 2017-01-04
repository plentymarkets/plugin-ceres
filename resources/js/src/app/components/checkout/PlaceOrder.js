var ApiService = require("services/ApiService");
var NotificationService = require("services/NotificationService");

(function($)
{
    Vue.component("placeOrder", {

        template: "#vue-place-order",

        props: ["targetContinue"],

        data: function()
        {
            return {};
        },

        methods: {

            preparePayment: function()
            {
                var self = this;

                ApiService.post("/rest/checkout/payment").done(function(response)
                {
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
        }
    });
})(jQuery);
