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
            headline : "",
            bankInfoId: "",
            bankInfoModal: {},
            updateBankData: {},
            doUpdate: null,
            selectedBankData: {},
            updateBankIndex: 0
        };
    },

    created: function()
    {
        this.bankInfoId = "bankInfoModal" + this._uid;
        this.selectedBankData = this.userBankData[0];
    },

    ready: function()
    {
        this.bankInfoModal = ModalService.findModal(document.getElementById(this.bankInfoId));
    },

    methods: {

        changeSelecting: function(bankData)
        {
            this.selectedBankData = bankData;
        },

        reset: function()
        {
            this.updateBankData = {};
        },

        openAddBank: function()
        {
            this.headline = "anlegen";

            $(".wrapper-bottom").append($("#" + this.bankInfoId));
            this.bankInfoModal.show();

            this.doUpdate = false;
        },

        openUpdateBank: function(index, bankData)
        {
            this.updateBankIndex = index;
            this.updateBankData = bankData;
            this.headline = "ändern";

            $(".wrapper-bottom").append($("#" + this.bankInfoId));
            this.bankInfoModal.show();

            this.doUpdate = true;
        },

        validateInput: function()
      {
            var _self = this;

            ValidationService.validate($("#my-bankForm"))
              .done(function()
              {
                  if (_self.doUpdate)
                  {
                      _self.updateBankInfo(_self.updateBankData);
                  }
                  else
                  {
                      _self.addBankInfo(_self.updateBankData);
                  }
              })
              .fail(function(invalidFields)
              {
                  ValidationService.markInvalidFields(invalidFields, "error");
              });

        },

        updateBankInfo: function()
        {
            var _self = this;

            this.updateBankData.lastUpdateBy = "customer";

            ApiService.put("/rest/customer/bank_data/" + this.updateBankData.id, this.updateBankData)
            .done(function(response)
            {
                _self.updateBankData[_self.this.updateBankIndex] = response;
                _self.bankInfoModal.hide();
                NotificationService.success("Bankdaten wurden aktualisiert").closeAfter(3000);
            })
            .fail(function()
            {
                _self.bankInfoModal.hide();
                NotificationService.error("Bankdaten konnten nicht aktualisiert werden").closeAfter(5000);
            });
        },

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

                NotificationService.success("Bankdaten wurden angelegt").closeAfter(3000);
            })
            .fail(function()
            {
                _self.bankInfoModal.hide();
                NotificationService.error("Bankdaten konnten nicht angelegt werden").closeAfter(5000);
            });
        },

        removeBankData: function(index, bankData)
        {
            var _self = this;

            ApiService.delete("/rest/customer/bank_data/" + bankData.id)
            .done(function(response)
            {
                _self.userBankData.splice(index, 1);
                _self.bankInfoModal.hide();
                NotificationService.success("Bankverbindung wurde gelöscht").closeAfter(3000);
            })
            .fail(function()
            {
                _self.bankInfoModal.hide();
                NotificationService.error("Bankverbindung konnte nicht gelöscht werden").closeAfter(5000);
            });
        }
    }
});
