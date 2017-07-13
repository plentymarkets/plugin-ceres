import AddressService from "services/AddressService";
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

    data()
    {
        return {
            waiting: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods: {
        /**
         * Validate the address fields
         */
        validate()
        {

            if (this.addressType === "1")
            {
                ValidationService.validate($("#billing_address_form"))
                    .done(() =>
                    {
                        this.saveAddress();
                    })
                    .fail(invalidFields =>
                    {
                        ValidationService.markInvalidFields(invalidFields, "error");
                    });

            }
            else if (this.addressType === "2")
            {
                ValidationService.validate($("#delivery_address_form"))
                    .done(invalidFields =>
                    {
                        this.saveAddress();
                    })
                    .fail(invalidFields =>
                    {
                        ValidationService.markInvalidFields(invalidFields, "error");
                    });
            }

        },

        /**
         * Save the new address or update an existing one
         */
        saveAddress()
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
        updateAddress()
        {
            this.waiting = true;

            this._syncOptionTypesAddressData();

            AddressService
                .updateAddress(this.addressData, this.addressType)
                .done(function()
                {
                    this.addressModal.hide();

                    for (const key in this.addressList)
                    {
                        const address = this.addressList[key];

                        if (address.id === this.addressData.id)
                        {
                            for (const attribute in this.addressList[key])
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
        createAddress()
        {
            this.waiting = true;

            this._syncOptionTypesAddressData();

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
        },

        _syncOptionTypesAddressData()
        {

            if (typeof this.addressData.options !== "undefined")
            {
                for (const optionType of this.addressData.options)
                {
                    switch (optionType.typeId)
                    {
                    case 1:
                        {
                            if (this.addressData.vatNumber && this.addressData.vatNumber !== optionType.value)
                            {
                                optionType.value = this.addressData.vatNumber;
                            }

                            break;
                        }

                    case 9:
                        {
                            if (this.addressData.birthday && this.addressData.birthday !== optionType.value)
                            {
                                optionType.value = this.addressData.birthday;
                            }
                            break;
                        }

                    case 11:
                        {
                            if (this.addressData.title && this.addressData.title !== optionType.value)
                            {
                                optionType.value = this.addressData.title;
                            }
                            break;
                        }
                    }
                }
            }

        }
    }

});
