Vue.component("live-shopping-details", {
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
            const momentNow = moment(Date.now());

            this.momentBegin = moment.unix(this.liveShoppingData.liveShopping.fromTime);
            this.momentEnd = moment.unix(this.liveShoppingData.liveShopping.toTime);
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
            const percentage      = 100 - data.quantitySold / data.quantityMax * 100;

            this.itemQuantityRemaining = data.quantityMax - data.quantitySold;
            this.quantitySoldPercentage = percentage.toFixed(App.config.item.storeSpecial);
        },

        setItemPriceRebatePercentage()
        {
            const specialOfferPrice = this.prices.price.price.value;
            const defaultPrice      = this.prices.rrp.price.value;

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
