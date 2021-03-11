<template>
    <lazy-hydrate never :trigger-hydration="isLoaded">
        <slot></slot>
    </lazy-hydrate>
</template>

<script>
export default {

    name: "lazy-load",

    props: {
        component: String
    },

    computed: {
        isLoaded()
        {
            return !!this.$store.state.lazyComponent.components[this.component];
        }
    }
}
</script>
