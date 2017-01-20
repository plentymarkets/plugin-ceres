var AddressService    = require("services/AddressService");
var ValidationService = require("services/ValidationService");

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

            ValidationService.validate($("#my-form"))
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
         * Save the new address or update an existing one
         */
        saveAddress: function()
        {
            if (this.modalType === "create")
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
                            address = this.addressData;
                            break;
                        }
                    }

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
                }.bind(this));
        }
    }

});
