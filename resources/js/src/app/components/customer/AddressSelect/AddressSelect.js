var ApiService = require("services/ApiService");
var ModalService = require("services/ModalService");
var AddressService = require("services/AddressService");

Vue.component("address-select", {

    props: [
        "addressList",
        "addressType",
        "selectedAddressId",
        "template",
        "showError"
    ],

    data: function()
    {
        return {
            selectedAddress: {},
            addressModal   : {},
            modalType      : "",
            headline       : "",
            addressToEdit  : {},
            addressToDelete: {},
            deleteModal: ""
        };
    },

    /**
     *  Check whether the address list is not empty and select the address with the matching ID
     */
    created: function()
    {
        this.$options.template = this.template;

        this.addEventListener();
    },

    /**
     * Select the address modal
     */
    ready: function()
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
        addEventListener: function()
        {
            var self = this;

            ApiService.listen("AfterAccountContactLogout",
                function()
                {
                    self.cleanUserAddressData();
                });
        },

        /**
         * Load the address filtered by selectedId into selectedAddress
         */
        loadSelectedAddress: function()
        {
            var isSelectedAddressSet = false;

            for (var index in this.addressList)
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
        cleanUserAddressData: function()
        {
            this.addressList = this.addressList.filter(function(value)
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
        onAddressChanged: function(index)
        {
            this.selectedAddress = this.addressList[index];

            this.$dispatch("address-changed", this.selectedAddress);
        },

        /**
         * Check whether the address list is empty
         * @returns {boolean}
         */
        isAddressListEmpty: function()
        {
            return !(this.addressList && this.addressList.length > 0);
        },

        /**
         * Check whether a company name exists and show it in bold
         * @returns {boolean}
         */
        showNameStrong: function()
        {
            return !this.selectedAddress.name1 || this.selectedAddress.name1.length === 0;
        },

        /**
         * Show the add modal
         */
        showAddModal: function()
        {
            this.modalType = "create";
            this.addressToEdit = {};
            this.updateHeadline();
            this.addressModal.show();
        },

        /**
         * Show the edit modal
         * @param address
         */
        showEditModal: function(address)
        {
            this.modalType = "update";
            // Creates a tmp address to prevent unwanted two-way binding
            this.addressToEdit = JSON.parse(JSON.stringify(address));
            this.updateHeadline();
            this.addressModal.show();
        },

        /**
         * Show the delete modal
         * @param address
         */
        showDeleteModal: function(address)
        {
            this.modalType = "delete";
            this.addressToDelete = address;
            this.updateHeadline();
            this.deleteModal.show();
        },

        /**
         * Delete the address selected before
         */
        deleteAddress: function()
        {
            var self = this;
            var address = this.addressToDelete;
            var addressType = this.addressType;

            AddressService.deleteAddress(address.id, addressType)
                .done(function()
                {
                    self.closeDeleteModal();
                    self.removeIdFromList(address.id);
                });

        },

        /**
         * Close the current create/update address modal
         */
        closeAddressModal: function()
        {
            this.addressModal.hide();
        },

        /**
         * Close the current delete address modal
         */
        closeDeleteModal: function()
        {
            this.deleteModal.hide();
        },

        /**
         * Dynamically create the header line in the modal
         */
        updateHeadline: function()
        {
            var headline;

            if (this.addressType === "2")
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
        removeIdFromList: function(id)
        {
            for (var i in this.addressList)
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
        onAddressCreated: function(addressData)
        {
            if (!this.selectedAddressId)
            {
                this.selectedAddressId = addressData.id;

                this.loadSelectedAddress();
            }
        }
    }
});
