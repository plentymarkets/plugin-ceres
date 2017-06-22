export function isAddressFieldEnabled(countryId, addressType, field)
{
    let address = {};
    let enabledFields = {};

    if (typeof countryId === "undefined")
    {
        countryId = 1;
    }

    if (addressType === "1")
    {
        address = "billing_address";

        if (countryId === 1)
        {
            enabledFields = App.config.enabledBillingAddressFields;
        }
        else
        {
            enabledFields = App.config.enabledBillingAddressFieldsUK;
        }
    }
    else
    {
        address = "delivery_address";

        if (countryId === "1")
        {
            enabledFields = App.config.enabledDeliveryAddressFields;
        }
        else
        {
            enabledFields = App.config.enabledDeliveryAddressFieldsUK;
        }
    }

    enabledFields = enabledFields.split(", ");

    const fullField = address + "." + field;

    for (const enabledField of enabledFields)
    {
        if (enabledField === fullField)
        {
            return true;
        }
    }

    return false;
}

export default {isAddressFieldEnabled};
