<template>
    <!-- SSR only -->
    <lazy-hydrate v-if="isSSREnabled" :when-visible="intersectionObserverOptions">
        <slot></slot>
    </lazy-hydrate>

    <!-- no SSR && component is mounted -->
    <intersector v-else-if="isIntersectorEnabled">
        <slot></slot>
    </intersector>
</template>

<script>
import { detectIntersectionObserver } from '../../helper/featureDetect';

// the intersector component for not server side rendered views
const IntersectorComponent = {
    data()
    {
        return {
            isVisible: false
        }
    },

    created()
    {
        if (App.isShopBuilder)
        {
            this.isVisible = true;
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            const quasiIntersecting = Math.abs(entries[0].intersectionRatio - this.$parent.threshold) <= 0.05;

            if (entries[0].intersectionRatio >= this.$parent.threshold || quasiIntersecting)
            {
                this.observer.unobserve(this.$parent.$el);
                this.isVisible = true;
            }

        }, this.$parent.intersectionObserverOptions);
    },

    mounted()
    {
        if (!App.isShopBuilder)
        {
            this.$nextTick(() => {
                this.observer.observe(this.$parent.$el);
            });
        }
    },

    destroyed()
    {
        if (!App.isShopBuilder)
        {
            this.observer.disconnect();
        }
    },

    render()
    {
        if (this.isVisible)
        {
            return this.$slots.default || null;
        }
        else
        {
            return this.$parent.$slots.loading || null;
        }
    }
};

export default {
    components: {
        intersector: IntersectorComponent
    },

    props: {
        threshold: {
            type: Number,
            default: 0.1
        },
        margin: {
            type: String,
            default: "0px"
        }
    },

    computed: {
        isSSREnabled() {
            return App.config.log.performanceSsr;
        },

        intersectionObserverOptions() {
            return {
                root: null,
                rootMargin: this.margin,
                threshold: this.threshold
            };
        }
    },

    data() {
        return {
            isIntersectorEnabled: false
        }
    },

    mounted() {
        // get value in the mounted hook, to ensure that it's only enabled in the client (SSR)
        this.isIntersectorEnabled = detectIntersectionObserver();
    }
}
</script>
