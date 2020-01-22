<template>
    <img v-if="!isBackgroundImage" :data-src="imageUrl">
    <div v-else :data-background-image="imageUrl">
        <slot></slot>
    </div>
</template>

<script>
import lozad from "lozad";

export default {
    props: {
        imageUrl: String,
        isBackgroundImage: Boolean
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            lozad(this.$el).observe();
        });
    },

    watch:
    {
        imageUrl()
        {
            this.$nextTick(() =>
            {
                this.$el.setAttribute("data-loaded", false);
                lozad(this.$el).triggerLoad(this.$el);
            });
        }
    }
}
</script>
