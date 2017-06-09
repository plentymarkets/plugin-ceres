import $ from "jquery";

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
    errorClass = errorClass || "has-error";

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

export function unmarkAllFields(form)
{
    $form = $(form);

    $form.find("[data-validate]").each(function(i, elem)
    {
        const $elem = $(elem);

        $elem.removeClass("error");
    });
}

function _validateElement(elem)
{
    const $elem          = $(elem);
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
    const range     = _eval(validationKey) || {min: 1, max: 1};
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
    return (new Function("return " + input))();
}

export default {validate, getInvalidFields, markInvalidFields, unmarkAllFields};
