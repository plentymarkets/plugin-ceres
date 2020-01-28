<script>
    export default {
        data()
        {
            return {
                isVisible: false,
                intersectionRatio: 0,
                loadingRendered: false
            }
        },

        created()
        {
            if(!('IntersectionObserver' in window))
            {
                this.isVisible = true;
                return;
            }

            this.observer = new IntersectionObserver((entries) => {
                if(entries[0].intersectionRatio >= 0.1 && this.loadingRendered)
                {
                    this.observer.unobserve(this.$el);
                    this.intersectionRatio = entries[0].intersectionRatio;
                    this.isVisible = true;
                }
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.2
            });
        },

        updated()
        {
            this.$nextTick(() =>
            {
                setTimeout(() => {
                    this.observer.observe(this.$el);
                }, 100);

            });
        },

        destroyed()
        {
            this.observer.disconnect();
        },

        render()
        {
            try {
                if( this.isVisible)
                {
                    return this.$slots.default ? this.$slots.default[1] : null;
                }
                else
                {
                    this.loadingRendered = true;
                    return this.$slots.loading;
                }

            } catch(e)
            {
                throw new Error("LazyMountIntersect can only mount one single component.");
            }
        },
    }
</script>
