<template>
    <picture
        v-if="!isBackgroundImage"
        :data-iesrc="fallbackUrl || defaultImageUrl"
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
            modernImgFormatEnabled: App.config.global.webpImages,
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
    mounted() {
        detectAvif(((avifSupported) => {
          console.log('avifSupported', avifSupported);
          this.avifSupported = avifSupported;
          console.log('this.avifSupported', this.avifSupported);

          if (!avifSupported) {
            console.log('avif not supported');
            detectWebP(((webpSupported) => {
              console.log('webpSupported', webpSupported);
              this.webpSupported = webpSupported;
              console.log('this.webpSupported', this.webpSupported);
            }))
          }
        }));

        this.setReceivedImageExtension();
        this.setBrowserSupportedImageExtension();
        this.setDefaultImageUrl();

        this.$nextTick(() => {
            console.log('mounted nextTick');
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
            console.log('watcher nextTick')
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

            this.defaultImageUrl = this.modernImgFormatEnabled && this.browserSupportedImgExtension !== this.receivedImageExtension
                ? this.convertedImageUrl
                : this.imageUrl;
        }
    }
}
</script>