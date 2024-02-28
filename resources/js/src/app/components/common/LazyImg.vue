<template>
    <picture v-if="!isBackgroundImage" :data-iesrc="pictureSource" :data-picture-class="pictureClass" :data-alt="alt" :data-title="title">
        <slot name="additionalimages"></slot>
        <source v-if="defaultImage === pictureSource" :srcset="defaultImage" :type="mimeTypeWebp">
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
            defaultImage: this.imageUrl,
            webpImagesEnabled: App.config.global.webpImages,
            webpImageType: '.webp',
            webpMimeType: 'image/webp',
            webpBrowserSupport: false,
            imgRegex: /.?(\.\w+)(?:$|\?)/
        }
    },

    mounted()
    {
        if (this.webpImagesEnabled) {
            const matches = this.fallbackUrl?.match(this.imgRegex);
            if (matches && (matches[1] === this.webpImageType)) {
                this.defaultImage = this.fallbackUrl;
            }
        }

        detectWebP(((supported) =>
        {
            this.webpBrowserSupport = supported;
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
            defaultImage()
            {
                this.$nextTick(() =>
                {
                    this.$el.setAttribute("data-loaded", 'false');
                    lozad(this.$el).triggerLoad(this.$el);
                });
            }
        },

    computed: {
        /**
         *  Determine appropriate image url to use as background source
         */
        backgroundSource() {
            return this.defaultImage && this.mimeTypeWebp
                ? this.webpBrowserSupport ? this.defaultImage : this.fallbackUrl
                : this.defaultImage || this.fallbackUrl;
        },
        /**
        * Check if url points to a .webp image and return appropriate mime-type
        */
        mimeTypeWebp() {
            const matches = this.defaultImage?.match(this.imgRegex);
            return matches && (matches[1] === this.webpImageType) ? this.webpMimeType : null;
        },
        pictureSource() {
            return this.mimeTypeWebp === this.webpMimeType
                ? (this.webpImagesEnabled && this.webpBrowserSupport) ? this.defaultImage : this.fallbackUrl
                : this.fallbackUrl;
        }
    }
}
</script>