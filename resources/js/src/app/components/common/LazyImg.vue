<template>
    <picture v-if="!isBackgroundImage" :data-iesrc="pictureSource" :data-picture-class="pictureClass" :data-alt="alt" :data-title="title">
        <slot name="additionalimages"></slot>
        <source :srcset="pictureSource" :type="mimeType">
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
            webpMimeType: 'image/webp',
            webpBrowserSupport: false
        }
    },

    mounted()
    {
        if (this.webpImagesEnabled) {
            const imgExtension = this.fallbackUrl?.match(/.?(\.\w+)(?:$|\?)/);
            this.defaultImage = imgExtension[1] === '.webp' ? this.fallbackUrl : this.imageUrl;
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
        backgroundSource() {
            return this.defaultImage && (this.mimeType === this.webpMimeType)
                ? this.webpBrowserSupport ? this.defaultImage : this.fallbackUrl
                : this.defaultImage || this.fallbackUrl;
        },
        mimeType() {
            const imgExtension = this.defaultImage?.match(/.?(\.\w+)(?:$|\?)/);
            return 'image/' + imgExtension[1]?.substring(1);
        },
        pictureSource() {
            return this.mimeType === this.webpMimeType
                ? (this.webpImagesEnabled && this.webpBrowserSupport) ? this.defaultImage : this.fallbackUrl
                : this.fallbackUrl;
        }
    }
}
</script>
