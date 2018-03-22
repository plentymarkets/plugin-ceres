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
            enabledFields = App.config.addresses.billingAddressShow;
        }
        else
        {
            enabledFields = App.config.addresses.billingAddressShow_en;
        }
    }
    else
    {
        address = "delivery_address";

        if (countryId === "1")
        {
            enabledFields = App.config.addresses.deliveryAddressShow;
        }
        else
        {
            enabledFields = App.config.addresses.deliveryAddressShow_en;
        }
    }

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
