<template>
    <picture
        v-if="!isBackgroundImage"
        :data-iesrc="defaultImageUrl"
        :data-picture-class="pictureClass"
        :data-alt="alt"
        :data-title="title"
        :data-height="height"
        :data-width="width"
        :id="uuid">
        <slot name="additionalimages"></slot>
        <source :srcset="defaultImageUrl" :type="mimeType(defaultImageUrl)">
        <source v-if="defaultImageUrl !== imageUrl" :srcset="imageUrl" :type="mimeType(imageUrl)">
        <source v-if="fallbackUrl" :srcset="fallbackUrl" :type="mimeType(fallbackUrl)">
        <img v-if="receivedImageExtension === 'tif'" :src="defaultImageUrl" :alt="alt" :height="getHeight()" :width="getWidth()" type="image/tiff" class="mw-100 h-auto">
    </picture>

    <div v-else :data-background-image="defaultImageUrl || fallbackUrl" :class="pictureClass">
        <slot></slot>
    </div>
</template>

<script>
import lozad from "../../plugins/lozad";
import {detectAvif, detectWebP} from "../../helper/featureDetect";
const mime = require('mime-types')

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
            uuid: null,
            imgRegex: /.?(\.\w+)(?:$|\?)/
        }
    },
    mounted()
    {
        this.generateUuid();

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

                const images = document.getElementById(this.uuid).getElementsByTagName('img');
                if (images.length > 0) {
                    images[0].remove();
                }

                lozad(this.$el, {
                    loaded: function(el) {
                        el.classList.remove('lozad');
                    }
                }).triggerLoad(this.$el);
            });
        },
        imageUrl()
        {
            this.$nextTick(() => {
                this.propagateImageFormat();
                document.getElementById(this.uuid).getElementsByTagName('img')?.[0].remove();
            });
        }
    },
    computed:
    {
        convertedImageUrl()
        {
            return `${this.imageUrl}.${this.browserSupportedImgExtension}`;
        }
    },
    methods:
    {
        mimeType(url){
            return mime.lookup(url);
        },
        getHeight() {
            if (this.height && this.height > 0 && this.imageUrl.includes('/full/')) {
                return this.height;
            }
            return undefined;
        },
        getWidth() {
            if (this.width && this.width > 0 && this.imageUrl.includes('/full/')) {
                return this.width;
            }
            return undefined;
        },
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
            if (this.imageShouldBeConverted()) {
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

                    this.defaultImageUrl = this.imageUrl;
                    return;
                }

                // convert anything other than avif or webp into browser supported format.
                this.defaultImageUrl = this.convertedImageUrl;
                return;
            }
            this.defaultImageUrl = this.imageUrl || this.fallbackUrl;
        },
        imageShouldBeConverted()
        {
            const validConversionExtensions = ['jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG', 'webp'];

            return this.convertImage
                && this.imageConversionEnabled
                && /\/item\/images\//.test(this.imageUrl)
                && this.browserSupportedImgExtension !== this.receivedImageExtension
                && validConversionExtensions.includes(this.receivedImageExtension)
        },
        generateUuid()
        {
            this.uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }
    }
}
</script>