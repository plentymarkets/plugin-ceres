module.exports = (function ($) {

    return {
        isAddressFieldEnabled: _isAddressFieldEnabled
    };

    function _isAddressFieldEnabled(countryId, addressType, field) {
        let address = {};
        let enabledFields = {};

        if (typeof countryId === "undefined") {
            countryId = 1;
        }

        if (addressType === "1") {
            address = "billing_address";

            if (countryId === 1) {
                enabledFields = App.config.enabledBillingAddressFields;
            }
            else {
                enabledFields = App.config.enabledBillingAddressFieldsUK;
            }
        }
        else {
            address = "delivery_address";

            if (countryId === "1") {
                enabledFields = App.config.enabledDeliveryAddressFields;
            }
            else {
                enabledFields = App.config.enabledDeliveryAddressFieldsUK;
            }
        }

        enabledFields = enabledFields.split(", ");

        const fullField = address + "." + field;

        for (let i = 0; i < enabledFields.length; i++) {
            if (enabledFields[i] === fullField) {
                return true;
            }
        }

        return false;
    }

})(jQuery);
