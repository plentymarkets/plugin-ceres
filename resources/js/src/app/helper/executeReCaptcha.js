export function executeReCaptcha(form)
{
    let response = Promise.resolve(null);
    const recaptchaElement = form.querySelector("[data-recaptcha]");

    if (window.grecaptcha && recaptchaElement)
    {
        response = new Promise((resolve, reject) =>
        {
            if (App.config.global.googleRecaptchaVersion === 3)
            {
                window.grecaptcha.execute(
                    App.config.global.googleRecaptchaApiKey,
                    { action: "homepage" }
                ).then(response =>
                {
                    if (response)
                    {
                        resolve(response);
                    }
                    else
                    {
                        reject();
                    }
                });
            }
            else
            {
                window.grecaptcha.execute(recaptchaElement.dataset.recaptcha);
                recaptchaElement
                    .querySelector("[name=\"g-recaptcha-response\"]")
                    .addEventListener("recaptcha-response", (evt) =>
                    {
                        if (evt.target.value)
                        {
                            resolve(evt.target.value);
                        }
                        else
                        {
                            window.grecaptcha.reset(recaptchaElement.dataset.recaptcha);
                            reject();
                        }
                    });
            }
        });
    }

    return response;
}
