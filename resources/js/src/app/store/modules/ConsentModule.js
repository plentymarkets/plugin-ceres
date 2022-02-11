function _setConsent(state, { key, value })
{
    const groupKey = key.split(".")[0];
    const consentKey = key.split(".")[1];

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
}

function setStateForConsents(state, changeTo)
{
    Object.keys((state.consents || {})).forEach((groupKey) =>
    {
        if (typeof state.consents[groupKey] === "object")
        {
            Object.keys(state.consents[groupKey]).forEach((consentKey) =>
            {

                state.consents[groupKey] = state.consents[groupKey] || {};
                if (window.ConsentManager && !window.ConsentManager.isNecessary(`${groupKey}.${consentKey}`))
                {
                    state.consents[groupKey][consentKey] = changeTo;
                }
            });
        }
    });

    if (window.ConsentManager)
    {
        window.ConsentManager.setResponse(state.consents);
        state.hasResponse = true;
    }
}

const state = () => ({
    consents: {},
    hasResponse: false
});

const mutations =
    {
        toggleConsent(state, key)
        {
            _setConsent(state, { key: key, value: !this.getters.isConsented(key) });
        },
        setConsent(state, key, value)
        {
            _setConsent(state, { key, value });
        },
        acceptAll(state)
        {
            setStateForConsents(state, true);
        },
        denyAll(state)
        {
            setStateForConsents(state, false);
        },
        initConsents(state)
        {
            if (window.ConsentManager)
            {
                state.consents = window.ConsentManager.getConsents();
                state.hasResponse = window.ConsentManager.hasResponse();
            }
        },
        storeConsents(state)
        {
            if (window.ConsentManager)
            {
                window.ConsentManager.setResponse(state.consents);
                state.hasResponse = true;
            }
        }
    };

const getters =
    {
        isConsented: state => (key) =>
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
    getters
};


