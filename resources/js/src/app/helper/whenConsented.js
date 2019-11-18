function _call(callback)
{
    if (!!callback && typeof callback === "function")
    {
        callback();
    }
}

export function whenConsented(key, onConsent, onDecline)
{
    if (!App.config.global.blockCookies || App.isShopBuilder)
    {
        _call(onConsent);
        return;
    }

    if (window.ConsentManager)
    {
        if (window.ConsentManager.hasResponse())
        {
            _call(window.ConsentManager.isConsented(key) ? onConsent : onDecline);
        }
        else
        {
            document.addEventListener("consent-change", () =>
            {
                whenConsented(key, onConsent, onDecline);
            }, { once: true });
        }
    }
    else
    {
        _call(onConsent);
    }
}
