import {navigateTo}from "services/UrlService";

var ApiService = require("services/ApiService");

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
                                navigateTo(window.location.origin);
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
