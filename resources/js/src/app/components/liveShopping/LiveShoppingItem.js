import { isNullOrUndefined } from "../../helper/utils";
import TranslationService from "../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";
import moment from "moment";

const TimeEnum = Object.freeze({ past: 1, now: 2, future: 3 });

Vue.component("live-shopping-item", {
    props: {
        template:
        {
            type: String,
            default: "#vue-live-shopping-item"
        },
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
        }
    },

    computed:
    {
        currentOffer()
        {
            return this.liveShoppingOffers[this.liveShoppingId];
        },

        isActive()
        {
            return this.isActiveByTime && this.isActiveByStock;
        },

        isActiveByTime()
        {
            if (!isNullOrUndefined(this.currentOffer))
            {
                const momentBegin = moment.unix(this.currentOffer.liveShopping.fromTime);
                const momentEnd = moment.unix(this.currentOffer.liveShopping.toTime);
                const momentNow = moment(Date.now());

                return momentBegin < momentNow && momentNow < momentEnd;
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
                    name = TranslationService.translate("Ceres::Template.liveShoppingOfferClosed");
                }
                else if (offerTime === TimeEnum.future)
                {
                    name = TranslationService.translate("Ceres::Template.liveShoppingNextOffer");
                }
                else if (offerTime === TimeEnum.now)
                {
                    name = TranslationService.translate("Ceres::Template.liveShoppingOfferSoldOut");
                }

                return { id: 2, names: { name } };
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
        },

        ...mapState({
            liveShoppingOffers: state => state.liveShopping.liveShoppingOffers
        })
    },

    created()
    {
        this.$store.dispatch("retrieveLiveShoppingOffer", this.liveShoppingId);
    },

    methods:
    {
        whenIsCurrentOffer()
        {
            const momentBegin = moment.unix(this.currentOffer.liveShopping.fromTime);
            const momentEnd = moment.unix(this.currentOffer.liveShopping.toTime);
            const momentNow = moment(Date.now());

            if (momentBegin < momentNow && momentNow > momentEnd)
            {
                return TimeEnum.past;
            }

            if (momentBegin < momentNow && momentNow < momentEnd)
            {
                return TimeEnum.now;
            }

            return TimeEnum.future;
        },

        reloadOffer()
        {
            this.$store.dispatch("retrieveLiveShoppingOffer", this.liveShoppingId);
        }
    }
});
