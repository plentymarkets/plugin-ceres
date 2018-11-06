import moment from "moment";

Vue.component("live-shopping", {
    props: {
        template:
        {
            type: String,
            default: "#vue-live-shopping"
        },
        itemData:
        {
            type: Object,
            required: true
        },
        liveShoppingData:
        {
            type: Object,
            required: true
        }
    },

    data()
    {
        return {
            from: parseInt(this.liveShoppingData.fromTime) * 1000,
            to: parseInt(this.liveShoppingData.toTime) * 1000,
            duration: null,
            timePercentage: 0,
            test: 100,
            down: true
        };
    },

    computed:
    {
        quantitySoldPercentage()
        {
            const percentage = 100 - this.liveShoppingData.quantitySold / this.liveShoppingData.quantityMax * 100;

            return percentage.toFixed(2);
        },

        itemPriceRebatePercentage()
        {
            const specialOfferPrice = this.itemData.prices.specialOffer.price.value;
            const defaultPrice      = this.itemData.prices.default.price.value;
            let percentage          = 100 - specialOfferPrice / defaultPrice * 100;

            percentage = percentage.toFixed(2);
            percentage = percentage.replace(".", App.decimalSeparator);

            return percentage;
        }
    },

    created()
    {
        this.$options.template = this.template;

        this.initTimer();
    },

    methods:
    {
        initTimer()
        {
            this.calculations();

            setInterval(() =>
            {
                this.calculations();
            }, 1000);
        },

        calculations()
        {
            const momBegin = moment(this.from);
            const momEnd = moment(this.to);
            const momNow = moment(Date.now());

            const fullSeconds = momEnd.diff(momBegin, "seconds");
            const leftSeconds = momEnd.diff(momNow, "seconds");

            this.timePercentage = (leftSeconds / fullSeconds * 100).toFixed(2);
            this.duration = this.getDuration(leftSeconds);
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
    }
});
