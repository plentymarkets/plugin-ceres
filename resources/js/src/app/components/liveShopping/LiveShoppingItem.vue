<template>
    <div>
        <category-item
                v-if="!!currentOffer"
                :item-data="currentOffer.item"
                :decimal-count="$ceres.config.item.storeSpecial"
                image-url-accessor="urlMiddle"
                :padding-classes="paddingClasses"
                :padding-inline-styles="paddingInlineStyles"
                :force-url-with-variation-id="true">
            <template #store-special>
                <item-store-special v-if="!!storeSpecial"
                                    :store-special="storeSpecial"
                                    :recommended-retail-price="prices.rrp"
                                    :variation-retail-price="prices.price"
                                    :decimal-count="$ceres.config.item.storeSpecial ">
                </item-store-special>
            </template>
            <template #item-image>
                <a v-if="!!displaySettings.customImagePath" :href="currentOffer.item | itemURL">
                    <lazy-img   :image-url="displaySettings.customImagePath"
                                :alt="currentOffer.item | itemName"
                                :title="currentOffer.item | itemName">
                    </lazy-img>
                </a>
            </template>

            <template #item-details v-if="!!currentOffer && whenIsCurrentOffer() !== 1 && isActiveByStock">
                <live-shopping-details :live-shopping-data="currentOffer"
                                       @reload-offer="reloadOffer()"
                                       :display-settings="displaySettings"
                                       :prices="prices"
                                       :is-active-by-stock="isActiveByStock"
                                       :show-net-prices="showNetPrices">
                    <template #after-item-name>
                        <div class="live-shopping-add-to-basket">
                            <add-to-basket
                                    :variation-id="currentOffer.item.variation.id"
                                    :is-salable="!!currentOffer.item.filter && currentOffer.item.filter.isSalable"
                                    :has-children="!!currentOffer.item.filter && currentOffer.item.filter.hasActiveChildren"
                                    :interval-quantity="currentOffer.item.variation.intervalOrderQuantity || 1"
                                    :minimum-quantity="currentOffer.item.variation.minimumOrderQuantity"
                                    :maximum-quantity="!!currentOffer.item.variation.maximumOrderQuantity && currentOffer.item.variation.maximumOrderQuantity > 0 ? currentOffer.item.variation.maximumOrderQuantity : null"
                                    :order-properties="currentOffer.item.properties.filter(function(prop) { return prop.property.isOderProperty })"
                                    :has-order-properties="currentOffer.item.hasOrderProperties"
                                    :has-required-order-property="currentOffer.hasRequiredOrderProperty"
                                    :use-large-scale="false"
                                    :show-quantity="false"
                                    :item-url="currentOffer.item | itemURL"
                                    :item-type="currentOffer.item.item.itemType">
                            </add-to-basket>
                        </div>
                    </template>
                </live-shopping-details>
            </template>
        </category-item>
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { isNullOrUndefined } from "../../helper/utils";

import LiveShoppingDetails from "./LiveShoppingDetails.vue";
import ItemStoreSpecial from "../itemList/ItemStoreSpecial.vue";

const TimeEnum = Object.freeze({ past: 1, now: 2, future: 3 });

export default {

    components:
    {
        LiveShoppingDetails,
        ItemStoreSpecial
    },

    props: {
        liveShoppingId:
        {
            type: Number,
            required: true,
            validator: value =>
            {
                return value % 1 === 0 && value >= 1 && value <= 10;
            }
        },
        displaySettings:
        {
            type: Object
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        },
        sorting:
        {
            type: String,
            default: null
        },
        showNetPrices:
        {
            type: Boolean
        }
    },

    computed:
    {
        currentOffer()
        {
            return this.$store.state.liveShopping.liveShoppingOffers[this._uid];
        },

        isActive()
        {
            return this.isActiveByTime && this.isActiveByStock;
        },

        isActiveByTime()
        {
            if (!isNullOrUndefined(this.currentOffer))
            {
                const begin = parseInt(this.currentOffer.liveShopping.fromTime) * 1000;
                const end = parseInt(this.currentOffer.liveShopping.toTime) * 1000;
                const now = Date.now();

                return begin < now && now < end;
            }

            return false;
        },

        isActiveByStock()
        {
            if (!isNullOrUndefined(this.currentOffer))
            {
                const liveShopping = this.currentOffer.liveShopping;

                return liveShopping.quantitySold < liveShopping.quantityMax;
            }

            return false;
        },

        storeSpecial()
        {
            if (!isNullOrUndefined(this.currentOffer))
            {
                if (this.isActive)
                {
                    return { id: 1 };
                }

                const offerTime = this.whenIsCurrentOffer();
                let name = "";

                if (offerTime === TimeEnum.past)
                {
                    name = this.$translate("Ceres::Template.liveShoppingOfferClosed");
                }
                else if (offerTime === TimeEnum.future)
                {
                    name = this.$translate("Ceres::Template.liveShoppingNextOffer");
                }
                else if (offerTime === TimeEnum.now)
                {
                    name = this.$translate("Ceres::Template.liveShoppingOfferSoldOut");
                }

                return { id: -1, names: { name } };
            }

            return null;
        },

        prices()
        {
            const itemPrices = this.currentOffer.item.prices;
            const prices = {
                price: itemPrices.default,
                rrp: itemPrices.rrp,
                isRrpDefaultPrice: false
            };

            if (!isNullOrUndefined(itemPrices.specialOffer))
            {
                prices.price = itemPrices.specialOffer;
                prices.rrp = itemPrices.default || itemPrices.rrp;
                prices.isRrpDefaultPrice = !!itemPrices.default;
            }

            return prices;
        }
    },

    mounted()
    {
        this.reloadOffer();
    },

    methods:
    {
        whenIsCurrentOffer()
        {
            const begin = parseInt(this.currentOffer.liveShopping.fromTime) * 1000;
            const end = parseInt(this.currentOffer.liveShopping.toTime) * 1000;
            const now = Date.now();

            if (begin < now && now > end)
            {
                return TimeEnum.past;
            }

            if (begin < now && now < end)
            {
                return TimeEnum.now;
            }

            return TimeEnum.future;
        },

        reloadOffer()
        {
            this.$store.dispatch("retrieveLiveShoppingOffer", { liveShoppingId: this.liveShoppingId, sorting: this.sorting, uid: this._uid });
        }
    }
}
</script>
