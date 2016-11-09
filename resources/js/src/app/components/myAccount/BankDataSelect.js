var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");
var ValidationService   = require("services/ValidationService");

Vue.component("bank-data-select", {

    template: "#vue-bank-data-select",

    props: [
        "userBankData",
        "contactId"
    ],

    data: function()
    {
        return {
            bankInfoModal: {},
            bankDeleteModal: {},
            updateBankData: {},
            selectedBankData: {},
            updateBankIndex: 0,
            doUpdate: null,
            headline : ""
        };
    },

    /**
     * Select the first bank-data
     */
    created: function()
    {
        this.selectedBankData = this.userBankData[0];
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
            this.headline = Translations.Callisto.bankAddDataTitle;
            this.openModal(false);
        },

        /**
         * Set data to update and open the modal
         * @param index
         * @param bankdata
         */
        openUpdateBank: function(index, bankData)
        {
            this.headline = Translations.Callisto.bankUpdateDataTitle;

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

            ApiService.put("/rest/customer/bank_data/" + this.updateBankData.id, this.updateBankData)
                .done(function(response)
                {
                    _self.userBankData.splice(_self.updateBankIndex, 1, response);
                    _self.bankInfoModal.hide();

                    NotificationService.success(Translations.Callisto.bankDataUpdated).closeAfter(3000);
                })
                .fail(function()
                {
                    _self.bankInfoModal.hide();

                    NotificationService.error(Translations.Callisto.bankDataNotUpdated).closeAfter(5000);
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

            ApiService.post("/rest/customer/bank_data", this.updateBankData)
                .done(function(response)
                {
                    _self.userBankData.push(response);
                    _self.bankInfoModal.hide();

                    NotificationService.success(Translations.Callisto.bankDataAdded).closeAfter(3000);
                })
                .fail(function()
                {
                    _self.bankInfoModal.hide();

                    NotificationService.error(Translations.Callisto.bankDataNotAdded).closeAfter(5000);
                });
        },

        /**
         * Delete bank-data
         */
        removeBankInfo: function()
        {
            var _self = this;

            ApiService.delete("/rest/customer/bank_data/" + this.updateBankData.id)
                .done(function(response)
                {
                    _self.userBankData.splice(_self.updateBankIndex, 1);
                    _self.bankDeleteModal.hide();

                    NotificationService.success(Translations.Callisto.bankDataDeleted).closeAfter(3000);
                })
                .fail(function()
                {
                    _self.bankDeleteModal.hide();

                    NotificationService.error(Translations.Callisto.bankDataNotDeleted).closeAfter(5000);
                });
        },

        /**
         * Reset the updateBankData and updateBankIndex
         */
        resetData: function()
        {
            this.updateBankData = {};
            this.updateBankIndex = 0;
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
