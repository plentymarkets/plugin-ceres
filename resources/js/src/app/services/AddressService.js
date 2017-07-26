const ApiService      = require("services/ApiService");
const CheckoutService = require("services/CheckoutService");

/**
 * Create a new address
 * @param address
 * @param addressType
 * @param setActive
 * @returns {*}
 */
export function createAddress(address, addressType, setActive)
{
    return ApiService.post("/rest/io/customer/address?typeId=" + addressType, address, {supressNotifications: true})
        .done(response =>
        {
            if (setActive)
            {
                if (addressType === 1)
                {
                    CheckoutService.setBillingAddressId(response.id);
                }
                else if (addressType === 2)
                {
                    CheckoutService.setDeliveryAddressId(response.id);
                }
            }
        });
}

/**
 * Update an existing address
 * @param newData
 * @param addressType
 * @returns {*|Entry|undefined}
 */
export function updateAddress(newData, addressType)
{
    addressType = addressType || newData.pivot.typeId;
    return ApiService.put("/rest/io/customer/address/" + newData.id + "?typeId=" + addressType, newData, {supressNotifications: true});
}

/**
 * Delete an existing address
 * @param addressId
 * @param addressType
 * @returns {*}
 */
export function deleteAddress(addressId, addressType)
{
    return ApiService.delete("/rest/io/customer/address/" + addressId + "?typeId=" + addressType);
}

export default {createAddress, updateAddress, deleteAddress};
