const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");
const ModalService        = require("services/ModalService");

import ValidationService from "services/ValidationService";

Vue.component("bank-data-select", {

    props: [
        "userBankData",
        "contactId",
        "template"
    ],

    data()
    {
        return {
            bankInfoModal: {},
            bankDeleteModal: {},
            updateBankData: {},
            selectedBankData: null,
            updateBankIndex: 0,
            doUpdate: null,
            headline : ""
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    /**
     * Select the modals
     */
    ready()
    {
        this.bankInfoModal = ModalService.findModal(this.$els.bankInfoModal);
        this.bankDeleteModal = ModalService.findModal(this.$els.bankDeleteModal);
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
            this.headline = Translations.Template.bankAddDataTitle;
            this.openModal(false);
        },

        /**
         * Set data to update and open the modal
         * @param index
         * @param bankdata
         */
        openUpdateBank(index, bankData)
        {
            this.headline = Translations.Template.bankUpdateDataTitle;

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
            this.doUpdate = doUpdate;
            ValidationService.unmarkAllFields($(this.$els.bankInfoModal));
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
                    this.userBankData.splice(_self.updateBankIndex, 1, response);
                    this.checkBankDataSelection();
                    this.closeModal();

                    NotificationService.success(Translations.Template.bankDataUpdated).closeAfter(3000);
                })
                .fail(() =>
                {
                    this.closeModal();

                    NotificationService.error(Translations.Template.bankDataNotUpdated).closeAfter(5000);
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

                    NotificationService.success(Translations.Template.bankDataAdded).closeAfter(3000);
                })
                .fail(() =>
                {
                    this.closeModal();

                    NotificationService.error(Translations.Template.bankDataNotAdded).closeAfter(5000);
                });
        },

        /**
         * Delete bank-data
         */
        removeBankInfo()
        {
            ApiService.delete("/rest/io/customer/bank_data/" + this.updateBankData.id)
                .done(response =>
                {
                    this.checkBankDataSelection(false);
                    this.closeDeleteModal();
                    this.userBankData.splice(_self.updateBankIndex, 1);

                    NotificationService.success(Translations.Template.bankDataDeleted).closeAfter(3000);
                })
                .fail(() =>
                {
                    this.closeDeleteModal();

                    NotificationService.error(Translations.Template.bankDataNotDeleted).closeAfter(5000);
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

            if (!addData && this.selectedBankData && this.selectedBankData.id == this.updateBankData.id)
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
