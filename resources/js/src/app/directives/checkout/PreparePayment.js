var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");

Vue.directive("prepare-payment", {

    params: ["trigger", "selector-container", "selector-iframe", "target-continue"],

    bind: function()
    {
        var self = this;
        var trigger = this.params.trigger || "click";
        var $elem   = trigger === "ready" ? $(document) : $(this.el);

        $elem.on(trigger, function(event)
        {
            event.preventDefault();

            ApiService.post("/rest/checkout/payment").done(function(response)
            {
                var paymentType     = response.type || "continue";
                var paymentValue    = response.value || "";

                switch (paymentType)
                {
                case "redirectUrl":
                    window.location.assign(paymentValue);
                    break;
                case "externalContentUrl":
                    var iframe = self.getParam("selectorIframe");

                    if (iframe)
                        {
                        $(iframe).attr("src", paymentValue);
                    }
                    break;
                case "htmlContent":
                    var container = self.getParam("selectorContainer");

                    if (container)
                        {
                        $(container).html(paymentValue);
                    }
                    break;
                case "continue":
                    var target = self.getParam("targetContinue");

                    if (target)
                        {
                        window.location.assign(target);
                    }
                    break;
                case "errorCode":
                    NotificationService.error("Bei der Zahlungsabwicklung trat ein Fehler auf: " + paymentValue);
                    break;
                default:
                    NotificationService.error("Unbekannte Antwort des Zahlungsanbieters: " + paymentType);
                    break;
                }
            });
        });
    },

    getParam: function(key)
    {
        var param = this.params[key];

        if (!param)
        {
            console.error("param \"" + key + "\" not set.");
        }

        return param;
    }

});
