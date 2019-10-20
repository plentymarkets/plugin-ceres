import Vue from "vue";

Vue.component("privacy-settings", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-privacy-settings"
        },
        consents:
        {
            type: Object,
            default: null
        }
    },

    mounted()
    {
        if (window.PlentyConsent)
        {
            this.innerConsents = this.consents || window.PlentyConsent.getConsents();
        }
    },

    data()
    {
        return {
            innerConsents: {},
            expandedGroups: {}
        };
    },

    watch:
    {
        consents(value)
        {
            this.innerConsents = value;
        }
    },

    methods:
    {
        toggleConsent(key)
        {
            const groupKey = key.split(".")[0];
            let consentKey = key.split(".")[1];
            let value = !this.isConsented(key);

            this.innerConsents[groupKey] = this.innerConsents[groupKey] || {};
            if (consentKey === "*")
            {
                for (consentKey in this.innerConsents[groupKey] )
                {
                    this.innerConsents[groupKey][consentKey] = value;
                }
            }
            else
            {
                this.innerConsents[groupKey][consentKey] = value;
            }
        },

        isConsented(key)
        {
            const groupKey = key.split(".")[0];
            const consentKey = key.split(".")[1];

            if (consentKey === "*")
            {
                const res = Object.keys(this.innerConsents[groupKey] || {}).some((consentKey) =>
                {
                    return (this.innerConsents[groupKey] || {})[consentKey];
                });

                return res;
            }

            return (this.innerConsents[groupKey] || {})[consentKey];
        },

        updateSettings()
        {
            if (window.PlentyConsent)
            {
                window.PlentyConsent.setResponse(this.innerConsents);
            }
            this.$emit("updated", this.innerConsents);
        },

        acceptAll()
        {
            Object.keys((this.innerConsents || {})).forEach((groupKey) =>
            {
                Object.keys(this.innerConsents[groupKey]).forEach((consentKey) =>
                {
                    this.innerConsents[groupKey] = this.innerConsents[groupKey] || {};
                    this.innerConsents[groupKey][consentKey] = true;
                });
            });

            this.updateSettings();
        },

        setGroupVisibility(groupKey, value, event)
        {
            event.preventDefault();
            event.stopPropagation();
            this.$set(this.expandedGroups, groupKey, value);
        }
    }
});
