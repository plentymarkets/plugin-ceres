import Vue from "vue";
import dayjs from "dayjs";

export default Vue.component("live-shopping-details", {
    props:
    {
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
        },
        prices:
        {
            type: Object,
            required: true
        },
        isActiveByStock:
        {
            type: Boolean
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
        this.initializeDataAndTimer();
    },

    methods:
    {
        initializeDataAndTimer()
        {
            const momentNow = dayjs();

            this.momentBegin = dayjs.unix(this.liveShoppingData.liveShopping.fromTime);
            this.momentEnd = dayjs.unix(this.liveShoppingData.liveShopping.toTime);
            this.hasStarted = this.momentBegin.valueOf() < momentNow.valueOf();
            this.hasClosed = this.momentEnd.valueOf() < momentNow.valueOf();

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
            const percentage      = 100 - data.quantitySold / data.quantityMax * 100;

            this.itemQuantityRemaining = data.quantityMax - data.quantitySold;
            this.quantitySoldPercentage = percentage.toFixed(App.config.item.storeSpecial);
        },

        setItemPriceRebatePercentage()
        {
            const specialOfferPrice = this.prices.price.price.value;
            const defaultPrice      = this.prices.rrp && this.prices.rrp.price.value || 0;

            if (defaultPrice === 0)
            {
                this.itemPriceRebatePercentage = 0;
            }
            else
            {
                let percentage          = 100 - specialOfferPrice / defaultPrice * 100;

                percentage = percentage.toFixed(App.config.item.storeSpecial);
                percentage = percentage.replace(".", App.decimalSeparator);

                this.itemPriceRebatePercentage = percentage;
            }

        },

        calculations()
        {
            const momentNow = dayjs();
            let fullSeconds = 0;
            let remainSeconds = 0;

            fullSeconds = this.momentEnd.diff(this.momentBegin, "second");
            if (this.hasStarted)
            {
                remainSeconds = this.momentEnd.diff(momentNow, "second");
            }
            else
            {
                remainSeconds = this.momentBegin.diff(momentNow, "second");
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
            const days = Math.floor(seconds / (60 * 60 * 24));

            seconds = seconds - (days * 60 * 60 * 24);

            const hours = Math.floor(seconds / (60 * 60));

            seconds = seconds - (hours * 60 * 60);

            const minutes = Math.floor(seconds / 60);

            seconds = seconds - (minutes * 60);

            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
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
