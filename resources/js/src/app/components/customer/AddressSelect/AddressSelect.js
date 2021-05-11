import { isDefined } from "../../../helper/utils";
import ValidationService from "../../../services/ValidationService";
import TranslationService from "../../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";
import CreateUpdateAddress from "./CreateUpdateAddress/CreateUpdateAddress";

const ApiService = require("../../../services/ApiService");
const ModalService = require("../../../services/ModalService");

export default Vue.component("address-select", {

    components:
    {
        CreateUpdateAddress
    },

    props:
    {
        template:
        {
            type: String,
            default: "#vue-address-select"
        },
        addressType:
        {
            type: String,
            required: true
        },
        showError: Boolean,
        optionalAddressFields:
        {
            type: Object,
            default: () =>
            {
                return {
                    de: [],
                    gb: []
                };
            }
        },
        requiredAddressFields:
        {
            type: Object,
            default: () =>
            {
                return {};
            }
        },
        defaultSalutation:
        {
            type: String,
            default: App.config.addresses.defaultSalutation
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        }
    },

    data()
    {
        return {
            addressModal   : {},
            modalType      : "",
            headline       : "",
            addressToEdit  : {
                gender: this.defaultSalutation,
                countryId        : this.shippingCountryId
            },
            addressToDelete: {},
            deleteModal    : "",
            deleteModalWaiting: false,
            addressOptionTypeFieldMap:
            {
                1: "vatNumber",
                4: "telephone",
                6: "postNumber",
                9: "birthday",
                11: "title",
                12: "contactPerson"
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

        isSalutationEnabled()
        {
            const countryId = parseInt(this.addressToEdit.countryId) || 1;
            const addressKey = parseInt(this.addressType) === 1 ? "billing_address" : "delivery_address";
            const countryKey = countryId === 12 ? "gb" : "de";

            return this.optionalAddressFields[countryKey].includes(`${addressKey}.salutation`);
        },

        addressTypePrefix()
        {
            return parseInt(this.addressType) === 1 ? "billing-" : "delivery-";
        },

        ...mapState({
            countryList: state => state.localization.shippingCountries,
            isBasketLoading: state => state.basket.isBasketLoading,
            isCheckoutReadonly: state => state.checkout.readOnly
        })
    },

    /**
     *  Check whether the address list is not empty and select the address with the matching ID
     */
    created()
    {
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
         * Show the add modal
         */
        showAddModal(type)
        {
            this.modalType = type || "create";

            if (this.isSalutationEnabled)
            {
                this.addressToEdit = {
                    gender: this.defaultSalutation,
                    countryId: this.shippingCountryId,
                    showPickupStation: false
                };
            }
            else
            {
                this.addressToEdit = { countryId: this.shippingCountryId };
            }

            this.updateHeadline();

            if (this.modalType === "create")
            {
                ValidationService.unmarkAllFields($(this.$refs.addressModal));
            }

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

            if (isDefined(this.addressToEdit.address1) && (this.addressToEdit.address1 === "PACKSTATION" || this.addressToEdit.address1 === "POSTFILIALE") && this.$store.getters.isParcelOrOfficeAvailable)
            {
                this.addressToEdit.showPickupStation = true;
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
            this.deleteModalWaiting = true;

            this.$store.dispatch("deleteAddress", { address: this.addressToDelete, addressType: this.addressType })
                .then(
                    response =>
                    {
                        this.closeDeleteModal();
                        this.deleteModalWaiting = false;
                    },
                    error =>
                    {
                        this.deleteModalWaiting = false;
                    }
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
                headline = TranslationService.translate("Ceres::Template.addressInvoiceAddressInitial");
            }
            else if (this.addressType === "2")
            {
                if (this.modalType === "update")
                {
                    headline = TranslationService.translate("Ceres::Template.addressShippingAddressEdit");
                }
                else if (this.modalType === "create")
                {
                    headline = TranslationService.translate("Ceres::Template.addressShippingAddressCreate");
                }
                else
                {
                    headline = TranslationService.translate("Ceres::Template.addressShippingAddressDelete");
                }
            }
            else if (this.modalType === "update")
            {
                headline = TranslationService.translate("Ceres::Template.addressInvoiceAddressEdit");
            }
            else if (this.modalType === "create")
            {
                headline = TranslationService.translate("Ceres::Template.addressInvoiceAddressCreate");
            }
            else
            {
                headline = TranslationService.translate("Ceres::Template.addressInvoiceAddressDelete");
            }

            this.headline = headline;
        },

        /**
         * @param countryId
         * @returns string
         */
        getCountryName(countryId)
        {
            return this.$store.getters.getCountryName(countryId);
        },

        setAddressToEditField({ field, value })
        {
            this.addressToEdit[field] = value;
            this.addressToEdit = Object.assign({}, this.addressToEdit);
        },

        onDropdownClicked(event)
        {
            if (this.isAddressListEmpty || (parseInt(this.addressType) === 2 && this.addressList.length === 1))
            {
                event.preventDefault();
                event.stopPropagation();
                this.showAddModal();
            }
        }
    },

    filters:
    {
        optionType(selectedAddress, typeId)
        {
            if (selectedAddress && selectedAddress.options)
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
    },

    watch:
    {
        isSalutationEnabled(newVal)
        {
            if (!newVal)
            {
                delete this.addressToEdit.gender;
            }
        }
    }
});
