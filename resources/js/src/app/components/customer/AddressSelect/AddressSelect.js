const ApiService = require("services/ApiService");
const AddressService = require("services/AddressService");
const ModalService = require("services/ModalService");
const ResourceService = require("services/ResourceService");

import ValidationService from "services/ValidationService";

Vue.component("address-select", {

    props: [
        "addressList",
        "addressType",
        "selectedAddressId",
        "template",
        "showError"
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
            deleteModal: "",
            localization: {}
        };
    },

    /**
     *  Check whether the address list is not empty and select the address with the matching ID
     */
    created()
    {
        this.$options.template = this.template;
        ResourceService.bind("localization", this);

        this.addEventListener();
    },

    /**
     * Select the address modal
     */
    ready()
    {
        if (!this.isAddressListEmpty())
        {
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
            this.addressToEdit = {countryId: this.localization.currentShippingCountryId};
            this.updateHeadline();
            this.addressModal.show();
        },

        /**
         * Show the add modal
         */
        showAddModal()
        {
            this.modalType = "create";
            this.addressToEdit = {countryId: this.localization.currentShippingCountryId};
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
                    this.removeIdFromList(address.id);
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
                        this.selectedAddress = {};
                        this.selectedAddressId = "";

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
            if (!this.selectedAddressId)
            {
                this.selectedAddressId = addressData.id;

                this.loadSelectedAddress();
            }
        }
    }
});
