<template>
    <div>
        <div class="row">
            <div class="col-12 col-sm-6 mb-2">
                <button type="button" class="btn btn-primary btn-appearance btn-block" data-toggle="modal" data-target="#edit-coupon-overlay">
                    <span>{{ $translate("Ceres::Template.couponEdit") }}</span>
                    <i class="fa fa-gift default-float" aria-hidden="true"></i> 
                </button>
            </div>
            <div class="col-12 col-sm-6 mb-2">
                <button v-if="!isFinalized" 
                        type="button" 
                        class="btn btn-success btn-block"
                        :class="{ 'disabled': isLoading || !isPaid }"
                        v-tooltip="!isPaid"
                        data-placement="top"
                        :title="$translate('Ceres::Template.couponNotPaid')"
                        @click="finalize()">
                    <span>{{ $translate("Ceres::Template.couponFinalize") }}</span>
                    <icon icon="check" class="default-float" :loading="isLoading"></icon>
                </button>
                <a v-if="isFinalized && isPaid" :href="pdfLink" class="btn btn-primary btn-appearance btn-block" target="_blank"
                    title="$translate('Ceres::Template.couponDownload')">
                    <span>{{ $translate("Ceres::Template.couponDownload") }}</span>
                    <i class="fa fa-download default-float" aria-hidden="true"></i> 
                </a>
            </div>
        </div>
        <form method="post" @submit.prevent="submit()">
            <div id="edit-coupon-overlay" class="modal fade" tabindex="-1" role="dialog" ref="editCouponOverlay">
                <div class="modal-dialog modal-lg mx-auto modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        
                        <!-- MODAL HEADER -->
                        <div class="modal-header">
                            <div class="modal-title h4">{{ $translate("Ceres::Template.couponEdit") }}</div>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!-- ./MODAL HEADER -->

                        <!-- MODAL BODY -->
                        <div class="modal-body overflow-x-hidden modal-multi-row">
                            <template v-for="coupon in couponData">
                                <div class="row">
                                    <div class="col-12 h5">Gutschein</div>
                                    <div class="col-6">
                                        <div class="input-unit">
                                            <input :class="{ 'disabled': isLoading || isFinalized }"
                                                    :readonly="isFinalized"
                                                    v-tooltip="isFinalized"
                                                    data-placement="top"
                                                    :title="$translate('Ceres::Template.couponAlreadyFinalized')"
                                                    type="text"
                                                    name="sender"
                                                    autocomplete="off"
                                                    data-validate="text"
                                                    data-autofocus
                                                    v-model="coupon.sender">
                                            <label for="sender">{{ $translate("Ceres::Template.couponSender") }}*</label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="input-unit">
                                            <input :class="{ 'disabled': isLoading || isFinalized }"
                                                    :readonly="isFinalized"
                                                    v-tooltip="isFinalized"
                                                    data-placement="top"
                                                    :title="$translate('Ceres::Template.couponAlreadyFinalized')"
                                                    type="text"
                                                    name="recipient"
                                                    autocomplete="off"
                                                    data-validate="text"
                                                    v-model="coupon.recipient">
                                            <label for="recipient">{{ $translate("Ceres::Template.couponRecipient") }}*</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="input-unit">
                                            <textarea :class="{ 'disabled': isLoading || isFinalized }"
                                                    :readonly="isFinalized"
                                                    v-tooltip="isFinalized"
                                                    data-placement="top"
                                                    :title="$translate('Ceres::Template.couponAlreadyFinalized')"
                                                    name="content"
                                                    rows="3"
                                                    autocomplete="off"
                                                    v-model="coupon.content">
                                            </textarea>
                                            <label for="content">{{ $translate("Ceres::Template.couponContent") }}</label>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <!-- ./MODAL BODY -->

                        <!-- MODAL FOOTER -->
                        <div class="modal-footer">
                            <button type="button" 
                                    class="btn btn-danger"
                                    :disabled="isLoading"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    @click="closeModal()">
                                <span>{{ $translate("Ceres::Template.couponCancel") }}</span>
                                <i class="fa fa-times default-float" aria-hidden="true"></i> 
                            </button>
                            <button type="submit"
                                    class="btn btn-primary"
                                    :class="{ 'disabled': isLoading || isFinalized }"
                                    v-tooltip="isFinalized"
                                    data-placement="top"
                                    :title="$translate('Ceres::Template.couponAlreadyFinalized')">
                                <span>{{ $translate("Ceres::Template.couponSave") }}</span>
                                <icon icon="floppy-o" class="default-float" :loading="isLoading"></icon>
                            </button>
                        </div>
                        <!-- ./MODAL FOOTER -->
                    
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import NotificationService from "../../services/NotificationService";

const ModalService  = require("../../services/ModalService");
const ApiService    = require("../../services/ApiService");

export default {
    props: {
        orderItem: Object,

        paymentStatus: {
            type: String,
            default: "unpaid"
        },

        orderAccessKey:
        {
            type: String,
            default: ""
        }
    },
    
    data()
    {
        return {
            couponData: [],
            isFinalized: this.orderItem.giftCard.hasPdf,
            isLoading: false
        };
    },

    computed:
    {
        pdfLink()
        {
            let pdfLink = '/rest/online_store/gift_card/download_pdf/?orderId=' + this.orderItem.orderId + '&orderItemId=' + this.orderItem.id;
            
            if(this.orderAccessKey)
            {
                pdfLink += '&accessKey=' + this.orderAccessKey;
            }
 
            return pdfLink;
        },

        isPaid()
        {
            return this.paymentStatus === ("fullyPaid" || "overpaid");
        }
    },

    created()
    {
        for(let i=0; i < this.orderItem.quantity; i++)
        {
            this.couponData.push({
                sender: this.orderItem.giftCard.information[i].sender,
                recipient: this.orderItem.giftCard.information[i].recipient,
                content: this.orderItem.giftCard.information[i].content,
                campaignCodeOrderId: this.orderItem.giftCard.information[i].id,
                accessKey: this.orderAccessKey
            });
        }
    },

    methods:
    {
        submit()
        {
            if (this.isFinalized)
            {
                return;
            }

            this.isLoading = true;

            ApiService.put("/rest/online_store/gift_card/information", {giftCardInformation: this.couponData})
                .done(response =>
                {
                    NotificationService.success(
                        this.$translate("Ceres::Template.couponChangeSuccess")
                    );
                    this.closeModal();
                })
                .fail(() =>
                {
                    NotificationService.error(
                        this.$translate("Ceres::Template.couponChangeFailure")
                    ).closeAfter(10000);
                })
                .always(() =>
                {
                    this.isLoading = false;
                });
        },

        finalize()
        {
            if (!this.isPaid)
            {
                return;
            }

            this.isLoading = true;

            ApiService.post("/rest/online_store/gift_card/generate_pdf", { orderId: this.orderItem.orderId, orderItemId: this.orderItem.id, accessKey: this.orderAccessKey}) // Route and Params missing
                .done(response =>
                {
                    NotificationService.success(
                        this.$translate("Ceres::Template.couponFinalizeSuccess")
                    );

                    this.isFinalized = true;
                })
                .fail(() =>
                {
                    NotificationService.error(
                        this.$translate("Ceres::Template.couponFinalizeFailure")
                    ).closeAfter(10000);
                })
                .always(() =>
                {
                    this.isLoading = false;
                });
        },

        download()
        {
            this.isLoading = true;

            ApiService.get("/rest/online_store/gift_card/download_pdf", { orderId: this.orderItem.orderId, orderItemId: this.orderItem.id, accessKey: this.orderAccessKey}) // Route and Params missing
                .done(response =>
                {
                    NotificationService.success(
                        this.$translate("Ceres::Template.couponFinalizeSuccess")
                    );
                })
                .fail(() =>
                {
                    NotificationService.error(
                        this.$translate("Ceres::Template.couponFinalizeFailure")
                    ).closeAfter(10000);
                })
                .always(() =>
                {
                    this.isLoading = false;
                });
        },

        closeModal()
        {
            ModalService.findModal(this.$refs.editCouponOverlay).hide();
        }
    }
}
</script>
