import Vue from "vue";

Vue.component("cookie-bar", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-cookie-bar"
        }
    },

    mounted()
    {
        if (window.PlentyConsent)
        {
            this.consents = window.PlentyConsent.getConsents();
            this.hasResponse = window.PlentyConsent.hasResponse();
        }
    },

    data()
    {
        return {
            isExpanded: false,
            hasResponse: false,
            consents: {}
        };
    },

    methods:
    {
        isConsented(groupKey)
        {
            return Object.keys(this.consents[groupKey] || {}).some((consentKey) =>
            {
                return (this.consents[groupKey] || {})[consentKey];
            });
        },

        toggleConsent(groupKey)
        {
            const value = !this.isConsented(groupKey);

            for (let consentKey in this.consents[groupKey] )
            {
                this.consents[groupKey][consentKey] = value;
            }
        },

        updateConsents(consents)
        {
            this.consents = consents;
            this.isExpanded = false;
            this.hasResponse = true;
        },

        updateSettings()
        {
            if (window.PlentyConsent)
            {
                window.PlentyConsent.setResponse(this.consents);
            }
            this.hasResponse = true;
        },

        acceptAll()
        {
            Object.keys((this.consents || {})).forEach((groupKey) =>
            {
                Object.keys(this.consents[groupKey]).forEach((consentKey) =>
                {
                    this.consents[groupKey] = this.consents[groupKey] || {};
                    this.consents[groupKey][consentKey] = true;
                });
            });

            this.updateSettings();
        }
    }
});
