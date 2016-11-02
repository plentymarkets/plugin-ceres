var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");

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
            selectedBankData: {}
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

        openUpdateBank: function(bankData)
      {
            this.updateBankData = bankData;
            this.headline = "ändern";

            $(".wrapper-bottom").append($("#" + this.bankInfoId));
            this.bankInfoModal.show();

            this.doUpdate = true;
        },

        validateInput: function()
      {
            var checkLastFirstName = this.updateBankData.accountOwner.split(" ");
            var checkCharacter = parseInt(this.updateBankData.iban.substring(0, 2));
            var ibanOK = false;
            var accountOwnerOK = false;

            if (this.updateBankData.accountOwner.length == 0 || checkLastFirstName[0].length == 0 || checkLastFirstName[1].length == 0)
        {
                $(".accountOwner").addClass("error");
                ibanOK = false;
                accountOwnerOK = false;
            }
            else
        {
                $(".accountOwner").removeClass("error");
                accountOwnerOK = true;
            }

            if (this.updateBankData.iban.length != 22 || !isNaN(checkCharacter))
        {
                $(".iban").addClass("error");
                ibanOK = false;
            }
            else
        {
                $(".iban").removeClass("error");
                ibanOK = true;
            }

            if (ibanOK && accountOwnerOK)
        {
                if (this.doUpdate)
          {
                    this.updateBankInfo(this.updateBankData);
                }
                else
          {
                    this.addBankInfo(this.updateBankData);
                }
            }
        },

        updateBankInfo: function()
      {
            var _self = this;

            this.updateBankData.lastUpdateBy = "customer";

            ApiService.put("/rest/customer/bank_data/" + this.updateBankData.id, this.updateBankData)
        .done(function(response)
        {
            _self.updateBankData = response;
            _self.bankInfoModal.hide();
            NotificationService.success("Bankdaten wurden aktualisiert").closeAfter(3000);
        })
        .fail(function()
        {
            _self.bankInfoModal.hide();
            NotificationService.error("Bankdaten konnten aktualisiert werden").closeAfter(5000);
        });
        },

        addBankInfo: function()
      {
            var _self = this;

            this.updateBankData.contactId = this.contactId;
            ApiService.post("/rest/customer/bank_data", this.updateBankData)
        .done(function(response)
        {
            _self.userBankData.push(response.data);
            _self.bankInfoModal.hide();
            NotificationService.success("Bankdaten wurden angelegt").closeAfter(3000);
        })
        .fail(function()
        {
            _self.bankInfoModal.hide();
            NotificationService.error("Bankdaten konnten nicht angelegt werden").closeAfter(5000);
        });
        },
        removeBankData: function(bankData)
      {
            var _self = this;

            ApiService.delete("/rest/customer/bank_data/" + bankData.id)
        .done(function()
        {
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
