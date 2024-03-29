<template>
    <div id="add-item-to-basket-overlay">
        <div class="modal fade">
            <div class="modal-dialog" role="document">
                <div class="modal-content" v-if="basketItem">

                    <!-- MODAL HEADER -->
                    <div class="modal-header">
                        <div class="modal-title h5">{{ $translate("Ceres::Template.singleItemAdded") }}</div>
                        <span class="text-muted ml-auto"><span class="timer"></span>s</span>
                        <button type="button" class="close ml-0 pl-1" data-dismiss="modal" :aria-label="$translate('Ceres::Template.closeIcon')">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <!-- ./MODAL HEADER -->

                    <!-- MODAL BODY -->
                    <div class="modal-body">
                        <div class="row is-table-row">
                            <div class="col-md-4" style="min-height: 80px;">
                                <lazy-img
                                    :image-url="imageUrl"
                                    :alt="imageAlternativeText || itemName"
                                    :title="itemName"
                                    :style="{ maxHeight: '140px' }"
                                    picture-class="img-fluid mx-auto" />
                            </div>
                            <div class="col-md-8">
                                <p>
                                    <strong>{{ itemName }}</strong>
                                    <br>
                                    <span v-if="countAdditionalBasketItems > 0">{{ $translate("Ceres::Template.basketItemOverlayAdditionalCount", {"count": countAdditionalBasketItems }) }}</span>
                                </p>

                                <p class="small">
                                    <strong>
                                        <span class="text-muted">{{ basketItem.quantity }} x </span>
                                        <span>{{ price | currency }}</span>
                                    </strong>
                                </p>
                                <!--<p>
                                    <item-bundle v-if="isLastBasketEntrySet" :bundle-type="variation.variation.bundleType" :bundle-components="variation.bundleComponents"></item-bundle>
                                </p> -->

                                <p class="small" v-for="attribute in variation.attributes">
                                    <strong>{{ attribute.attribute.names.name }}</strong>:
                                    <span>{{ attribute.value.names.name }}</span>
                                </p>

                                <order-property-value-list :basket-item="basketItem"></order-property-value-list>

                            </div>
                        </div>
                    </div>
                    <!-- ./MODAL BODY -->

                    <!-- MODAL FOOTER -->
                    <div class="modal-footer">
                        <a v-waiting-animation-infinite :href="urls.basket" rel="nofollow" class="btn btn-outline-primary btn-medium mr-2">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            {{ $translate("Ceres::Template.singleItemBasket") }}
                        </a>
                        <a v-waiting-animation-infinite :href="urls.checkout" rel="nofollow" class="btn btn-primary btn-medium">
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                            {{ $translate("Ceres::Template.singleItemCheckout") }}
                        </a>
                    </div>
                    <slot name="extendOverlayButtons"></slot>
                    <!-- ./MODAL FOOTER -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isNullOrUndefined } from "../../helper/utils";
import { mapState } from "vuex";
import OrderPropertyValueList from "../item/OrderPropertyValueList.vue"

const ModalService  = require("../../services/ModalService");
const ApiService    = require("../../services/ApiService");

export default {
    name: "add-item-to-basket-overlay",

    components: {
        OrderPropertyValueList
    },
    
    props: {
        defaultTimeToClose: {
            type: Number,
            default: 15
        }
    },

    data()
    {
        return {
            price: 0,
            basketItem: null,
            countAdditionalBasketItems: 0
        };
    },

    mounted()
    {
        if (App.config.basket.addItemToBasketConfirm === "overlay")
        {
            ApiService.listen("AfterBasketItemUpdate", data =>
            {
                const updatedBasketItem = data.basketItems[0];

                if (!this.isBasketItemQuantityUpdate)
                {
                    const basketItem = this.basketItems.find(item => item.id === updatedBasketItem.id) || {};

                    this.showItem(basketItem);
                }
            });

            ApiService.listen("AfterBasketItemAdd", data =>
            {
                this.showItem(data.basketItems[0], data.basketItems.length - 1);
            });
        }
    },

    computed:
    {
        ...mapState({
            basketItems: state => state.basket.items,
            isBasketItemQuantityUpdate: state => state.basket.isBasketItemQuantityUpdate
        }),

        isLastBasketEntrySet()
        {
            return !isNullOrUndefined(this.basketItem);
        },

        variation()
        {
            if (this.basketItem)
            {
                return this.basketItem.variation ? this.basketItem.variation.data : null;
            }

            return null;
        },

        itemName()
        {
            if (this.isLastBasketEntrySet)
            {
                return this.$options.filters.itemName(this.variation);
            }

            return "";
        },

        imageUrl()
        {
            if (this.isLastBasketEntrySet)
            {
                const images = this.$options.filters.itemImages(this.variation.images, "urlPreview");

                return this.$options.filters.itemImage(images);
            }

            return "";
        },

        imageAlternativeText()
        {
            if (this.isLastBasketEntrySet)
            {
                const images = this.$options.filters.itemImages(this.variation.images, "urlPreview");

                return this.$options.filters.itemImageAlternativeText(images);
            }

            return "";
        },

        urls()
        {
            return {
                basket: App.urls.basket,
                checkout: App.urls.checkout
            }
        }
    },

    methods:
    {
        showItem(basketItem, countAdditionalBasketItems)
        {
            this.basketItem = basketItem;
            this.countAdditionalBasketItems = countAdditionalBasketItems;
            this.price = basketItem.price;

            ModalService
                .findModal(document.getElementById("add-item-to-basket-overlay"))
                .setTimeout(this.defaultTimeToClose * 1000)
                .show();
        }
    }
}
</script>
