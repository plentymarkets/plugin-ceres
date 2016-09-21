var ModalService = require('services/ModalService');

Vue.component('address-select', {

    template: '#vue-address-select',

    props: [
        'addressList',
        'addressType',
        'selectedAddressId'
    ],

    data: function()
    {
        return {
            selectedAddress: {},
            addressModal   : {},
            modalType      : "",
            headline       : "",
            addressToEdit  : {},
            addressModalId : ""
        };
    },

    created: function()
    {
        if (!this.isAddressListEmpty())
        {
            for (var index in this.addressList)
            {
                if (this.addressList[index].id == this.selectedAddressId)
                {
                    this.selectedAddress = this.addressList[index];
                }
            }
        }
        else
        {
            this.addressList = [];
        }

        this.addressModalId = "addressModal" + this._uid;
    },

    ready: function()
    {
        this.addressModal = ModalService.findModal(document.getElementById(this.addressModalId));
    },

    methods: {
        onAddressChanged: function(index)
        {
            this.selectedAddress = this.addressList[index];

            this.$dispatch('address-changed', this.selectedAddress);
        },

        isAddressListEmpty: function()
        {
            return !(this.addressList && this.addressList.length > 0);
        },

        showNameStrong: function()
        {
            return !this.selectedAddress.name1 || this.selectedAddress.name1.length == 0;
        },

        showAdd: function()
        {
            this.modalType     = "create";
            this.addressToEdit = {};
            this.updateHeadline();

            $(".wrapper-bottom").append($("#" + this.addressModalId));
            this.addressModal.show();
        },

        showEdit: function(address)
        {
            this.modalType     = "update";
            this.addressToEdit = address;
            this.updateHeadline();

            $(".wrapper-bottom").append($("#" + this.addressModalId));
            this.addressModal.show();
        },

        close: function()
        {
            this.addressModal.hide();
        },

        updateHeadline: function()
        {
            var headline  = (this.addressType == "2") ? Translations.Callisto.orderShippingAddress : Translations.Callisto.orderInvoiceAddress;
            headline += (this.modalType == "update") ? Translations.Callisto.generalEdit : Translations.Callisto.generalAdd;
            this.headline = headline;
        }

    }
});
