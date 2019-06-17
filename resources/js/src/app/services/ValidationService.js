import $ from "jquery";
import { isNull } from "../helper/utils";

let $form;

export function validate(form)
{
    const deferred      = $.Deferred();
    const invalidFields = getInvalidFields(form);

    if (invalidFields.length > 0)
    {
        deferred.rejectWith(form, [invalidFields]);
    }
    else
    {
        deferred.resolveWith(form);
    }

    return deferred;
}

export function getInvalidFields(form)
{
    $form = $(form);
    const invalidFormControls = [];

    $form.find("[data-validate]").each(function(i, elem)
    {

        if (!_validateElement($(elem)))
        {
            invalidFormControls.push(elem);
        }
    });

    return invalidFormControls;
}

export function markInvalidFields(fields, errorClass)
{
    errorClass = errorClass || "error";

    $(fields).each(function(i, elem)
    {
        const $elem = $(elem);

        $elem.addClass(errorClass);
        _findFormControls($elem).on("click.removeErrorClass keyup.removeErrorClass change.removeErrorClass", function()
        {
            if (_validateElement($elem))
            {
                $elem.removeClass(errorClass);
                if ($elem.is("[type=\"radio\"], [type=\"checkbox\"]"))
                {
                    const groupName = $elem.attr("name");

                    $("." + errorClass + "[name=\"" + groupName + "\"]").removeClass(errorClass);
                }
                _findFormControls($elem).off("click.removeErrorClass keyup.removeErrorClass change.removeErrorClass");
            }
        });
    });
}

export function markFailedValidationFields(form, validationErrors, errorClass)
{
    $form = $(form);

    errorClass = errorClass || "error";

    $form.find("[data-model]").each((i, elem) =>
    {
        const $elem = $(elem);
        const attribute = $elem.attr("data-model");

        if (attribute in validationErrors)
        {
            $elem.addClass(errorClass);

            const fieldLabel = $elem.find("label")[0].innerHTML.replace("*", "");

            if (fieldLabel)
            {
                const attributeCamel = attribute.replace(/([A-Z])/g, " $1").toLowerCase();

                validationErrors[attribute][0] = validationErrors[attribute][0].replace(attributeCamel.replace("_", " "), fieldLabel);
            }
        }
    });
}

export function unmarkAllFields(form)
{
    $form = $(form);

    $form.find("[data-validate]").each(function(i, elem)
    {
        const $elem = $(elem);

        $elem.removeClass("error");

        _findFormControls($elem).off("click.removeErrorClass keyup.removeErrorClass change.removeErrorClass");
    });
}

function _validateElement(elem)
{
    const $elem = $(elem);

    /** return if the attribute data-validate is not present on the element */
    if (!$elem[0].attributes.hasOwnProperty("data-validate"))
    {
        return true;
    }

    const validationKeys = $elem.attr("data-validate").split("|").map(function(i)
    {
        return i.trim();
    }) || ["text"];
    let hasError       = false;

    _findFormControls($elem).each(function(i, formControl)
    {
        const $formControl  = $(formControl);
        const validationKey = validationKeys[i] || validationKeys[0];

        if (!_isActive($formControl))
        {
            // continue loop
            return true;
        }

        if ($formControl.is("[type=\"checkbox\"], [type=\"radio\"]"))
        {

            if (!_validateGroup($formControl, validationKey))
            {
                hasError = true;
            }

            return true;
        }

        if ($formControl.is("select"))
        {
            if (!_validateSelect($formControl, validationKey))
            {
                hasError = true;
            }

            return true;
        }

        if (!_validateInput($formControl, validationKey))
        {
            hasError = true;
        }

        return false;
    });

    return !hasError;
}

function _validateGroup($formControl, validationKey)
{
    const groupName = $formControl.attr("name");
    const $group    = $form.find("[name=\"" + groupName + "\"]");
    const range     = _eval(validationKey) || { min: 1, max: 1 };
    const checked   = $group.filter(":checked").length;

    return checked >= range.min && checked <= range.max;
}

function _validateSelect($formControl, validationKey)
{
    return $.trim($formControl.val()) !== validationKey;
}

function _validateInput($formControl, validationKey)
{

    switch (validationKey)
    {
    case "text":
        return _hasValue($formControl);
    case "number":
        return _hasValue($formControl) && $.isNumeric($.trim($formControl.val()));
    case "ref":
        return _compareRef($.trim($formControl.val()), $.trim($formControl.attr("data-validate-ref")));
    case "date":
        return _isValidDate($formControl);
    case "mail":
        return _isMail($formControl);
    case "password":
        return _isPassword($formControl);
    case "regex":
    {
        const ref = $formControl.attr("data-validate-ref");
        const regex = ref.startsWith("/") ? _eval(ref) : new RegExp(ref);

        return _hasValue($formControl) && regex.test($.trim($formControl.val()));
    }
    default:
        console.error("Form validation error: unknown validation property: \"" + validationKey + "\"");
        return true;
    }
}

function _hasValue($formControl)
{
    return $.trim($formControl.val()).length > 0;
}

/**
 * @param {any} $formControl - Input inside Formular
 * @returns value is valid date
 */
function _isValidDate($formControl)
{
    const string = $formControl.val();
    const match = string.match(/^(?:(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{4}))|(?:(\d{4})[.\/-](\d{1,2})[.\/-](\d{1,2}))$/);

    // If match is null date is not valid
    if (isNull(match))
    {
        return false;
    }

    const year = match[3] || match[4];
    const month = match[2] || match[5];
    const day = match[1] || match[6];

    // Additional checks
    if ((year >= 1901) && (month >= 1 && month <= 12) && (day >= 1 && day <= 31))
    {
        return true;
    }

    return false;
}

/**
 * @param {any} value
 * @returns value is valid mail
 */
function _isMail($formControl)
{
    const mailRegEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\x7f-\xff\-0-9]+\.)+[a-zA-Z\x7f-\xff]{2,}))$/);

    return mailRegEx.test($formControl.val());
}

/**
 * Minimum eight characters, at least one letter and one number
 *
 * @param {any} value
 * @returns value is valid password
 */
function _isPassword($formControl)
{
    const passwordRegEx = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)\S{8,}$/);

    return passwordRegEx.test($formControl.val());
}

function _compareRef(value, ref)
{
    if ($(ref).length > 0)
    {
        ref = $.trim($(ref).val());
    }

    return value === ref;
}

function _findFormControls($elem)
{
    if ($elem.is("input, select, textarea"))
    {
        return $elem;
    }

    return $elem.find("input, select, textarea");
}

function _isActive($elem)
{
    return $elem.is(":visible") && $elem.is(":enabled");
}

function _eval(input)
{
    // eslint-disable-next-line
    return (new Function(`return ${ input };`))();
}

export default { validate, getInvalidFields, markInvalidFields, markFailedValidationFields, unmarkAllFields };
