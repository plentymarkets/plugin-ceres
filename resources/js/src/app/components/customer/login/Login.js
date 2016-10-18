var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");

Vue.component("login", {

    template: "#vue-login",

    props: [
        "modalElement",
        "backlink"
    ],

    data: function()
    {
        return {
            password: "",
            username: ""
        };
    },

    methods: {
        /**
         * Open the login modal
         */
        showLogin: function()
        {
            ModalService.findModal(document.getElementById(this.modalElement)).show();
        },

        /**
         * Send the login data
         */
        sendLogin: function()
        {
            var component = this;

            ApiService.post("/rest/customer/login", {email: this.username, password: this.password}, {supressNotifications: true})
                .done(function(response)
                {
                    ApiService.setToken(response);

                    if (document.getElementById(component.modalElement) !== null)
                    {
                        ModalService.findModal(document.getElementById(component.modalElement)).hide();
                    }

                    NotificationService.success(Translations.Callisto.accLoginSuccessful).closeAfter(10000);

                    if (!(component.backlink === null || !component.backlink || component.backlink === ""))
                    {
                        window.location = component.backlink;
                    }
                })
                .fail(function(response)
                {
                    switch (response.code)
                    {
                    case 401:
                        NotificationService.error(Translations.Callisto.accLoginFailed).closeAfter(10000);
                        break;
                    default:
                        return;
                    }
                });
        }
    }
});
