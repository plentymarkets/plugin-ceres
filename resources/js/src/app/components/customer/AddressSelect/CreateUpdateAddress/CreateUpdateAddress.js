const NotificationService = require("services/NotificationService");

import ValidationService from "services/ValidationService";
import TranslationService from "services/TranslationService";

Vue.component("create-update-address", {

    delimiters: ["${", "}"],

    props: {
        addressData: {
            type: Object,
            default()
            {
                return {};
            }
        },
        addressModal: {
            type: Object,
            default()
            {
                return {};
            }
        },
        modalType: String,
        addressType: String,
        template: String,
        optionalAddressFields: {
            type: Object,
            default: () =>
            {
                return {};
            }
        },
        requiredAddressFields: {
            type: Object,
            default: () =>
            {
                return {};
            }
        },
        defaultSalutation: {
            type: String,
            default: "male"
        }
    },

    data()
    {
        return {
            waiting: false
        };
    },

    computed:
    {
        addressList()
        {
            this.$store.getters.getAddressList(this.addressType);
        }
    },

    methods: {
        /**
         * Validate the address fields
         */
        validate()
        {
            ValidationService.validate(this.$refs.addressForm)
                .done(() =>
                {
                    this.saveAddress();
                })
                .fail(invalidFields =>
                {
                    const fieldNames = [];

                    for (const field of invalidFields)
                    {
                        let fieldName = field.lastElementChild.innerHTML.trim();

                        fieldName = fieldName.slice(-1) === "*" ? fieldName.slice(0, fieldName.length - 1) : fieldName;
                        fieldNames.push(fieldName);
                    }

                    ValidationService.markInvalidFields(invalidFields, "error");
                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.checkoutCheckAddressFormFields", { fields: fieldNames.join(", ") })
                    );
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

            this.$store.dispatch("updateAddress", { address: this.addressData, addressType: this.addressType })
                .then(
                    resolve =>
                    {
                        this.addressModal.hide();
                        this.waiting = false;
                    },
                    error =>
                    {
                        this.waiting = false;

                        if (error.validation_errors)
                        {
                            this._handleValidationErrors(error.validation_errors);
                        }
                        else if (error.error)
                        {
                            this._handleError(error.error);
                        }
                    }
                );
        },

        /**
         * Create a new address
         */
        createAddress()
        {
            this.waiting = true;
            this._syncOptionTypesAddressData();

            this.$store.dispatch("createAddress", { address: this.addressData, addressType: this.addressType })
                .then(
                    response =>
                    {
                        this.addressModal.hide();
                        this.waiting = false;
                    },
                    error =>
                    {
                        this.waiting = false;

                        if (error.validation_errors)
                        {
                            this._handleValidationErrors(error.validation_errors);
                        }
                        else if (error.error)
                        {
                            this._handleError(error.error);
                        }
                    }
                );
        },

        _handleValidationErrors(validationErrors)
        {
            ValidationService.markFailedValidationFields(this.$refs.addressForm, validationErrors);

            let errorMessage = "";

            for (const value of Object.values(validationErrors))
            {
                errorMessage += value + "<br>";
            }

            NotificationService.error(errorMessage);
        },

        _handleError(error)
        {
            if (error.code === 11)
            {
                NotificationService.error({ code: error.code, message: "" });
                window.location.reload();
            }
            else this._handleValidationErrors(error);
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
                    case 4:
                    {
                        if (this.addressData.telephone && this.addressData.telephone !== optionType.value)
                        {
                            optionType.value = this.addressData.telephone;
                        }
                        break;
                    }
                    case 6:
                    {
                        if (this.addressData.postNumber && this.addressData.postNumber !== optionType.value)
                        {
                            optionType.value = this.addressData.postNumber;
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
                    case 12:
                    {
                        if (this.addressData.contactPerson && this.addressData.contactPerson !== optionType.value)
                        {
                            optionType.value = this.addressData.contactPerson;
                        }
                        break;
                    }
                    }
                }
            }
        },

        emitInputEvent(event)
        {
            this.$emit("input", event);

            this.checkInputEventForUnmarkFields(event);
        },

        checkInputEventForUnmarkFields(event)
        {
            const genderCondition = event.field === "gender" && event.field.value !== this.addressData.gender;
            const countryCondition = event.field === "countryId" && event.field.value !== this.addressData.countryId;
            const pickupCondition = event.field === "showPickupStation" && event.field.value !== this.addressData.showPickupStation;

            if (genderCondition || countryCondition || pickupCondition)
            {
                ValidationService.unmarkAllFields(this.$refs.addressForm);
            }
        }
    }
});
