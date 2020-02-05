<script>
    export default {
        props:
        {
            threshold: {
                type: Number,
                default: 0.1
            },
            margin: {
                type: String,
                default: "0px"
            }
        },

        data()
        {
            return {
                isVisible: false,
                mayObserve: false
            }
        },

        created()
        {
            this.featureEnabled = 'IntersectionObserver' in window;

            if(!this.featureEnabled)
            {
                this.isVisible = true;
                return;
            }

            this.observer = new IntersectionObserver((entries) => {
                if(entries[0].intersectionRatio >= this.threshold)
                {
                    this.observer.unobserve(this.$el);
                    this.isVisible = true;
                }
            }, {
                root: null,
                rootMargin: this.margin,
                threshold: this.threshold
            });
        },

        mounted()
        {
            if(this.featureEnabled)
            {
                this.$nextTick(() => {
                    this.mayObserve = true;
                });
            }

        },

        updated()
        {
            if(this.featureEnabled && this.mayObserve)
            {
                this.mayObserve = false;
                this.observer.observe(this.$el);
            }
        },

        destroyed()
        {
            if(this.featureEnabled)
            {
                this.observer.disconnect();
            }
        },

        render()
        {
            if( this.isVisible)
            {
                return this.$slots.default ? this.$slots.default : null;
            }
            else
            {
                return this.$slots.loading ? this.$slots.loading : null;
            }
        },
    }
</script>
