import {isNullOrUndefined}from "../../helper/utils";

Vue.component("live-shopping-details", {

    props: {
        template:
        {
            type: String,
            default: "#vue-live-shopping-details"
        },

        liveShoppingData:
        {
            type: Object,
            required: true
        },

        displaySettings:
        {
            type: Object,
            default: () =>
            {
                return {
                    showCrossPrice: true,
                    showStock: true,
                    showStockProgress: true,
                    showTimer: true,
                    showTimerProgress: true
                };
            }
        }
    },

    computed:
    {
        prices()
        {
            const itemPrices = this.liveShoppingData.item.prices;
            const prices = {
                price: null,
                rrp  : null
            };

            if (!isNullOrUndefined(itemPrices.specialOffer) && !isNullOrUndefined(itemPrices.default))
            {
                prices.price = itemPrices.specialOffer;
                prices.rrp = itemPrices.default;
            }
            else if (!isNullOrUndefined(itemPrices.default) && !isNullOrUndefined(itemPrices.rrp))
            {
                prices.price = itemPrices.default;
                prices.rrp = itemPrices.rrp;
            }

            return prices;
        }
    },

    data()
    {
        return {
            currentInterval: null,
            duration: null,
            hasClosed: null,
            hasStarted: null,
            itemPriceRebatePercentage: 0,
            itemQuantityRemaining: 0,
            momentBegin: null,
            momentEnd: null,
            quantitySoldPercentage: 0,
            timePercentage: 0
        };
    },

    created()
    {
        this.$options.template = this.template;

        this.initializeDataAndTimer();
    },

    methods:
    {
        initializeDataAndTimer()
        {
            const momentNow = moment(Date.now());

            this.momentBegin = moment(parseInt(this.liveShoppingData.liveShopping.fromTime) * 1000);
            this.momentEnd = moment(parseInt(this.liveShoppingData.liveShopping.toTime) * 1000);
            this.hasStarted = this.momentBegin < momentNow;
            this.hasClosed = this.momentEnd < momentNow;

            this.setQuantitySoldPercentage();

            if (this.hasStarted && !this.hasClosed)
            {
                this.setItemPriceRebatePercentage();
            }

            clearInterval(this.currentInterval);

            this.calculations();
            this.currentInterval = setInterval(() =>
            {
                this.calculations();
            }, 1000);
        },

        setQuantitySoldPercentage()
        {
            const data            = this.liveShoppingData.liveShopping;
            const quantitySoldSum = data.quantitySold + data.quantitySoldReal;
            const percentage      = 100 - quantitySoldSum / data.quantityMax * 100;

            this.itemQuantityRemaining = data.quantityMax - quantitySoldSum;
            this.quantitySoldPercentage = percentage.toFixed(App.config.item.storeSpecial);
        },

        setItemPriceRebatePercentage()
        {
            const specialOfferPrice = this.prices.price.price.value;
            const defaultPrice      = this.prices.rrp.price.value;
            let percentage          = 100 - specialOfferPrice / defaultPrice * 100;

            percentage = percentage.toFixed(App.config.item.storeSpecial);
            percentage = percentage.replace(".", App.decimalSeparator);

            this.itemPriceRebatePercentage = percentage;
        },

        calculations()
        {
            const momentNow = moment(Date.now());
            let fullSeconds = 0;
            let remainSeconds = 0;

            if (this.hasStarted)
            {
                fullSeconds = this.momentEnd.diff(this.momentBegin, "seconds");
                remainSeconds = this.momentEnd.diff(momentNow, "seconds");
            }
            else
            {
                fullSeconds = this.momentBegin.diff(this.momentNow, "seconds");
                remainSeconds = this.momentBegin.diff(momentNow, "seconds");
            }

            this.timePercentage = (remainSeconds / fullSeconds * 100).toFixed(App.config.item.storeSpecial);
            this.duration = this.getDuration(remainSeconds);

            const hasToStart = !this.hasStarted && this.momentBegin < momentNow;
            const hasToClose = !this.hasClosed && this.momentEnd < momentNow;

            if (hasToStart || hasToClose)
            {
                clearInterval(this.currentInterval);

                this.$emit("reload-offer");
            }
        },

        getDuration(seconds)
        {
            const duration = moment.duration(seconds, "seconds");

            return {
                days: duration.days(),
                hours: duration.hours(),
                minutes: duration.minutes(),
                seconds: duration.seconds()
            };
        }
    },

    watch:
    {
        liveShoppingData()
        {
            this.initializeDataAndTimer();
        }
    }
});
