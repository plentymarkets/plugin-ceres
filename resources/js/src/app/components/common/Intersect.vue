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
                loadingRendered: false
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
                if(entries[0].intersectionRatio >= this.threshold && this.loadingRendered)
                {
                    this.observer.unobserve(this.$el);
                    this.isVisible = true;
                }
            }, {
                root: null,
                rootMargin: this.margin,
                threshold: 0.1
            });
        },

        mounted()
        {
            if(this.featureEnabled)
            {
                this.$nextTick(() =>
                {
                    setTimeout(() => {
                        this.observer.observe(this.$el);
                    }, 100);
                });
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
                this.loadingRendered = true;
                return this.$slots.loading;
            }
        },
    }
</script>
