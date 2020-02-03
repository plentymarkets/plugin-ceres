<template>
    <div>
        <order-return-item
                v-for="(orderItem, index) in orderData.order.orderItems"
                :key="index"
                :order-item="orderItem"
                :is-net="amount.isNet || showNetPrices"
                :item-details-data="itemDetailsData"></order-return-item>

        <div class="d-flex flex-wrap flex-column flex-sm-row justify-content-between mt-3">
            <button class="btn btn-primary btn-appearance mt-1" @click="selectAllItems()" :class="buttonSizeClass">
                {{ $translate("Ceres::Template.returnSelectAll") }}
                <i class="fa fa-check-square-o default-float" aria-hidden="true"></i>
            </button>
            <button class="btn btn-primary btn-appearance mt-1" :disabled="isDisabled || isLoading" @click="showConfirmationModal()" :class="buttonSizeClass">
                {{ $translate("Ceres::Template.returnTrigger") }}
                <i class="fa fa-arrow-right default-float" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal fade" ref="orderReturnConfirmation" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">{{ $translate("Ceres::Template.returnSendBack") }}</h3>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <ul>
                            <li v-for="orderReturnItem in orderReturnItems">
                                {{ orderReturnItem.quantity }}x {{ orderReturnItem.orderItem | itemBundleName }}
                            </li>
                        </ul>

                        <div class="input-unit textarea cmp-contact mt-4">
                            <textarea id="contact_wish" class="no-resize" rows="5" @change="updateOrderReturnNote($event.target.value)"></textarea>
                            <label for="contact_wish">{{ $translate("Ceres::Template.returnReason") }}</label>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn btn-secondary btn-medium" :class="buttonSizeClass">
                            <i class="fa fa-times" aria-hidden="true"></i>
                            {{ $translate("Ceres::Template.returnCancel") }}
                        </button>
                        <button :disabled="isLoading" @click="sendReturnItems()" type="button" class="btn btn-primary btn-appearance btn-medium" :class="buttonSizeClass">
                            <icon icon="check" :loading="isLoading"></icon>
                            {{ $translate("Ceres::Template.returnConfirm") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationService from "../../services/NotificationService";
import { mapState, mapMutations, mapActions } from "vuex";
import { navigateTo } from "../../services/UrlService";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

import OrderReturnItem from "./OrderReturnItem.vue";

export default {

    components:
    {
        OrderReturnItem
    },

    mixins: [ButtonSizePropertyMixin],

    props: {
        initOrderData:
        {
            type: Object,
            required: true
        },

        orderAccessKey:
        {
            type: String,
            default: ""
        },

        itemDetailsData:
        {
            type: Array,
            default: () => []
        }
    },

    data()
    {
        return {
            isLoading: false
        };
    },

    created()
    {
        this.$store.commit("setOrderReturnData", this.initOrderData);
        this.$store.commit("setOrderAccessKey", this.orderAccessKey);
    },

    computed:
    {
        amount()
        {
            return this.orderData.order.amounts.find(amount => !amount.isSystemCurrency) || this.orderData.order.amounts[0];
        },

        ...mapState({
            orderData: state => state.orderReturn.orderData,
            orderReturnItems: state => state.orderReturn.orderReturnItems,
            isDisabled: state => state.orderReturn.orderReturnItems.length === 0,
            showNetPrices: state => state.basket.showNetPrices
        })
    },

    methods:
    {
        showConfirmationModal()
        {
            $(this.$refs.orderReturnConfirmation).modal("show");
        },

        sendReturnItems()
        {
            this.isLoading = true;

            this.sendOrderReturn().then(
                response =>
                {
                    $(this.$refs.orderReturnConfirmation).modal("hide");
                    navigateTo(window.location.origin);
                    NotificationService.success(
                        this.$translate("Ceres::Template.returnConfirmationInfo")
                    ).closeAfter(3000);
                },
                error =>
                {
                    this.isLoading = false;
                    $(this.$refs.orderReturnConfirmation).modal("hide");
                });
        },

        selectAllItems()
        {
            vueEventHub.$emit("select-all-items");
        },

        ...mapMutations([
            "updateOrderReturnNote"
        ]),

        ...mapActions([
            "sendOrderReturn"
        ])
    }
}
</script>
