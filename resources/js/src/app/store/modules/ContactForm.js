import ValidationService from "services/ValidationService";
import NotificationService from "services/NotificationService";
import TranslationService from "services/TranslationService";
import ApiService from "services/ApiService";
import { serializeForm, getLabel } from "../../helper/serializeForm";
import { isMail } from "../../helper/strings";

function readFormOptions(form, formData)
{
    const formOptions = {
        recipient: "",
        subject: "",
        cc: [],
        bcc: [],
        replyTo: {
            mail: null,
            name: ""
        }
    };
    const formOptionElements = form.querySelectorAll("[data-mail]");

    for (const element of formOptionElements)
    {
        if (element.type !== "checkbox" || element.checked)
        {
            switch (element.dataset.mail)
            {
            case "cc":
                if (element.value)
                {
                    if (isMail(element.value))
                    {
                        formOptions.cc.push(element.value);
                    }
                    else if (formData.hasOwnProperty(element.value) && isMail(formData[element.value].value))
                    {
                        formOptions.cc.push(formData[element.value].value);
                    }
                }
                break;
            case "bcc":
                if (element.value)
                {
                    if (isMail(element.value))
                    {
                        formOptions.bcc.push(element.value);
                    }
                    else if (formData.hasOwnProperty(element.value) && isMail(formData[element.value].value))
                    {
                        formOptions.bcc.push(formData[element.value].value);
                    }
                }
                break;
            case "reply-to-address":
                if (element.value)
                {
                    if (isMail(element.value))
                    {
                        formOptions.replyTo.mail = element.value;
                    }
                    else if (formData.hasOwnProperty(element.value) && isMail(formData[element.value].value))
                    {
                        formOptions.replyTo.mail = formData[element.value].value;
                    }
                }
                break;
            case "reply-to-name":
                if (element.value)
                {
                    if (formData.hasOwnProperty(element.value))
                    {
                        formOptions.replyTo.name = formData[element.value].value;
                    }
                    else
                    {
                        formOptions.replyTo.name = element.value;
                    }
                }
                break;
            case "subject":
                if (element.value)
                {
                    if (formData.hasOwnProperty(element.value))
                    {
                        formOptions.subject = formData[element.value].value;
                    }
                    else
                    {
                        formOptions.subject = element.value;
                    }
                }
                break;
            case "recipient":
                if (element.value)
                {
                    if (formData.hasOwnProperty(element.value))
                    {
                        formOptions.recipient = formData[element.value].value;
                    }
                    else
                    {
                        formOptions.recipient = element.value;
                    }
                }
                break;
            default:
                break;
            }
        }
    }

    return formOptions;
}

function disableForm(form, disabled)
{
    Array.prototype.slice.call(
        form.querySelectorAll("input, select, textarea, button")
    ).forEach(input => input.disabled = disabled);
}

const actions =
    {
        sendContactForm(state, event)
        {
            event.preventDefault();
            event.stopPropagation();

            if (event.target.tagName !== "FORM")
            {
                return;
            }

            let recaptchaValidation = Promise.resolve(null);
            const recaptchaElement = event.target.querySelector("[data-recaptcha]");

            if (window.grecaptcha && App.config.global.googleRecaptchaVersion === 3)
            {
                // V3
                recaptchaValidation = new Promise((resolve, reject) =>
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
                });
            }
            else if ( window.grecaptcha && App.config.global.googleRecaptchaVersion === 2 && !!recaptchaElement)
            {
                // V2 Invisible
                recaptchaValidation = new Promise((resolve, reject) =>
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
                                reject();
                            }
                        });
                });
            }

            recaptchaValidation
                .then((recaptchaResponse) =>
                {
                    ValidationService.validate(event.target)
                        .done(() =>
                        {
                            disableForm(event.target, true);

                            const formData    = serializeForm(event.target);
                            const formOptions = readFormOptions(event.target, formData);

                            ApiService.post(
                                "/rest/io/customer/contact/mail",
                                {
                                    data:       formData,
                                    recipient:  formOptions.recipient,
                                    subject:    formOptions.subject || "",
                                    cc:         formOptions.cc,
                                    replyTo:    formOptions.replyTo,
                                    recaptchaToken: recaptchaResponse
                                }
                            )
                                .done(reponse =>
                                {
                                    event.target.reset();
                                    disableForm(event.target, false);
                                    NotificationService.success(
                                        TranslationService.translate("Ceres::Template.contactSendSuccess")
                                    );
                                })
                                .fail(response =>
                                {
                                    disableForm(event.target, false);
                                    NotificationService.error(
                                        TranslationService.translate("Ceres::Template.contactSendFail")
                                    );
                                });
                        })
                        .fail(invalidFields =>
                        {
                            const fieldNames = [];

                            for (const field of invalidFields)
                            {
                                fieldNames.push(getLabel(field));
                            }

                            ValidationService.markInvalidFields(invalidFields, "error");
                            NotificationService.error(
                                TranslationService.translate("Ceres::Template.checkoutCheckAddressFormFields", { fields: fieldNames.join(", ") })
                            );
                        });
                })
                .catch(() =>
                {
                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.contactReCaptchaFailed")
                    );
                });
        }
    };

export default
{
    actions
};
