var ValidationService = require("services/ValidationService");
var ApiService = require("services/ApiService");

Vue.component("guest-login", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            email: ""
        };
    },

    created: function()
    {
        this.$options.template = this.template;
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
                .done(function()
                {
                    window.location.href = "/checkout";
                });
        }
    }
});
