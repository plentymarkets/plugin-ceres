var AddressService = require("services/AddressService");

import ValidationService from "services/ValidationService";

Vue.component("create-update-address", {

    props: [
        "addressData",
        "addressModal",
        "addressList",
        "modalType",
        "addressType",
        "template"
    ],

    data: function()
    {
        return {
            waiting: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {
        /**
         * Validate the address fields
         */
        validate: function()
        {
            var self = this;

            if (this.addressType === "1")
            {
                ValidationService.validate($("#billing_address_form"))
                    .done(function()
                    {
                        self.saveAddress();
                    })
                    .fail(function(invalidFields)
                    {
                        ValidationService.markInvalidFields(invalidFields, "error");
                    });

            }
            else if (this.addressType === "2")
            {
                ValidationService.validate($("#delivery_address_form"))
                    .done(function()
                    {
                        self.saveAddress();
                    })
                    .fail(function(invalidFields)
                    {
                        ValidationService.markInvalidFields(invalidFields, "error");
                    });
            }

        },

        /**
         * Save the new address or update an existing one
         */
        saveAddress: function()
        {
            if (this.modalType === "initial" || this.modalType === "create")
            {
                this.createAddress();
            }
            else if (this.modalType === "update")
            {
                this.updateAddress();
            }
        },

        /**
         * Update an address
         */
        updateAddress: function()
        {
            this.waiting = true;

            AddressService
                .updateAddress(this.addressData, this.addressType)
                .done(function()
                {
                    this.addressModal.hide();

                    for (var key in this.addressList)
                    {
                        var address = this.addressList[key];

                        if (address.id === this.addressData.id)
                        {
                            for (var attribute in this.addressList[key])
                            {
                                this.addressList[key][attribute] = this.addressData[attribute];
                            }

                            break;
                        }
                    }

                    this.waiting = false;
                }.bind(this))
                .fail(function()
                {
                    this.waiting = false;
                }.bind(this));
        },

        /**
         * Create a new address
         */
        createAddress: function()
        {
            this.waiting = true;

            AddressService
                .createAddress(this.addressData, this.addressType, true)
                .done(function(newAddress)
                {
                    this.addressData = newAddress;

                    this.addressModal.hide();
                    this.addressList.push(this.addressData);

                    this.$dispatch("new-address-created", this.addressData);

                    this.waiting = false;
                }.bind(this))
                .fail(function()
                {
                    this.waiting = false;
                }.bind(this));
        }
    }

});
