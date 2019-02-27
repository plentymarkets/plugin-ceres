import TranslationService from "services/TranslationService";

Vue.component("order-documents", {

    props: {
        template:
        {
            type: String,
            default: "#vue-order-documents"
        },

        appearance:
        {
            type: String,
            default: "primary"
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
                correction_document: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsCorrectionDocument"),
                credit_note: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsCreditNote"),
                delivery_note: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsDeliveryNote"),
                dunning_letter: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsDunningLetter"),
                invoice_external: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsInvoiceExternal"),
                invoice: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsInvoice"),
                offer: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsOffer"),
                order_confirmation: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsOrderConfirmation"),
                pickup_delivery: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsPickupDelivery"),
                pro_forma_invoice: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsProFormaInvoice"),
                receipt: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsReceipt"),
                return_note: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsReturnNote"),
                success_confirmation: TranslationService.translate("Ceres::Template.myAccountOrderDocumentsSuccessConfirmation")
            })[type];
        }
    }
});
