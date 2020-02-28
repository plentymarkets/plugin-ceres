<template>
    <picture v-if="!isBackgroundImage" class="lozad" style="display:block; min-height:1rem;" :data-iesrc="fallbackUrl || imageUrl">
        <source :srcset="imageUrl" :type="mimeType">
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
        /**
         *  Determine appropriate image url to use as background source
         */
        backgroundSource() {
            // Add check for webp support, if true return modern, else fallbaclk
            return this.imageUrl;
        },

        /**
         * Check if url points to a .webp image and return appropriate mime-type
         */
        mimeType() {
            return this.imageUrl.toLowerCase().includes(".webp") ? 'image/webp' : null;
        }
    }
}
</script>
