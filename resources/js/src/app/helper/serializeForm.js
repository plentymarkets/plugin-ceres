import { isDefined } from "./utils";

function _readElement(inputElement)
{
    let name   = inputElement.name;

    let label  = getLabel(inputElement);

    let value  = inputElement.value;

    if (inputElement.type === "checkbox")
    {
        if (name.substr(-2, 2) === "[]")
        {
            value = _readCheckboxGroup(name);
            name = name.substr(0, name.length - 2);
            label = getLabelForId(name);
        }
        else
        {
            value = inputElement.checked;
        }
    }
    else if (inputElement.type === "radio")
    {
        const selectedRadio = document.querySelector("[name=\"" + name + "\"]:checked");

        value = selectedRadio ? getLabel(selectedRadio) : null;
        label = getLabelForId(name);
    }
    else if (inputElement.tagName.toLocaleLowerCase() === "select")
    {
        const optionElement = inputElement.querySelector("option[value=\"" + value + "\"]");

        value = optionElement ? optionElement.textContent : "";
    }

    return {
        name:  name,
        label: label,
        value: value
    };
}

function _readCheckboxGroup(groupName)
{
    const results = [];

    const checkboxes = document.querySelectorAll("[name=\"" + groupName + "\"]");

    for (const checkbox of checkboxes)
    {
        if (checkbox.checked)
        {
            results.push(
                getLabel(checkbox)
            );
        }
    }

    return results;
}

export function getLabel(inputElement)
{
    if (!inputElement)
    {
        return "";
    }

    const labelElement = (inputElement.labels || Array.prototype.slice.call(inputElement.querySelectorAll("label")))[0];

    if (isDefined(labelElement))
    {
        const label = labelElement.textContent.trim();

        return label.charAt(label.length - 1) === "*" ? label.substr(0, label.length - 1) : label;
    }

    return getLabelForId(inputElement.id || inputElement.name);

}

export function getLabelForId(id)
{
    if (!id)
    {
        return "";
    }

    const labelElement = document.querySelector("label[for=\"" + id + "\"]");

    if (isDefined(labelElement))
    {
        const label = labelElement.textContent.trim();

        return label.charAt(label.length - 1) === "*" ? label.substr(0, label.length - 1) : label;
    }
    return "";
}

export function serializeForm(form)
{
    const formData = {};
    const formElements = form.querySelectorAll("[name]:not(.g-recaptcha-response):not([type=file])");

    for (const formElement of formElements)
    {
        const element   = _readElement(formElement);

        if (element.name)
        {
            formData[element.name] = {
                label: element.label,
                value: element.value
            };
        }
    }

    return formData;
}
