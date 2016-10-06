var ModalService = require("services/ModalService");

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
            addressModalId : ""
        };
    },

    /**
     *  check if the address list is not empty and select the address with the matching id
     */
    created: function()
    {
        if (!this.isAddressListEmpty())
        {
            for (var index in this.addressList)
            {
                if (this.addressList[index].id === this.selectedAddressId)
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

    /**
     * select the address modal
     */
    ready: function()
    {
        this.addressModal = ModalService.findModal(document.getElementById(this.addressModalId));
    },

    methods: {
        /**
         * update the selected address
         * @param index
         */
        onAddressChanged: function(index)
        {
            this.selectedAddress = this.addressList[index];

            this.$dispatch("address-changed", this.selectedAddress);
        },

        /**
         * check if the address list is empty
         * @returns {boolean}
         */
        isAddressListEmpty: function()
        {
            return !(this.addressList && this.addressList.length > 0);
        },

        /**
         * check if a company name exists and show it bold
         * @returns {boolean}
         */
        showNameStrong: function()
        {
            return !this.selectedAddress.name1 || this.selectedAddress.name1.length === 0;
        },

        /**
         * show the add icon
         */
        showAdd: function()
        {
            this.modalType = "create";
            this.addressToEdit = {};
            this.updateHeadline();

            $(".wrapper-bottom").append($("#" + this.addressModalId));
            this.addressModal.show();
        },

        /**
         * show the edit icon
         * @param address
         */
        showEdit: function(address)
        {
            this.modalType = "update";
            this.addressToEdit = address;
            this.updateHeadline();

            $(".wrapper-bottom").append($("#" + this.addressModalId));
            this.addressModal.show();
        },

        /**
         * close the actual modal
         */
        close: function()
        {
            this.addressModal.hide();
        },

        /**
         * dynamic create the header line in the modal
         */
        updateHeadline: function()
        {
            var headline  = (this.addressType === "2") ? Translations.Callisto.orderShippingAddress : Translations.Callisto.orderInvoiceAddress;

            headline += (this.modalType === "update") ? Translations.Callisto.generalEdit : Translations.Callisto.generalAdd;
            this.headline = headline;
        }

    }
});
