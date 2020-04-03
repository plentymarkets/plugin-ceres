<template>
    <form method="post" @submit.prevent="submit()">
        <div id="edit-coupon-overlay" class="modal fade" tabindex="-1" role="dialog" ref="editCouponOverlay">
            <div class="modal-dialog modal-lg mx-auto modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    
                    <!-- MODAL HEADER -->
                    <div class="modal-header">
                        <div class="modal-title h4">{{ $translate("Ceres::Template.orderConfirmationCouponEdit") }}</div>
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
                                        <input type="text" name="sender" autocomplete="off" data-validate="text" data-autofocus v-model="coupon.sender">
                                        <label for="sender">{{ $translate("Ceres::Template.orderConfirmationCouponSender") }}*</label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="input-unit">
                                        <input type="text" name="recipient" autocomplete="off" data-validate="text" v-model="coupon.recipient">
                                        <label for="recipient">{{ $translate("Ceres::Template.orderConfirmationCouponRecipient") }}*</label>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="input-unit">
                                        <textarea name="content" rows="3" autocomplete="off" v-model="coupon.content"></textarea>
                                        <label for="content">{{ $translate("Ceres::Template.orderConfirmationCouponContent") }}</label>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <!-- ./MODAL BODY -->

                    <!-- MODAL FOOTER -->
                    <div class="modal-footer">
                        <button type="reset" :disabled="isDisabled" class="btn btn-danger" data-dismiss="modal" aria-label="Close" @click="closeModal()">
                            <span>{{ $translate("Ceres::Template.orderConfirmationCouponCancel") }}</span>
                            <i class="fa fa-times default-float" aria-hidden="true"></i> 
                        </button>
                        <button type="submit" :disabled="isDisabled" class="btn btn-primary">
                            <span>{{ $translate("Ceres::Template.orderConfirmationCouponSave") }}</span>
                            <i class="fa fa-check default-float" aria-hidden="true"></i> 
                        </button>
                    </div>
                    <!-- ./MODAL FOOTER -->
                
                </div>
            </div>
        </div>
    </form>
</template>

<script>
import NotificationService from "../../services/NotificationService";

const ModalService  = require("../../services/ModalService");
const ApiService    = require("../../services/ApiService");

export default {
    props: {
        orderItem: Object
    },
    
    data()
    {
        return {
            couponData: [],
            isDisabled: false
        };
    },

    created()
    {
        for(let i=0; i < this.orderItem.quantity; i++)
        {
            this.couponData.push({
                sender: "",
                recipient: "",
                content: ""
            });
        }
    },

    methods:
    {
        submit()
        {
            this.isDisabled = true;

            ApiService.put("/rest/webshop/coupon_document", {couponData: this.couponData})
                .done(response =>
                {
                    NotificationService.success(
                        this.$translate("Ceres::Template.orderConfirmationCouponSuccessful")
                    );
                    this.closeModal();
                })
                .fail(() =>
                {
                    NotificationService.error(
                        this.$translate("Ceres::Template.orderConfirmationCouponFailed")
                    ).closeAfter(10000);
                })
                .always(() =>
                {
                    this.isDisabled = false;
                });
        },

        closeModal()
        {
            ModalService.findModal(this.$refs.editCouponOverlay).hide();
        }
    }
}
</script>
