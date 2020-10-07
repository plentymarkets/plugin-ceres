const NotificationService = require("../../services/NotificationService");
const ModalService        = require("../../services/ModalService");

import ApiService from "../../services/ApiService";
import ValidationService from "../../services/ValidationService";
import TranslationService from "../../services/TranslationService";
import Vue from "vue";

export default Vue.component("bank-data-select", {

    props: {
        template:
        {
            type: String,
            default: "#vue-bank-data-select"
        },
        userBankData:
        {
            type: Array,
            default: () => []
        },
        contactId:
        {
            type: String
        }
    },

    data()
    {
        return {
            bankInfoModal: {},
            bankDeleteModal: {},
            updateBankData: {},
            selectedBankData: null,
            updateBankIndex: 0,
            doUpdate: null,
            headline : "",
            waiting: false
        };
    },

    /**
     * Select the modals
     */
    mounted()
    {
        this.$nextTick(() =>
        {
            this.bankInfoModal = ModalService.findModal(this.$refs.bankInfoModal);
            this.bankDeleteModal = ModalService.findModal(this.$refs.bankDeleteModal);
        });
    },

    methods: {

        /**
         * Set the selected bank-data
         */
        changeSelecting(bankData)
        {
            this.selectedBankData = bankData;
        },

        /**
         * Open the modal to add new bank-data
         */
        openAddBank()
        {
            this.headline = TranslationService.translate("Ceres::Template.myAccountBankAddDataTitle");
            this.openModal(false);
        },

        /**
         * Set data to update and open the modal
         * @param index
         * @param bankdata
         */
        openUpdateBank(index, bankData)
        {
            this.headline = TranslationService.translate("Ceres::Template.myAccountBankUpdateDataTitle");

            this.setUpdateData(index, bankData);
            this.openModal(true);
        },

        /**
         * Set data to remove and open the modal
         * @param index
         * @param bankdata
         */
        openDeleteBank(index, bankData)
        {
            this.setUpdateData(index, bankData);

            this.doUpdate = false;
            this.bankDeleteModal.show();
        },

        /**
         * Open the modal
         * @param doUpdate
         */
        openModal(doUpdate)
        {
            if (!doUpdate)
            {
                this.resetData();
            }

            this.doUpdate = doUpdate;
            ValidationService.unmarkAllFields($(this.$refs.bankInfoModal));
            this.bankInfoModal.show();
        },

        /**
         * Set data to change
         * @param index
         * @param bankdata
         */
        setUpdateData(index, bankData)
        {
            this.updateBankData = JSON.parse(JSON.stringify(bankData));
            this.updateBankIndex = index;
        },

        /**
         * Validate the input-fields-data
         */
        validateInput()
        {
            this.waiting = true;

            ValidationService.validate($("#my-bankForm"))
                .done(() =>
                {
                    if (this.doUpdate)
                    {
                        this.updateBankInfo();
                    }
                    else
                    {
                        this.addBankInfo();
                    }
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                    this.waiting = false;
                });
        },

        /**
         * Update bank-data
         */
        updateBankInfo()
        {
            this.updateBankData.lastUpdateBy = "customer";

            ApiService.put("/rest/io/customer/bank_data/" + this.updateBankData.id, this.updateBankData)
                .done(response =>
                {
                    this.userBankData.splice(this.updateBankIndex, 1, response);
                    this.checkBankDataSelection();
                    this.closeModal();

                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.myAccountBankDataUpdated")
                    ).closeAfter(3000);

                    this.waiting = false;
                })
                .fail(() =>
                {
                    this.closeModal();

                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.myAccountBankDataNotUpdated")
                    ).closeAfter(5000);

                    this.waiting = false;
                });
        },

        /**
         * Add new bank-data
         */
        addBankInfo()
        {
            this.updateBankData.lastUpdateBy = "customer";
            this.updateBankData.contactId = this.contactId;

            ApiService.post("/rest/io/customer/bank_data", this.updateBankData)
                .done(response =>
                {
                    this.userBankData.push(response);
                    this.checkBankDataSelection(true);
                    this.closeModal();

                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.myAccountBankDataAdded")
                    ).closeAfter(3000);

                    this.waiting = false;
                })
                .fail(() =>
                {
                    this.closeModal();

                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.myAccountBankDataNotAdded")
                    ).closeAfter(5000);

                    this.waiting = false;
                });
        },

        /**
         * Delete bank-data
         */
        removeBankInfo()
        {
            ApiService.del("/rest/io/customer/bank_data/" + this.updateBankData.id)
                .done(response =>
                {
                    this.checkBankDataSelection(false);
                    this.closeDeleteModal();
                    this.userBankData.splice(this.updateBankIndex, 1);

                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.myAccountBankDataDeleted")
                    ).closeAfter(3000);
                })
                .fail(() =>
                {
                    this.closeDeleteModal();

                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.myAccountBankDataNotDeleted")
                    ).closeAfter(5000);
                });
        },

        /**
         * Check selection on delete and on add bank-data
         */
        checkBankDataSelection(addData)
        {
            if (addData && !this.doUpdate && this.userBankData.length < 1)
            {
                this.selectedBankData = this.userBankData[0];
            }

            if (!addData && this.selectedBankData && this.selectedBankData.id === this.updateBankData.id)
            {
                if (!this.doUpdate)
                {
                    this.selectedBankData = null;
                }
                else
                {
                    this.selectedBankData = this.userBankData[this.updateBankIndex];
                }
            }
        },

        /**
         * Reset the updateBankData and updateBankIndex
         */
        resetData()
        {
            this.updateBankData = {};
            this.updateBankIndex = 0;
            this.doUpdate = false;
        },

        /**
         * Close the current bank-modal
         */
        closeModal()
        {
            this.bankInfoModal.hide();
            this.resetData();
        },

        /**
         * Close the current bank-delete-modal
         */
        closeDeleteModal()
        {
            this.bankDeleteModal.hide();
            this.resetData();
        }
    }
});
