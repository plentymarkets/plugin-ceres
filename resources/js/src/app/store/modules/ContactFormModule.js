import ValidationService from "../../services/ValidationService";
import NotificationService from "../../services/NotificationService";
import TranslationService from "../../services/TranslationService";
import { serializeForm, getLabel } from "../../helper/serializeForm";
import { isMail } from "../../helper/strings";
import { executeReCaptcha } from "../../helper/executeReCaptcha";

const ApiService = require("../../services/ApiService");

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

function remapCancellationFormData(form, formData)
{
    const mailKey = form.querySelector("[data-mail=\"reply-to-address\"]")?.value ?? null;
    const nameKey = form.querySelector("[data-mail=\"reply-to-name\"]")?.value ?? null;

    const remapped = {};

    for (const [key, entry]of Object.entries(formData))
    {
        if (key === "username")
        {
            remapped[key] = entry;
        }
        else if (key === mailKey)
        {
            remapped[key + "_mail"] = entry;
        }
        else if (key === nameKey)
        {
            remapped[key + "_name"] = entry;
        }
        else
        {
            const inputEl = form.querySelector("[name=\"" + key + "\"]");
            const suffix  = inputEl && inputEl.tagName.toLowerCase() === "textarea"
                ? "_message"
                : "_order";

            remapped[key + suffix] = entry;
        }
    }

    return remapped;
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

            const btnClassName = event.submitter.className;
            const btnSendContactForm = "btn-send-contact-form";

            if (event.target.tagName !== "FORM" || !btnClassName.includes(btnSendContactForm))
            {
                return;
            }

            const recaptchaEl = event.target.querySelector("[data-recaptcha]");

            if (App.config.global.googleRecaptchaApiKey && (!window.grecaptcha || !recaptchaEl))
            {
                NotificationService.error(TranslationService.translate("Ceres::Template.contactAcceptRecaptchaCookie"));
                return;
            }

            executeReCaptcha(event.target)
                .then((recaptchaResponse) =>
                {
                    ValidationService.validate(event.target)
                        .done(() =>
                        {
                            disableForm(event.target, true);

                            const formData    = serializeForm(event.target);
                            const formOptions = readFormOptions(event.target, formData);

                            sendFile(event, recaptchaResponse).then((response) =>
                            {
                                resetRecaptcha(recaptchaEl);
                                executeReCaptcha(event.target).then((recaptchaToken2) =>
                                {
                                    const formType = event.target.dataset.formType;
                                    const endpoint = formType === "contract-withdrawal"
                                        ? "/rest/io/cancellation"
                                        : "/rest/io/customer/contact/mail";

                                    const postData = formType === "contract-withdrawal"
                                        ? remapCancellationFormData(event.target, formData)
                                        : formData;

                                    ApiService.post(
                                        endpoint,
                                        {
                                            data:       postData,
                                            recipient:  formOptions.recipient,
                                            subject:    formOptions.subject || "",
                                            cc:         formOptions.cc,
                                            bcc:        formOptions.bcc,
                                            replyTo:    formOptions.replyTo,
                                            recaptchaToken: recaptchaToken2,
                                            fileKeys: response.fileKeys
                                        }
                                    )
                                        .done(response =>
                                        {
                                            resetRecaptcha(recaptchaEl);
                                            event.target.reset();
                                            disableForm(event.target, false);
                                            NotificationService.success(
                                                TranslationService.translate("Ceres::Template.contactSendSuccess")
                                            ).closeAfter(3000);
                                            document.dispatchEvent(
                                                new CustomEvent(
                                                    "contactFormSent",
                                                    {
                                                        detail: formData
                                                    }
                                                )
                                            );
                                        })
                                        .fail(response =>
                                        {
                                            resetRecaptcha(recaptchaEl);
                                            disableForm(event.target, false);
                                            NotificationService.error(TranslationService.translate("Ceres::Template.contactSendFail"));
                                        });
                                });
                            },
                            (response) =>
                            {
                                resetRecaptcha(recaptchaEl);
                                disableForm(event.target, false);
                                response.error.message = response.error.message || TranslationService.translate("Ceres::Template.contactFileUploadFail");
                                NotificationService.error(response.error);
                            });
                        })
                        .fail(invalidFields =>
                        {
                            resetRecaptcha(recaptchaEl);

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
                .catch((error) =>
                {
                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.contactReCaptchaFailed")
                    );
                });
        }
    };

function sendFile(event, recaptchaToken)
{
    return new Promise((resolve, reject) =>
    {
        const formData = new FormData();
        const fileInputs = event.target.querySelectorAll("input[type=file]");

        let containsFiles = false;

        for (const fileInput of fileInputs)
        {
            for (const file of fileInput.files)
            {
                containsFiles = true;
                formData.append("fileData[]", file);
            }
        }

        if (!containsFiles)
        {
            resolve({});
            return;
        }

        formData.append("recaptchaToken", recaptchaToken);

        ApiService.post("/rest/io/customer/contact/mail/file",
            formData,
            { processData: false, contentType: false, cache: false, async: true, timeout: 60000, supressNotifications: true })
            .done((response) =>
            {
                resolve(response);
            })
            .fail((error) =>
            {
                reject(error);
            });
    });
}

function resetRecaptcha(recaptchaEl)
{
    if (App.config.global.googleRecaptchaVersion === 2 && window.grecaptcha)
    {
        window.grecaptcha.reset(recaptchaEl);
    }
}

export default
{
    actions
};
