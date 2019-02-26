import TranslationService from "services/TranslationService";

Vue.component("order-documents", {

    props: {
        template:
        {
            type: String,
            default: "#vue-order-documents"
        },

        documents:
        {
            type: Array,
            default: () => []
        },

        type:
        {
            type: String,
            default: "order"
        },

        allowedTypesForOrders:
        {
            type: Array,
            default: () => [
                "invoice",
                "invoice_external",
                "delivery_note",
                "order_confirmation",
                "pickup_delivery"
            ]
        },

        allowedTypesForReturns:
        {
            type: Array,
            default: () => [
                "return_note"
            ]
        }
    },

    created()
    {
        this.$options.template = this.template;
    },

    computed:
    {
        activeDocuments()
        {
            if (this.type === "order")
            {
                return this.documents.filter(document => this.allowedTypesForOrders.includes(document.type));
            }

            return this.documents.filter(document => this.allowedTypesForReturns.includes(document.type));
        }
    },

    methods:
    {
        getTypeName(type)
        {
            return ({
                correction_document: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsCorrectionDocument"),
                credit_note: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsCreditNote"),
                delivery_note: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsDeliveryNote"),
                dunning_letter: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsDunningLetter"),
                invoice_external: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsInvoiceExternal"),
                invoice: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsInvoice"),
                offer: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsOffer"),
                order_confirmation: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsOrderConfirmation"),
                pickup_delivery: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsPickupDelivery"),
                pro_forma_invoice: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsProFormaInvoice"),
                receipt: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsReceipt"),
                return_note: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsReturnNote"),
                success_confirmation: TranslationService.translate("Ceres::Template.myAccountOrderReceiptsSuccessConfirmation")
            })[type];
        }
    }
});
