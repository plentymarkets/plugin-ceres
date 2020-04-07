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
                <button v-if="!isFinalized" type="submit" class="btn btn-success btn-block" @click="finalize()">
                    <span>{{ $translate("Ceres::Template.couponFinalize") }}</span>
                    <icon icon="check" :loading="isLoading"></icon>
                </button>
                <!-- <button type="button" class="btn btn-primary btn-appearance btn-block">
                    <span>{{ $translate("Ceres::Template.couponDownload") }}</span>
                    <i class="fa fa-download default-float" aria-hidden="true"></i> 
                </button> -->
                <a v-if="!!isFinalized" href="#" class="btn btn-primary btn-appearance btn-block"
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
                                    <div v-if="true" class="col-12 h5">Gutschein</div>
                                    <div class="col-6">
                                        <div class="input-unit">
                                            <input :disabled="isLoading || !!isFinalized" type="text" name="sender" autocomplete="off" data-validate="text" data-autofocus v-model="coupon.sender">
                                            <label for="sender">{{ $translate("Ceres::Template.couponSender") }}*</label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="input-unit">
                                            <input :disabled="isLoading || !!isFinalized" type="text" name="recipient" autocomplete="off" data-validate="text" v-model="coupon.recipient">
                                            <label for="recipient">{{ $translate("Ceres::Template.couponRecipient") }}*</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="input-unit">
                                            <textarea :disabled="isLoading || !!isFinalized" name="content" rows="3" autocomplete="off" v-model="coupon.content"></textarea>
                                            <label for="content">{{ $translate("Ceres::Template.couponContent") }}</label>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <!-- ./MODAL BODY -->

                        <!-- MODAL FOOTER -->
                        <div class="modal-footer">
                            <button type="reset" :disabled="isLoading || !!isFinalized" class="btn btn-danger" data-dismiss="modal" aria-label="Close" @click="closeModal()">
                                <span>{{ $translate("Ceres::Template.couponCancel") }}</span>
                                <i class="fa fa-times default-float" aria-hidden="true"></i> 
                            </button>
                            <button type="submit" :disabled="isLoading || !!isFinalized" class="btn btn-primary">
                                <span>{{ $translate("Ceres::Template.couponSave") }}</span>
                                <!-- <i class="fa fa-check default-float" aria-hidden="true"></i> -->
                                <icon icon="floppy-o" :loading="isLoading"></icon>
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
        
        isFinalized: {
            type: Boolean,
            default: false
        }
    },
    
    data()
    {
        return {
            couponData: [],
            isLoading: false
        };
    },

    created()
    {
        for(let i=0; i < this.orderItem.quantity; i++)
        {
            this.couponData.push({
                sender: "",
                recipient: "",
                content: "",
                campaignCodeOrderId: this.orderItem.giftCard.information[0].id,
                accessKey: ""
            });
        }
    },

    methods:
    {
        submit()
        {
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
            this.isLoading = true;

            ApiService.post("/rest/online_store/gift_card/generate_pdf", { orderId: this.orderItem.orderId, orderItemId: this.orderItem.id, accessKey: this.couponData.accessKey}) // Route and Params missing
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

        download()
        {
            this.isLoading = true;

            ApiService.get("/rest/online_store/gift_card/download_pdf", { orderId: this.orderItem.orderId, orderItemId: this.orderItem.id, accessKey: this.couponData.accessKey}) // Route and Params missing
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
