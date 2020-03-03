<template>
    <picture v-if="!isBackgroundImage" :data-iesrc="fallbackUrl || imageUrl" :data-picture-class="pictureClass">
        <source v-if="isWebP" :srcset="imageUrl" type="image/webp">
        <noscript><img :src="fallbackUrl || imageUrl"></noscript>
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
        imageUrl: {
            type: String,
            required: true
        },
        fallbackUrl: String,
        isBackgroundImage: Boolean,
        pictureClass: String
    },

    data()
    {
        return {
            supported: undefined
        }
    },

    beforeCreate() {
        detectWebP(((supported) =>
        {
            this.supported = supported;
        }));
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
            return this.supported ? this.imageUrl : this.fallbackUrl;
        },

        /**
         * Check if url points to a .webp image and return appropriate mime-type
         */
        isWebP() {
            const matches = this.imageUrl.match(/.?(\.\w+)(?:$|\?)/);

            if(matches)
            {
                return matches[1] === '.webp';
            }

            return false;
        }
    }
}
</script>
