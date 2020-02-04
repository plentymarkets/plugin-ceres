<template>
    <div v-if="isLoaded">
        <slot></slot>
    </div>
</template>

<script>
import { mapState } from 'vuex'

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
