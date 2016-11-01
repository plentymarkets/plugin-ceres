var ModalService = require("services/ModalService");
var AddressService = require("services/AddressService");

Vue.component("address-select", {

    template: "#vue-address-select",

    props: [
        "addressList",
        "addressType",
        "selectedAddressId"
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
        if (!this.isAddressListEmpty())
        {
            var isSelectedAddressSet = false;

            for (var index in this.addressList)
            {
                if (this.addressList[index].id === this.selectedAddressId)
                {
                    this.selectedAddress = this.addressList[index];
                    isSelectedAddressSet = true;
                }
            }

            if (!isSelectedAddressSet)
            {
                this.selectedAddressId = null;
            }
        }
        else
        {
            this.addressList = [];
        }
    },

    /**
     * Select the address modal
     */
    ready: function()
    {
        this.addressModal = ModalService.findModal(this.$els.addressModal);
        this.deleteModal = ModalService.findModal(this.$els.deleteModal);
    },

    methods: {
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

            $(".wrapper-bottom").append(this.$els.addressModal);
            this.addressModal.show();
        },

        /**
         * Show the edit modal
         * @param address
         */
        showEditModal: function(address)
        {
            this.modalType = "update";
            this.addressToEdit = {};

            this.addressToEdit = this.createTmpAddress(address);
            this.updateHeadline();

            $(".wrapper-bottom").append(this.$els.addressModal);
            this.addressModal.show();
        },

        /**
         * Creates a tmp address to prevent vue js two-way data binding bug
         * @param address
         */
        createTmpAddress: function(address)
        {
            return {
                id: address.id,
                address1: address.address1,
                address2: address.address2,
                address3: address.address3,
                address4: address.address4,
                name1: address.name1,
                name2: address.name2,
                name3: address.name3,
                name4: address.name4,
                countryId: address.countryId,
                stateId: address.stateId,
                postalCode: address.postalCode,
                town: address.town,
                pivot: address.pivot,
                options: address.options

            };
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

            $(".wrapper-bottom").append(this.$els.deleteModal);
            this.deleteModal.show();
        },

        /**
         * Delete the address selected before
         */
        deleteAddress: function()
        {
            var self = this;
            var address = this.addressToDelete;
            var addressType = address.pivot.typeId.toString();

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
                    headline = Translations.Callisto.orderShippingAddressEdit;
                }
                else if (this.modalType === "create")
                {
                    headline = Translations.Callisto.orderShippingAddressCreate;
                }
                else
                {
                    headline = Translations.Callisto.orderShippingAddressDelete;
                }
            }
            else if (this.modalType === "update")
            {
                headline = Translations.Callisto.orderInvoiceAddressEdit;
            }
            else if (this.modalType === "create")
            {
                headline = Translations.Callisto.orderInvoiceAddressCreate;
            }
            else
            {
                headline = Translations.Callisto.orderInvoiceAddressDelete;
            }

            this.headline = headline;
        },

        removeIdFromList: function(id)
        {
            for (var i in this.addressList)
            {
                if (this.addressList[i].id === id)
                {
                    this.addressList.splice(i, 1);

                    if (this.selectedAddressId.toString() === id.toString())
                    {
                        this.selectedAddress = null;
                        this.selectedAddressId = "";

                        break;
                    }
                }
            }
        }
    }
});
