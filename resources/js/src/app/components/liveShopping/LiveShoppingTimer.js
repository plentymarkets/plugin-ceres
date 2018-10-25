Vue.component("live-shopping-timer", {
    props: {
        template:
        {
            type: String,
            default: "#vue-live-shopping-timer"
        },
        startTime:
        {
            type: String,
            default: "0"
        },
        endTime:
        {
            type: String,
            default: "0"
        }
    },

    data()
    {
        return {
            timer:"",
            start: "",
            end: "",
            interval: "",
            days:"",
            minutes:"",
            hours:"",
            seconds:""
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        // new Date(this.startTime).getTime();
        this.start = this.startTime * 1000;
        // new Date(this.endTime).getTime();
        this.end = this.endTime * 1000;
        // Update the count down every 1 second
        this.timerCount(this.start, this.end);
        this.interval = setInterval(() =>
        {
            this.timerCount(this.start, this.end);
        }, 1000);
    },

    methods: {
        timerCount(start, end)
        {
            // Get todays date and time
            const now = Date.now();

            // Find the distance between now an the count down date
            const distance = start - now;
            const passTime =  end - now;

            if (distance < 0 && passTime < 0)
            {
                clearInterval(this.interval);
                return;

            }
            else if (distance < 0 && passTime > 0)
            {
                this.calcTime(passTime);

            }
            else if (distance > 0 && passTime > 0)
            {
                this.calcTime(distance);
            }
        },

        calcTime(dist)
        {
            // Time calculations for days, hours, minutes and seconds
            this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
            this.hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
        }
    }
});
