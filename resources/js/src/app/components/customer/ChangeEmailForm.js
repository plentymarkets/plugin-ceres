import TranslationService from "services/TranslationService";
// import { navigateTo } from "services/UrlService";

const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");

Vue.component("change-email-form", {

    data()
    {
        return {
            email: "",
            password: "",
            isDisabled: false
        };
    },

    methods: {
        /**
         * Send the login data
         */
        sendLogin()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/login", { email: this.email, password: this.password }, { supressNotifications: true })
                .done(response =>
                {
                    ApiService.setToken(response);

                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.loginSuccessful")
                    ).closeAfter(10000);

                    // if (this.backlink !== null && this.backlink)
                    // {
                    //     location.assign(decodeURIComponent(this.backlink));
                    // }
                    // else if (this.hasToForward)
                    // {
                    //     location.assign(location.origin);
                    // }
                    // else
                    // {
                    //     location.reload();
                    // }
                })
                .fail(response =>
                {
                    this.isDisabled = false;

                    switch (response.error.code)
                    {
                    case 401:
                        this.loginFields.addClass("has-login-error");

                        var translationKey = "Ceres::Template.loginFailed";

                        if (response.error.message.length > 0 && response.error.message === "user is blocked")
                            {
                            translationKey = "Ceres::Template.loginBlocked";
                        }
                        NotificationService.error(
                                TranslationService.translate(translationKey)
                            ).closeAfter(10000);
                        break;
                    default:
                        return;
                    }
                });
        }
    }
});
