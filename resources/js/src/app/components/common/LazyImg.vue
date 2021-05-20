<template>
    <picture v-if="!isBackgroundImage" :data-iesrc="fallbackUrl || imageUrl" :data-picture-class="pictureClass" :data-alt="alt" :data-title="title">
        <slot name="additionalimages"></slot>
        <source :srcset="imageUrl" :type="mimeType">
        <source v-if="fallbackUrl" :srcset="fallbackUrl">
    </picture>
    <div v-else :data-background-image="backgroundSource" :class="pictureClass">
        <slot></slot>
    </div>
</template>

<script>
import lozad from "../../plugins/lozad";
import { detectWebP } from "../../helper/featureDetect";

export default {
    props: {
        imageUrl: String,
        fallbackUrl: String,
        isBackgroundImage: Boolean,
        pictureClass: String,
        alt: String,
        title: String
    },

    data()
    {
        return {
            supported: undefined
        }
    },

    mounted()
    {
        detectWebP(((supported) =>
        {
            this.supported = supported;
            this.$nextTick(() =>
            {
                if(!this.isBackgroundImage)
                {
                    this.$el.classList.toggle("lozad");
                }
                lozad(this.$el).observe();
            });
        }));
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
            if(this.imageUrl && this.mimeType){
                return this.supported ? this.imageUrl : this.fallbackUrl;
            } else {
                return this.imageUrl || this.fallbackUrl;
            }
        },

        /**
         * Check if url points to a .webp image and return appropriate mime-type
         */
        mimeType() {
            const matches = this.imageUrl?.match(/.?(\.\w+)(?:$|\?)/);

            if(matches)
            {
                return matches[1] === ".webp" ? "image/webp" : null;
            }

            return null;
        }
    }
}
</script>
