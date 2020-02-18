<script>
    const FEATURE_ENABLED = 'IntersectionObserver' in window;

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
            if(!FEATURE_ENABLED || App.isShopBuilder)
            {
                this.isVisible = true;
                return;
            }

            this.observer = new IntersectionObserver((entries) => {
                let quasiIntersecting = Math.abs(entries[0].intersectionRatio - this.threshold) <= 0.05;
                if(entries[0].intersectionRatio >= this.threshold || quasiIntersecting)
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
            if(FEATURE_ENABLED && !App.isShopBuilder)
            {
                this.$nextTick(() => {
                    this.mayObserve = true;
                });
            }

        },

        updated()
        {
            if(FEATURE_ENABLED && this.mayObserve && !App.isShopBuilder)
            {
                this.mayObserve = false;
                this.observer.observe(this.$el);
            }
        },

        destroyed()
        {
            if(FEATURE_ENABLED && !App.isShopBuilder)
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
