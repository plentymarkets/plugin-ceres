<template>
    <picture class="lozad" data-alt="" :data-iesrc="fallbackUrl || imageUrl">
        <source :srcset="imageUrl">
    </picture>
    <div v-else :data-background-image="backgroundSource">
        <slot></slot>
    </div>
</template>

<script>
import lozad from "lozad";

export default {
    props: {
        imageUrl: {
            type: String,
            required: true
        },
        fallbackUrl: String,
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
    },

    computed: {
        backgroundSource() {
            return this.imageUrl;
        }
    }
}
</script>
