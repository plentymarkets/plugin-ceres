const ApiService = require("services/ApiService");
const ModalService = require("services/ModalService");
const ResourceService = require("services/ResourceService");
const AddressFieldService = require("services/AddressFieldService");

import AddressService from "services/AddressService";
import ValidationService from "services/ValidationService";

Vue.component("address-select", {

    props: [
        "addressList",
        "addressType",
        "selectedAddressId",
        "template",
        "showError",
        "countryNameMap"
    ],

    data()
    {
        return {
            selectedAddress: {},
            addressModal   : {},
            modalType      : "",
            headline       : "",
            addressToEdit  : {},
            addressToDelete: {},
            deleteModal    : "",
            localization   : {},
            user           : {}
        };
    },

    /**
     *  Check whether the address list is not empty and select the address with the matching ID
     */
    created()
    {
        this.$options.template = this.template;
        ResourceService.bind("localization", this);
        ResourceService.bind("user", this);

        this.addEventListener();
    },

    /**
     * Select the address modal
     */
    ready()
    {
        if (!this.isAddressListEmpty())
        {
            if (!this.selectedAddressId || this.selectedAddressId <= 0)
            {
                this.selectedAddressId = this.addressList[0].id;
            }

            this.loadSelectedAddress();
        }
        else
        {
            this.addressList = [];
        }

        this.addressModal = ModalService.findModal(this.$els.addressModal);
        this.deleteModal = ModalService.findModal(this.$els.deleteModal);
    },

    methods: {
        /**
         * Add the event listener
         */
        addEventListener()
        {
            ApiService.listen("AfterAccountContactLogout", () =>
            {
                this.cleanUserAddressData();
            });
        },

        /**
         * Load the address filtered by selectedId into selectedAddress
         */
        loadSelectedAddress()
        {
            let isSelectedAddressSet = false;

            for (const index in this.addressList)
            {
                if (this.addressList[index].id === this.selectedAddressId)
                {
                    this.selectedAddress = this.addressList[index];
                    isSelectedAddressSet = true;
                    this.$dispatch("address-changed", this.selectedAddress);
                }
            }

            if (!isSelectedAddressSet)
            {
                this.selectedAddressId = null;
            }
        },

        /**
         * Remove all user related addresses from the component
         */
        cleanUserAddressData()
        {
            this.addressList = this.addressList.filter(value =>
            {
                return value.id === -99;
            });

            if (this.selectedAddressId !== -99)
            {
                this.selectedAddress = {};
                this.selectedAddressId = "";
            }
        },

        /**
         * Update the selected address
         * @param index
         */
        onAddressChanged(index)
        {
            this.selectedAddress = this.addressList[index];

            this.$dispatch("address-changed", this.selectedAddress);
        },

        /**
         * Check whether the address list is empty
         * @returns {boolean}
         */
        isAddressListEmpty()
        {
            return !(this.addressList && this.addressList.length > 0);
        },

        /**
         * Check whether a company name exists and show it in bold
         * @returns {boolean}
         */
        showNameStrong()
        {
            return !this.selectedAddress.name1 || this.selectedAddress.name1.length === 0;
        },

        /**
         * Show the add modal initially, if no address is selected in checkout
         */
        showInitialAddModal()
        {
            this.modalType = "initial";

            if (AddressFieldService.isAddressFieldEnabled(this.addressToEdit.countryId, this.addressType, "salutation"))
            {
                this.addressToEdit = {
                    addressSalutation: 0,
                    countryId        : this.localization.currentShippingCountryId
                };
            }
            else
            {
                this.addressToEdit = {countryId: this.localization.currentShippingCountryId};
            }

            this.updateHeadline();
            this.addressModal.show();
        },

        /**
         * Show the add modal
         */
        showAddModal()
        {
            this.modalType = "create";

            if (AddressFieldService.isAddressFieldEnabled(this.addressToEdit.countryId, this.addressType, "salutation"))
            {
                this.addressToEdit = {
                    addressSalutation: 0,
                    countryId        : this.localization.currentShippingCountryId
                };
            }
            else
            {
                this.addressToEdit = {countryId: this.localization.currentShippingCountryId};
            }

            this.updateHeadline();
            ValidationService.unmarkAllFields($(this.$els.addressModal));
            this.addressModal.show();
        },

        /**
         * Show the edit modal
         * @param address
         */
        showEditModal(address)
        {
            this.modalType = "update";
            // Creates a tmp address to prevent unwanted two-way binding
            this.addressToEdit = JSON.parse(JSON.stringify(address));

            if (typeof this.addressToEdit.addressSalutation === "undefined")
            {
                this.addressToEdit.addressSalutation = 0;
            }

            this.updateHeadline();
            ValidationService.unmarkAllFields($(this.$els.addressModal));
            this.addressModal.show();
        },

        /**
         * Show the delete modal
         * @param address
         */
        showDeleteModal(address)
        {
            this.modalType = "delete";
            this.addressToDelete = address;
            this.updateHeadline();
            this.deleteModal.show();
        },

        /**
         * Delete the address selected before
         */
        deleteAddress()
        {
            AddressService.deleteAddress(this.addressToDelete.id, this.addressType)
                .done(() =>
                {
                    this.closeDeleteModal();
                    this.removeIdFromList(this.addressToDelete.id);
                });
        },

        /**
         * Close the current create/update address modal
         */
        closeAddressModal()
        {
            this.addressModal.hide();
        },

        /**
         * Close the current delete address modal
         */
        closeDeleteModal()
        {
            this.deleteModal.hide();
        },

        /**
         * Dynamically create the header line in the modal
         */
        updateHeadline()
        {
            let headline;

            if (this.modalType === "initial")
            {
                headline = Translations.Template.orderInvoiceAddressInitial;
            }
            else if (this.addressType === "2")
            {
                if (this.modalType === "update")
                {
                    headline = Translations.Template.orderShippingAddressEdit;
                }
                else if (this.modalType === "create")
                {
                    headline = Translations.Template.orderShippingAddressCreate;
                }
                else
                {
                    headline = Translations.Template.orderShippingAddressDelete;
                }
            }
            else if (this.modalType === "update")
            {
                headline = Translations.Template.orderInvoiceAddressEdit;
            }
            else if (this.modalType === "create")
            {
                headline = Translations.Template.orderInvoiceAddressCreate;
            }
            else
            {
                headline = Translations.Template.orderInvoiceAddressDelete;
            }

            this.headline = headline;
        },

        /**
         * Remove an address from the addressList by ID
         * @param id
         */
        removeIdFromList(id)
        {
            for (const i in this.addressList)
            {
                if (this.addressList[i].id === id)
                {
                    this.addressList.splice(i, 1);

                    if (this.selectedAddressId && this.selectedAddressId.toString() === id.toString())
                    {
                        if (this.addressList.length)
                        {
                            this.selectedAddress = this.addressList[0];
                            this.selectedAddressId = this.selectedAddress.id;
                        }
                        else
                        {
                            this.selectedAddress = {};
                            this.selectedAddressId = "";
                        }

                        this.$dispatch("address-changed", this.selectedAddress);

                        break;
                    }
                }
            }
        },

        /**
         * Update the selected address when a new address is created
         * @param addressData
         */
        onAddressCreated(addressData)
        {
            this.selectedAddressId = addressData.id;

            this.loadSelectedAddress();
        },

        /**
         * Update the selected address on address update
         * @param addressData
         */
        onSelectedAddressUpdated(addressData)
        {
            if (parseInt(this.selectedAddressId) === parseInt(addressData.id))
            {
                this.selectedAddressId = addressData.id;

                this.loadSelectedAddress();
            }
        },

        /**
         * @param countryId
         * @returns country name | empty string
         */
        getCountryName(countryId)
        {
            if (countryId > 0)
            {
                return this.countryNameMap[countryId];
            }

            return "";
        }
    },

    computed: {
        isAddAddressEnabled()
        {
            var isLoggedIn = this.user.isLoggedIn;

            if (this.addressType === "1")
            {
                return isLoggedIn || this.addressList.length < 1;
            }

            return isLoggedIn || this.addressList.length < 2;
        }
    },
    filters : {

        optionType(selectedAddress, typeId)
        {
            if (selectedAddress.name2)
            {
                for (const optionType of selectedAddress.options)
                {
                    if (optionType.typeId === typeId)
                    {
                        return optionType.value;
                    }
                }
            }

            return "";

        }

    }
});
