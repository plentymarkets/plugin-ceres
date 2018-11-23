import {isNullOrUndefined}from "../../helper/utils";
import TranslationService from "services/TranslationService";

const TimeEnum = Object.freeze({past: 1, now: 2, future: 3});

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
                const momentBegin = moment(parseInt(this.currentOffer.liveShopping.fromTime) * 1000);
                const momentEnd = moment(parseInt(this.currentOffer.liveShopping.toTime) * 1000);
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

                return liveShopping.quantitySold + liveShopping.quantitySoldReal < liveShopping.quantityMax;
            }

            return false;
        },

        storeSpecial()
        {
            if (!isNullOrUndefined(this.currentOffer))
            {
                if (this.isActive)
                {
                    return {id: 1};
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

                return {id: 2, names: {name}};
            }

            return null;
        },

        prices()
        {
            const itemPrices = this.currentOffer.item.prices;
            const prices = {
                price: itemPrices.default,
                rrp: itemPrices.rrp
            };

            if (!isNullOrUndefined(itemPrices.specialOffer))
            {
                prices.price = itemPrices.specialOffer;
                prices.rrp = itemPrices.default || itemPrices.rrp;
            }

            return prices;
        },

        ...Vuex.mapState({
            liveShoppingOffers: state => state.liveShopping.liveShoppingOffers
        })
    },

    created()
    {
        this.$options.template = this.template;

        this.$store.dispatch("retrieveLiveShoppingOffer", this.liveShoppingId);
    },

    methods:
    {
        whenIsCurrentOffer()
        {
            const momentBegin = moment(parseInt(this.currentOffer.liveShopping.fromTime) * 1000);
            const momentEnd = moment(parseInt(this.currentOffer.liveShopping.toTime) * 1000);
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
