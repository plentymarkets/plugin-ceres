const state =
    {
        consents: {},
        hasResponse: false
    };

const mutations =
    {
        toggleConsent(state, key)
        {
            const groupKey = key.split(".")[0];
            const consentKey = key.split(".")[1];
            const value = !this.getters.isConsented(key);

            state.consents[groupKey] = state.consents[groupKey] || {};
            if (consentKey === "*")
            {
                Object.keys(state.consents[groupKey]).forEach((cKey) =>
                {
                    state.consents[groupKey][cKey] = value;
                });
            }
            else
            {
                state.consents[groupKey][consentKey] = value;
            }
        },
        acceptAll(state)
        {
            Object.keys((state.consents || {})).forEach((groupKey) =>
            {
                Object.keys(state.consents[groupKey]).forEach((consentKey) =>
                {
                    state.consents[groupKey] = state.consents[groupKey] || {};
                    state.consents[groupKey][consentKey] = true;
                });
            });
        },
        initConsents(state)
        {
            if (window.PlentyConsent)
            {
                state.consents = window.PlentyConsent.getConsents();
                state.hasResponse = window.PlentyConsent.hasResponse();
            }
        },
        storeConsents(state)
        {
            if (window.PlentyConsent)
            {
                window.PlentyConsent.setResponse(state.consents);
                state.hasResponse = true;
            }
        }
    };

const actions =
    {
    };

const getters =
    {
        isConsented: state => (key, defaultValue) =>
        {
            const groupKey = key.split(".")[0];
            const consentKey = key.split(".")[1];

            if (consentKey === "*")
            {
                return Object.keys(state.consents[groupKey] || {}).some((consentKey) =>
                {
                    return (state.consents[groupKey] || {})[consentKey];
                });
            }

            return (state.consents[groupKey] || {})[consentKey];
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
