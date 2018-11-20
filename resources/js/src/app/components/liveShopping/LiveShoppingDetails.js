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
            this.setQuantitySoldPercentage();
            this.setItemPriceRebatePercentage();

            this.hasStarted = this.momentBegin < momentNow;
            this.hasClosed = this.momentEnd < momentNow;

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
            this.quantitySoldPercentage = percentage.toFixed(2);
        },

        setItemPriceRebatePercentage()
        {
            const specialOfferPrice = this.liveShoppingData.item.prices.specialOffer.price.value;
            const defaultPrice      = this.liveShoppingData.item.prices.default.price.value;
            let percentage          = 100 - specialOfferPrice / defaultPrice * 100;

            percentage = percentage.toFixed(2);
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

            this.timePercentage = (remainSeconds / fullSeconds * 100).toFixed(2);
            this.duration = this.getDuration(remainSeconds);

            if (!this.hasStarted && this.momentBegin < momentNow)
            {
                this.hasStarted = true;
                this.$emit("reload-offer");
                clearInterval(this.currentInterval);
            }
            if (!this.hasClosed && this.momentEnd < momentNow)
            {
                this.hasClosed = true;
                this.$emit("reload-offer");
                clearInterval(this.currentInterval);
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
