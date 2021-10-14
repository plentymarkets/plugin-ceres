<template>
    <div data-recaptcha></div>
</template>

<script>
let gRecaptchaApiLoaded;

import { whenConsented } from "../../helper/whenConsented";


export default {

    name: "recaptcha",

    data()
    {
        return {
            version: App.config.global.googleRecaptchaVersion,
            apiKey: App.config.global.googleRecaptchaApiKey,
            recaptchaInitiated: false
        };
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.checkConsent();
            document.addEventListener("consent-change", () => this.checkConsent());
        });
    },

    methods:
    {
        checkConsent()
        {
            whenConsented(
                "media.reCaptcha",
                () =>
                {
                    this.createScript().then(() => this.initializeV3());
                },
                () =>
                {
                    // remove recaptcha when previously consented
                });
        },

        createScript()
        {
            if (!this.apiKey || window.grecaptcha)
            {
                return Promise.resolve();
            }

            if (!gRecaptchaApiLoaded && !this.recaptchaInitiated)
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
            if (window.grecaptcha && !this.recaptchaInitiated)
            {
                this.recaptchaInitiated = true;
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
}
</script>
