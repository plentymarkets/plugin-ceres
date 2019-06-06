import { navigateTo } from "services/UrlService";

const ApiService = require("services/ApiService");

Vue.directive("logout",
    {
        bind(el)
        {
            /**
             * Logout the current user
             */
            $(el).click(
                function(event)
                {
                    $(el).addClass("disabled");

                    ApiService.post("/rest/io/customer/logout")
                        .done(
                            function()
                            {
                                let url = window.location.origin;

                                if (App.defaultLanguage != App.language)
                                {
                                    url = url + "/" + App.language;
                                    if (App.urlTrailingSlash)
                                    {
                                        url += "/";
                                    }
                                }
                                navigateTo(url);
                            })
                        .fail(
                            function()
                            {
                                $(el).removeClass("disabled");
                            });

                    event.preventDefault();
                });
        }
    });
