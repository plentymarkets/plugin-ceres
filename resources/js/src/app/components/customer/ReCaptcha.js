let gRecaptchaApiLoaded;

import Vue from "vue";

Vue.component("recaptcha", {

    template: "<div data-recaptcha></div>",

    data()
    {
        return {
            version: App.config.global.googleRecaptchaVersion,
            apiKey: App.config.global.googleRecaptchaApiKey
        };
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.createScript().then(() => this.initializeV3());
        });
    },

    methods:
    {
        createScript()
        {
            if (!this.apiKey)
            {
                return Promise.resolve();
            }

            if (!gRecaptchaApiLoaded)
            {
                gRecaptchaApiLoaded = new Promise((resolve, reject) =>
                {
                    const script = document.createElement("script");
                    let scriptSource;

                    if (this.version === 3)
                    {
                        scriptSource = `https://www.google.com/recaptcha/api.js?render=${this.apiKey}`;
                    }
                    else
                    {
                        scriptSource = "https://www.google.com/recaptcha/api.js";
                    }

                    script.type = "text/javascript";
                    script.id = "google-recaptcha-api";
                    script.src = scriptSource;

                    script.addEventListener("load", () => resolve(script), false);
                    script.addEventListener("error", () => reject(script), false);

                    document.body.appendChild(script);
                });
            }

            return gRecaptchaApiLoaded;
        },

        initializeV3()
        {
            if (window.grecaptcha)
            {
                window.grecaptcha.ready(() =>
                {
                    if (this.version !== 3)
                    {
                        this.$el.dataset.recaptcha = window.grecaptcha.render(
                            this.$el,
                            {
                                sitekey: this.apiKey,
                                size: "invisible",
                                badge: "bottomright",
                                callback: this.recaptchaCallback.bind(this)
                            }
                        );
                    }
                });
            }
        },

        recaptchaCallback(response)
        {
            this.$el.querySelector("[name=\"g-recaptcha-response\"]")
                .dispatchEvent(
                    new CustomEvent("recaptcha-response", { response: response })
                );
        }
    }
});
