<template>
    <lazy-hydrate :when-visible="intersectionObserverOptions">
        <slot></slot>
    </lazy-hydrate>
</template>

<script>
    /**
     * @deprecated since 5.0.29. Use lazy-hydrate instead.
     */
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

        computed: {
            intersectionObserverOptions() {
                return {
                    root: null,
                    rootMargin: this.margin,
                    threshold: this.threshold
                }
            }
        },

        mounted() {
            console.warn(`Component "<intersect>" is deprecated. Please use "<lazy-hydrate when-visible" component instead.`);
        }
    }
</script>
