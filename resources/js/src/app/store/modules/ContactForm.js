import ValidationService from "services/ValidationService";
import NotificationService from "services/NotificationService";
import TranslationService from "services/TranslationService";
import ApiService from "services/ApiService";
import {serializeForm, getLabel} from "../../helper/serializeForm";
import {isMail} from "../../helper/strings";

function readFormOptions(form, formData)
{
    const formOptions = {
        recipient: "",
        subject: "",
        cc: [],
        replyTo: {
            mailAddress: null,
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
            case "reply-to-address":
                if (element.value)
                {
                    if (isMail(element.value))
                    {
                        formOptions.replyTo.mailAddress = element.value;
                    }
                    else if (formData.hasOwnProperty(element.value) && isMail(formData[element.value].value))
                    {
                        formOptions.replyTo.mailAddress = formData[element.value].value;
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

            ValidationService.validate(event.target)
                .done(() =>
                {
                    const formData = serializeForm(event.target);
                    const formOptions = readFormOptions(event.target, formData);

                    ApiService.post(
                        "/rest/io/customer/contact/mail",
                        {
                            mailData: formData,
                            recipient: formOptions.recipient,
                            subject: formOptions.subject || "",
                            cc: formOptions.cc,
                            replyTo: formOptions.replyTo
                        }
                    )
                    .done(reponse =>
                    {
                        event.target.reset();
                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.contactSendSuccess")
                        );
                    })
                    .fail(response =>
                    {
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
                        TranslationService.translate("Ceres::Template.checkoutCheckAddressFormFields", {fields: fieldNames.join(", ")})
                    );
                });
        }
    };

export default
{
    actions
};
