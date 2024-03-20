<template>
    <picture
        v-if="!isBackgroundImage"
        :data-iesrc="defaultImageUrl"
        :data-picture-class="pictureClass"
        :data-alt="alt"
        :data-title="title">
        <slot name="additionalimages"></slot>
        <source :srcset="defaultImageUrl" :type="mimeType">
        <source :srcset="imageUrl">
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
            if (avifSupported) this.propagateImageFormat();

            if (!avifSupported) {
                detectWebP(((webpSupported) => {
                    this.webpSupported = webpSupported;
                    if (webpSupported) this.propagateImageFormat();
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

            this.defaultImageUrl = this.imageConversionEnabled && this.browserSupportedImgExtension !== this.receivedImageExtension
                ? this.testImageUrl(this.convertedImageUrl)
                    .then(function imageLoaded(e) {
                        return this.convertedImageUrl;
                    })
                    .catch(function imageFailed(e) {
                      return this.imageUrl;
                    })
                : this.imageUrl || this.fallbackUrl;
        },
        testImageUrl(url) {
            return new Promise(function(resolve, reject) {
                const image = new Image();
                image.addEventListener('load', resolve);
                image.addEventListener('error', reject);
                image.src = url;
            });
        }
    }
}
</script>