const NotificationService = require("services/NotificationService");

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
            waiting: false,
            addressFormNames:
            {
                1: "#billing_address_form",
                2: "#delivery_address_form"
            }
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
            ValidationService.validate($(this.addressFormNames[this.addressType]))
                .done(() =>
                {
                    this.saveAddress();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
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
                .done(() =>
                {
                    this.$dispatch("selected-address-updated", this.addressData);

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
                })
                .fail(response =>
                {
                    this.waiting = false;

                    if (response.validation_errors)
                    {
                        this._handleValidationErrors(response.validation_errors);
                    }
                });
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
                .done(newAddress =>
                {
                    this.addressData = newAddress;

                    this.addressModal.hide();
                    this.addressList.push(this.addressData);

                    this.$dispatch("new-address-created", this.addressData);

                    this.waiting = false;
                })
                .fail(response =>
                {
                    this.waiting = false;

                    if (response.validation_errors)
                    {
                        this._handleValidationErrors(response.validation_errors);
                    }
                });
        },

        _handleValidationErrors(validationErrors)
        {
            ValidationService.markFailedValidationFields($(this.addressFormNames[this.addressType]), validationErrors);

            let errorMessage = "";

            for (const value of Object.values(validationErrors))
            {
                errorMessage += value + "<br>";
            }

            NotificationService.error(errorMessage);
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

                    case 4:
                        {
                            if (this.addressData.telephone && this.addressData.telephone !== optionType.value)
                            {
                                optionType.value = this.addressData.telephone;
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
});
