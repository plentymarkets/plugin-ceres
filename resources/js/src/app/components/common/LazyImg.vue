<template>
    <picture
        v-if="!isBackgroundImage"
        :data-iesrc="defaultImageUrl"
        :data-picture-class="pictureClass"
        :data-alt="alt"
        :data-title="title">
        <slot name="additionalimages"></slot>
        <source :srcset="defaultImageUrl" :type="mimeType">
        <source v-if="fallbackUrl" :srcset="fallbackUrl">
    </picture>

    <div v-else :data-background-image="defaultImageUrl || fallbackUrl" :class="pictureClass">
        <slot></slot>
    </div>
</template>

<script>
import lozad from "../../plugins/lozad";
import {detectAvif, detectWebP} from "../../helper/featureDetect";

export default {
    props:
    {
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
            // modernImgFormatEnabled: App.config.global.webpImages,
            modernImgFormatEnabled: true,
            receivedImageExtension: null,
            browserSupportedImgExtension: null,
            defaultImageUrl: null,
            avifSupported: false,
            avifExtension: 'avif',
            webpSupported: false,
            webpExtension: 'webp',
            imgRegex: /.?(\.\w+)(?:$|\?)/
        }
    },
    mounted()
    {
        detectAvif(((avifSupported) => {
            this.avifSupported = avifSupported;

            if (avifSupported === true) {
                this.propagateImageFormat();
            }

            if (!avifSupported) {
                detectWebP(((webpSupported) => {
                    this.webpSupported = webpSupported;

                    if (webpSupported === true) {
                        this.propagateImageFormat();
                    }
                }));
            }
        })).then(() => {
            if (!this.isBackgroundImage) this.$el.classList.toggle('lozad');
            lozad(this.$el).observe();
        });
    },
    watch:
    {
        defaultImageUrl()
        {
            this.$el.setAttribute('data-loaded', 'false');
            lozad(this.$el).triggerLoad(this.$el);
        }
    },
    computed:
    {
        mimeType()
        {
            const matches = this.defaultImageUrl?.match(this.imgRegex);

            if (matches) {
                return `image/${matches[1].split('.').pop()}`;
            }

            return null;
        },
        convertedImageUrl()
        {
            return `${this.imageUrl}.${this.browserSupportedImgExtension}`;
        }
    },
    methods:
    {
        propagateImageFormat()
        {
            this.setReceivedImageExtension();
            this.setBrowserSupportedImageExtension();
            this.setDefaultImageUrl();
        },
        setReceivedImageExtension()
        {
            const matches = this.imageUrl?.match(this.imgRegex);

            if (matches) {
                this.receivedImageExtension = matches[1].split('.').pop();
            }
        },
        setBrowserSupportedImageExtension()
        {
            if (this.avifSupported) {
                console.log('setBrowserSupportedImageExtension 1');
                this.browserSupportedImgExtension = this.avifExtension;
                return;
            }

            if (this.webpSupported) {
                console.log('setBrowserSupportedImageExtension 2');
                this.browserSupportedImgExtension = this.webpExtension;
                return;
            }

            console.log('setBrowserSupportedImageExtension 3');

            this.browserSupportedImgExtension = this.receivedImageExtension !== this.avifExtension && this.receivedImageExtension !== this.webpExtension
                ? this.receivedImageExtension
                : 'jpeg';
        },
        setDefaultImageUrl()
        {
            if (this.receivedImageExtension === this.avifExtension) {
                this.defaultImageUrl = this.browserSupportedImgExtension === this.avifExtension
                    ? this.imageUrl
                    : this.convertedImageUrl;
                return;
            }

            if (this.receivedImageExtension === this.webpExtension) {
                if (this.browserSupportedImgExtension === this.avifExtension) {
                    this.defaultImageUrl = this.convertedImageUrl;
                    return;
                }

                if (this.browserSupportedImgExtension === this.webpExtension) {
                    this.defaultImageUrl = this.imageUrl;
                    return;
                }

                this.defaultImageUrl = this.convertedImageUrl;
                return;
            }

            this.defaultImageUrl = this.modernImgFormatEnabled && this.browserSupportedImgExtension !== this.receivedImageExtension
                ? this.convertedImageUrl
                : this.imageUrl || this.fallbackUrl;
        }
    }
}
</script>