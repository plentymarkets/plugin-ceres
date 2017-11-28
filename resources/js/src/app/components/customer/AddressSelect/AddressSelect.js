const ApiService = require("services/ApiService");
const ModalService = require("services/ModalService");
const AddressFieldService = require("services/AddressFieldService");

import ValidationService from "services/ValidationService";

Vue.component("address-select", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "addressType",
        "showError",
        "countryNameMap"
    ],

    data()
    {
        return {
            addressModal   : {},
            modalType      : "",
            headline       : "",
            addressToEdit  : {},
            addressToDelete: {},
            deleteModal    : "",
            addressOptionTypeFieldMap:
            {
                1: "vatNumber",
                4: "telephone",
                9: "birthday",
                11: "title"
            }
        };
    },

    computed:
    {
        selectedAddress()
        {
            return this.$store.getters.getSelectedAddress(this.addressType);
        },

        addressList()
        {
            return this.$store.getters.getAddressList(this.addressType);
        },

        shippingCountryId()
        {
            return this.$store.state.localization.shippingCountryId;
        },

        isAddAddressEnabled()
        {
            if (this.addressType === "1")
            {
                return this.$store.getters.isLoggedIn || this.addressList.length < 1;
            }

            return this.$store.getters.isLoggedIn || this.addressList.length < 2;
        },

        isAddressListEmpty()
        {
            return !(this.addressList && this.addressList.length > 0);
        },

        ...Vuex.mapState({
            isBasketLoading: state => state.basket.isBasketLoading
        })
    },

    /**
     *  Check whether the address list is not empty and select the address with the matching ID
     */
    created()
    {
        this.$options.template = this.template;
        this.addEventListener();
    },

    /**
     * Select the address modal
     */
    mounted()
    {
        this.$nextTick(() =>
        {
            this.addressModal = ModalService.findModal(this.$refs.addressModal);
            this.deleteModal = ModalService.findModal(this.$refs.deleteModal);
        });
    },

    methods: {
        /**
         * Add the event listener
         */
        addEventListener()
        {
            ApiService.listen("AfterAccountContactLogout", () =>
            {
                this.$store.commit("resetAddress", this.addressType);
            });
        },

        /**
         * Update the selected address
         * @param index
         */
        onAddressChanged(address)
        {
            this.$emit("address-changed", address);
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
                    countryId        : this.shippingCountryId
                };
            }
            else
            {
                this.addressToEdit = {countryId: this.shippingCountryId};
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
                    countryId        : this.shippingCountryId
                };
            }
            else
            {
                this.addressToEdit = {countryId: this.shippingCountryId};
            }

            this.updateHeadline();
            ValidationService.unmarkAllFields($(this.$refs.addressModal));
            this.addressModal.show();
        },

        /**
         * Show the edit modal
         * @param address
         */
        showEditModal(address)
        {
            this.modalType = "update";
            this.addressToEdit = this.getAddressToEdit(address);

            if (typeof this.addressToEdit.addressSalutation === "undefined")
            {
                this.addressToEdit.addressSalutation = 0;
            }

            this.updateHeadline();
            ValidationService.unmarkAllFields($(this.$refs.addressModal));
            this.addressModal.show();
        },

        getAddressToEdit(address)
        {
            // Creates a tmp address to prevent unwanted two-way binding
            const addressToEdit = JSON.parse(JSON.stringify(address));

            if (addressToEdit.options)
            {
                for (const option of addressToEdit.options)
                {
                    const optionName = this.addressOptionTypeFieldMap[option.typeId];

                    addressToEdit[optionName] = option.value || null;
                }
            }

            return addressToEdit;
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
            this.$store.dispatch("deleteAddress", {address: this.addressToDelete, addressType: this.addressType})
                .then(
                    response =>
                    {
                        this.closeDeleteModal();
                    },
                    error =>
                    {}
                );
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
        },

        setAddressToEditField({field, value})
        {
            this.addressToEdit[field] = value;
        }
    },

    filters :
    {
        optionType(selectedAddress, typeId)
        {
            if (selectedAddress && selectedAddress.name2)
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
