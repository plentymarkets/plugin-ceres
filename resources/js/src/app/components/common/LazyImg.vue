<template>
    <picture
        v-if="!isBackgroundImage"
        :data-iesrc="defaultImageUrl"
        :data-picture-class="pictureClass"
        :data-alt="alt"
        :data-title="title"
        :data-height="height || 0"
        :data-width="width || 0"
    >
        <slot name="additionalimages"></slot>
        <source :srcset="defaultImageUrl" :type="mimeType">
        <source v-if="defaultImageUrl !== imageUrl" :srcset="imageUrl">
        <source v-if="fallbackUrl" :srcset="fallbackUrl">
        <img v-if="height && width" :src="defaultImageUrl || fallbackUrl" :alt="alt">
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
        convertImage: {
            type: Boolean,
            default: true
        },
        imageUrl: {
            type: String,
            default: null
        },
        fallbackUrl: {
            type: String,
            default: null
        },
        isBackgroundImage: {
            type: Boolean,
            default: false
        },
        pictureClass: {
            type: String,
            default: null
        },
        alt: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        height: {
          type: Number | null,
          default: null
        },
        width: {
          type: Number | null,
          default: null
        }
    },
    data()
    {
        return {
            imageConversionEnabled: App.config.log.modernImagesConversion,
            receivedImageExtension: null,
            browserSupportedImgExtension: null,
            defaultImageUrl: this.imageUrl,
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

            if (avifSupported) {
                this.$nextTick(() => {
                    if (!this.isBackgroundImage) this.$el.classList.toggle('lozad');
                    lozad(this.$el).observe();
                });

                this.propagateImageFormat();
            }

            if (!avifSupported) {
                detectWebP(((webpSupported) => {
                    this.webpSupported = webpSupported;

                    if (webpSupported) {
                        this.$nextTick(() => {
                            if (!this.isBackgroundImage) this.$el.classList.toggle('lozad');
                            lozad(this.$el).observe();
                        });

                        this.propagateImageFormat();
                    }
                }));
            }
        }));
    },
    watch:
    {
        defaultImageUrl()
        {
            this.$nextTick(() => {
                this.$el.setAttribute('data-loaded', 'false');
                lozad(this.$el).triggerLoad(this.$el);
            });
        }
    },
    computed:
    {
        mimeType()
        {
            const matches = this.defaultImageUrl?.match(this.imgRegex);

            if (matches) return `image/${matches[1].split('.').pop()}`;

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

            if (matches) this.receivedImageExtension = matches[1].split('.').pop();
        },
        setBrowserSupportedImageExtension()
        {
            if (this.avifSupported) {
                this.browserSupportedImgExtension = this.avifExtension;
                return;
            }

            if (this.webpSupported) {
                this.browserSupportedImgExtension = this.webpExtension;
                return;
            }

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

            this.defaultImageUrl = this.imageShouldBeConverted()
                ? this.convertedImageUrl
                : this.imageUrl || this.fallbackUrl;
        },
        imageShouldBeConverted()
        {
            const cdnPathRegex = /\.com\/[^\/]+\/item\/images\//;
            return this.convertImage 
                && this.imageConversionEnabled
                && cdnPathRegex.test(this.imageUrl)
                && this.browserSupportedImgExtension !== this.receivedImageExtension
        }
    }
}
</script>