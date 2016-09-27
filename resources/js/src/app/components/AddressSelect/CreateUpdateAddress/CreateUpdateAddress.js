var AddressService    = require('services/AddressService');
var ValidationService = require('services/ValidationService');

Vue.component('create-update-address', {

    template: '#vue-create-update-address',

    props: [
        "addressData",
        "addressModal",
        "addressList",
        "modalType",
        "addressType"
    ],

    methods: {
        /**
         * validate the address fields
         */
        validate: function()
        {
            var self = this;
            ValidationService.validate($('#my-form'))
                .done(function()
                {
                    self.saveAddress();
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });

        },

        /**
         * save the new address or update an existing one
         */
        saveAddress: function()
        {
            if (this.modalType === "create")
            {
                this.createAddress()
            }
            else if (this.modalType === "update")
            {
                this.updateAddress()
            }
        },

        /**
         * update an address
         */
        updateAddress: function()
        {
            AddressService
                .updateAddress(this.addressData, this.addressType)
                .done(function()
                {
                    this.addressModal.hide();
                    for (var key in this.addressList)
                    {
                        var address = this.addressList[key];
                        if (address.id == this.addressData.id)
                        {
                            address = this.addressData;
                            break;
                        }
                    }
                }.bind(this));
        },

        /**
         * create a new address
         */
        createAddress: function()
        {
            AddressService
                .createAddress(this.addressData, this.addressType, true)
                .done(function()
                {
                    this.addressModal.hide();
                    this.addressList.push(this.addressData);
                }.bind(this));
        }
    }

});
