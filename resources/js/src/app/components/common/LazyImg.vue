<template>
    <picture
        v-if="!isBackgroundImage"
        :data-iesrc="defaultImageUrl || fallbackUrl"
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
            modernImgFormatEnabled: App.config.global.webpImages,
            browserSupportedImgExtension: null,
            defaultImageUrl: null,
            avifSupported: false,
            avifExtension: 'avif',
            webpSupported: false,
            webpExtension: 'webp',
            fallbackExtension: 'jpeg',
            imgRegex: /.?(\.\w+)(?:$|\?)/
        }
    },
    mounted() {
        this.browserSupportedImgExtension = this.browserSupportedImageExtension();
        this.setDefaultImageUrl();

        this.$nextTick(() => {
            if (!this.isBackgroundImage) {
              this.$el.classList.toggle('lozad');
            }

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
        checkAvifSupport() {
            const avifImg = new Image();

            avifImg.onload  = () => this.avifSupported = avifImg.width > 0 && avifImg.height > 0;
            avifImg.onerror = () => this.avifSupported = false;

            avifImg.src = 'data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA=';
        },
        checkWebPSupport() {
            const webpImg = new Image();

            webpImg.onload = () => this.webpSupported = webpImg.width > 0 && webpImg.height > 0;
            webpImg.onerror = () => this.webpSupported = false;

            webpImg.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vv9UAA==';
        },
        browserSupportedImageExtension()
        {
            this.checkAvifSupport();
            console.log('avifSupported', this.avifSupported);
            if (this.avifSupported) return this.avifExtension;

            this.checkWebPSupport();
            console.log('webpSupported', this.webpSupported);
            if (this.webpSupported) return this.webpExtension;

            return this.fallbackExtension;
        },
        receivedImageExtension()
        {
            const matches = this.imageUrl?.match(this.imgRegex);

            if (matches) {
                return matches[1].split('.').pop();
            }

            return null;
        },
        setDefaultImageUrl()
        {
            const receivedImageExtension = this.receivedImageExtension();

            if (receivedImageExtension === this.avifExtension) {
                this.defaultImageUrl = this.browserSupportedImgExtension === this.avifExtension
                    ? this.imageUrl
                    : this.convertedImageUrl;
                return;
            }

            if (receivedImageExtension === this.webpExtension) {
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

            if (receivedImageExtension !== this.avifExtension && receivedImageExtension !== this.webpExtension && this.modernImgFormatEnabled) {
                this.defaultImageUrl = this.browserSupportedImgExtension !== this.fallbackExtension
                    ? this.convertedImageUrl
                    : this.imageUrl;
            }
        }
    }
}
</script>