var ValidationService = require("services/ValidationService");
var ApiService = require("services/ApiService");

Vue.component("guest-login", {

    template: "#vue-guest-login",

    data: function()
    {
        return {
            email: ""
        };
    },

    methods: {
        validate: function()
        {
            ValidationService.validate($("#guest-login-form-" + this._uid))
                .done(function()
                {
                    this.sendEMail();
                }.bind(this))
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        sendEMail: function()
        {
            ApiService.post("/rest/io/guest", {email: this.email})
                .done(function(response)
                {
                    window.location.href("/checkout");
                });
        }
    }
});
