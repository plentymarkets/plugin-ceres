var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");
var ValidationService   = require("services/ValidationService");

Vue.component("bank-data-select", {

    props: [
        "userBankData",
        "contactId",
        "template"
    ],

    data: function()
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

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Select the modals
     */
    ready: function()
    {
        this.bankInfoModal = ModalService.findModal(this.$els.bankInfoModal);
        this.bankDeleteModal = ModalService.findModal(this.$els.bankDeleteModal);
    },

    methods: {

        /**
         * Set the selected bank-data
         */
        changeSelecting: function(bankData)
        {
            this.selectedBankData = bankData;
        },

        /**
         * Open the modal to add new bank-data
         */
        openAddBank: function()
        {
            this.headline = Translations.Template.bankAddDataTitle;
            this.openModal(false);
        },

        /**
         * Set data to update and open the modal
         * @param index
         * @param bankdata
         */
        openUpdateBank: function(index, bankData)
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
        openDeleteBank: function(index, bankData)
        {
            this.setUpdateData(index, bankData);

            this.doUpdate = false;
            this.bankDeleteModal.show();
        },

        /**
         * Open the modal
         * @param doUpdate
         */
        openModal: function(doUpdate)
        {
            this.doUpdate = doUpdate;
            this.bankInfoModal.show();
        },

        /**
         * Set data to change
         * @param index
         * @param bankdata
         */
        setUpdateData: function(index, bankData)
        {
            this.updateBankData = JSON.parse(JSON.stringify(bankData));
            this.updateBankIndex = index;
        },

        /**
         * Validate the input-fields-data
         */
        validateInput: function()
        {
            var _self = this;

            ValidationService.validate($("#my-bankForm"))
                .done(function()
                {
                    if (_self.doUpdate)
                    {
                        _self.updateBankInfo();
                    }
                    else
                    {
                        _self.addBankInfo();
                    }
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         * Update bank-data
         */
        updateBankInfo: function()
        {
            var _self = this;

            this.updateBankData.lastUpdateBy = "customer";

            ApiService.put("/rest/io/customer/bank_data/" + this.updateBankData.id, this.updateBankData)
                .done(function(response)
                {
                    _self.userBankData.splice(_self.updateBankIndex, 1, response);
                    _self.checkBankDataSelection();
                    _self.closeModal();

                    NotificationService.success(Translations.Template.bankDataUpdated).closeAfter(3000);
                })
                .fail(function()
                {
                    _self.closeModal();

                    NotificationService.error(Translations.Template.bankDataNotUpdated).closeAfter(5000);
                });
        },

        /**
         * Add new bank-data
         */
        addBankInfo: function()
        {
            var _self = this;

            this.updateBankData.lastUpdateBy = "customer";
            this.updateBankData.contactId = this.contactId;

            ApiService.post("/rest/io/customer/bank_data", this.updateBankData)
                .done(function(response)
                {
                    _self.userBankData.push(response);
                    _self.checkBankDataSelection(true);
                    _self.closeModal();

                    NotificationService.success(Translations.Template.bankDataAdded).closeAfter(3000);
                })
                .fail(function()
                {
                    _self.closeModal();

                    NotificationService.error(Translations.Template.bankDataNotAdded).closeAfter(5000);
                });
        },

        /**
         * Delete bank-data
         */
        removeBankInfo: function()
        {
            var _self = this;

            ApiService.delete("/rest/io/customer/bank_data/" + this.updateBankData.id)
                .done(function(response)
                {
                    _self.checkBankDataSelection(false);
                    _self.closeDeleteModal();
                    _self.userBankData.splice(_self.updateBankIndex, 1);

                    NotificationService.success(Translations.Template.bankDataDeleted).closeAfter(3000);
                })
                .fail(function()
                {
                    _self.closeDeleteModal();

                    NotificationService.error(Translations.Template.bankDataNotDeleted).closeAfter(5000);
                });
        },

        /**
         * Check selection on delete and on add bank-data
         */
        checkBankDataSelection: function(addData)
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
        resetData: function()
        {
            this.updateBankData = {};
            this.updateBankIndex = 0;
            this.doUpdate = false;
        },

        /**
         * Close the current bank-modal
         */
        closeModal: function()
        {
            this.bankInfoModal.hide();
            this.resetData();
        },

        /**
         * Close the current bank-delete-modal
         */
        closeDeleteModal: function()
        {
            this.bankDeleteModal.hide();
            this.resetData();
        }
    }
});
