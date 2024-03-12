<template>
    <picture
        v-if="!isBackgroundImage"
        :data-iesrc="defaultImage || fallbackUrl"
        :data-picture-class="pictureClass"
        :data-alt="alt"
        :data-title="title">
        <slot name="additionalimages"></slot>
        <source :srcset="defaultImage" :type="mimeType">
        <source v-if="fallbackUrl" :srcset="fallbackUrl">
    </picture>

    <div v-else :data-background-image="defaultImage || fallbackUrl" :class="pictureClass">
        <slot></slot>
    </div>
</template>

<script>
import lozad from "../../plugins/lozad";
import { browserSupportedImageExtension } from "../../helper/featureDetect";

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
            modernImgFormatEnabled: App.config.global.webpImages,
            browserSupportedImgExtension: null,
            defaultImage: null,
            avifExtension: 'avif',
            webpExtension: 'webp',
            imgRegex: /.?(\.\w+)(?:$|\?)/
        }
    },

    mounted()
    {
        this.browserSupportedImgExtension = async () => await browserSupportedImageExtension();
        this.setDefaultImage();

        this.$nextTick(() =>
        {
            if (!this.isBackgroundImage)
            {
                this.$el.classList.toggle('lozad');
            }

            lozad(this.$el).observe();
        });
    },

    watch:
    {
        defaultImage()
        {
            this.$nextTick(() =>
            {
                this.$el.setAttribute('data-loaded', 'false');
                lozad(this.$el).triggerLoad(this.$el);
            });
        }
    },

    computed:
    {
        mimeType()
        {
            const matches = this.defaultImage?.match(this.imgRegex);

            if (matches) {
                return `image/${matches[1].split('.').pop()}`;
            }

            return null;
        },
        imageConversion()
        {
            return `${this.imageUrl}.${this.browserSupportedImgExtension}`;
        }
    },

    methods:
    {
        receivedImageExtension()
        {
            const matches = this.imageUrl?.match(this.imgRegex);

            if (matches) {
              return matches[1].split('.').pop();
            }

            return null;
        },
        setDefaultImage()
        {
            const receivedImageExtension = this.receivedImageExtension();

            if (receivedImageExtension === this.avifExtension) {
                this.defaultImage = this.browserSupportedImgExtension === this.avifExtension
                    ? this.imageUrl
                    : this.imageConversion;
                return;
            }

            if (receivedImageExtension === this.webpExtension) {
                if (this.browserSupportedImgExtension === this.avifExtension) {
                    this.defaultImage = this.imageConversion;
                    return;
                }

                if (this.browserSupportedImgExtension === this.webpExtension) {
                    this.defaultImage = this.imageUrl;
                    return;
                }

                this.defaultImage = this.imageConversion;
                return;
            }

            if (receivedImageExtension !== this.avifExtension && receivedImageExtension !== this.webpExtension && this.modernImgFormatEnabled) {
                this.defaultImage = this.browserSupportedImgExtension !== 'jpeg'
                    ? this.imageConversion
                    : this.imageUrl;
            }
        }
    }
}
</script>