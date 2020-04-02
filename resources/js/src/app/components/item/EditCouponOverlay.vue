<template>
    <div id="edit-coupon-overlay" class="modal fade" tabindex="-1" role="dialog" ref="editCouponOverlay">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form method="post" @submit.prevent="submit()">
                    <!-- MODAL HEADER -->
                    <div class="modal-header">
                        <div class="modal-title h4">{{ $translate("Ceres::Template.orderConfirmationCouponGenerate") }}</div>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <!-- ./MODAL HEADER -->

                    <!-- MODAL BODY -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="input-unit">
                                    <input type="text" name="sender" autocomplete="off" data-autofocus v-model="sender">
                                    <label for="sender">{{ $translate("Ceres::Template.orderConfirmationCouponSender") }}</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="input-unit">
                                    <input type="text" name="recipient" autocomplete="off" v-model="recipient">
                                    <label for="recipient">{{ $translate("Ceres::Template.orderConfirmationCouponRecipient") }}</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="input-unit">
                                    <textarea name="content" rows="5" cols="33" autocomplete="off" v-model="content"></textarea>
                                    <label for="content">{{ $translate("Ceres::Template.orderConfirmationCouponContent") }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ./MODAL BODY -->

                    <!-- MODAL FOOTER -->
                    <div class="modal-footer">
                        <button type="submit" :disabled="isDisabled" class="btn btn-primary btn-appearance">
                            <span>{{ $translate("Ceres::Template.orderConfirmationCouponComplete") }}</span>
                            <i class="fa fa-check default-float" aria-hidden="true"></i> 
                        </button>
                    </div>
                    <!-- ./MODAL FOOTER -->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationService from "../../services/NotificationService";

const ModalService  = require("../../services/ModalService");
const ApiService    = require("../../services/ApiService");

export default {
    data()
    {
        return {
            sender: "",
            recipient: "",
            content: "",
            isDisabled: false
        };
    },

    methods:
    {
        submit()
        {
            this.isDisabled = true;

            ApiService.put("/rest/webshop/coupon_document", { sender: this.sender, recipient: this.recipient, content: this.content })
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
