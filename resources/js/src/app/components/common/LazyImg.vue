<template>
    <picture v-if="!isBackgroundImage" :data-iesrc="fallbackUrl || imageUrl" :data-picture-class="sizingClass">
        <source :srcset="imageUrl" :type="mimeType">
    </picture>
    <div v-else :data-background-image="backgroundSource" :class="sizingClass">
        <slot></slot>
    </div>
</template>

<script>
import lozad from "../../plugins/lozad";

export default {
    props: {
        imageUrl: {
            type: String,
            required: true
        },
        fallbackUrl: String,
        isBackgroundImage: Boolean,
        sizingClass: String
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            if(!this.isBackgroundImage)
            {
                this.$el.classList.toggle("lozad");
            }
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
            // Add check for webp support, if true return modern, else fallback

            return App.features.webp ? this.imageUrl : this.fallbackUrl;
        },

        /**
         * Check if url points to a .webp image and return appropriate mime-type
         */
        mimeType() {

            const pattern = /.?(\.\w+)(?:$|\?)/;
            return pattern.test(this.imageUrl) ? 'image/webp' : null;
        }
    }
}
</script>
