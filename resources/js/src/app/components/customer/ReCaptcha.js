Vue.component("recaptcha", {

    props: {
        template: {
            type: String,
            default: "#vue-recaptcha"
        }
    },

    data()
    {
        return {
            version: App.config.global.googleRecaptchaVersion,
            apiKey: App.config.global.googleRecaptchaApiKey
        }
    },

    mounted()
    {
        debugger
        this.$nextTick(() =>
        {
            if (!document.querySelector("#google-recaptcha-api"))
            {
                this.createScript().then(() => this.initializeV3())
            }
        })
    },

    methods:
    {
        createScript()
        {
            return new Promise((resolve, reject) =>
            {
                const script = document.createElement("script")
                let scriptSource

                if (this.version == 3)
                {
                    scriptSource = `https://www.google.com/recaptcha/api.js?render=${this.apiKey}`
                }
                else
                {
                    scriptSource = "https://www.google.com/recaptcha/api.js"
                }

                script.type = "text/javascript"
                script.id = "google-recaptcha-api"
                script.src = scriptSource

                script.addEventListener("load", () => resolve(script), false)
                script.addEventListener("error", () => reject(script), false)

                document.body.appendChild(script)
            })
        },

        initializeV3()
        {
            if (this.version == 3)
            {
                grecaptcha.ready(() =>
                {
                    grecaptcha.execute(this.apiKey, { action: "homepage" })
                })
            }
        }
    }
});
