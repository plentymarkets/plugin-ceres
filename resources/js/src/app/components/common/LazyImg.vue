<template>
  <picture v-if="!isBackgroundImage"
           :data-iesrc="pictureSource"
           :data-picture-class="pictureClass"
           :data-alt="alt"
           :data-title="title">
    <slot name="additionalimages"></slot>
    <source v-if="imageUrl" :srcset="imageUrl" :type="mimeTypeWebp">
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

  data() {
    return {
      webpImagesEnabled: App.config.global.webpImagesEnabled,
      webpMimeType: 'image/webp',
      webpBrowserSupport: false
    }
  },

  mounted() {
    detectWebP(((supported) => {
      this.webpBrowserSupport = supported;
      this.$nextTick(() => {
        if(!this.isBackgroundImage) {
          this.$el.classList.toggle("lozad");
        }
        lozad(this.$el).observe();
      });
    }));
  },

  watch: {
    imageUrl() {
      this.$nextTick(() => {
        this.$el.setAttribute("data-loaded", 'false');
        lozad(this.$el).triggerLoad(this.$el);
      });
    }
  },

  computed: {
    backgroundSource() {
      return this.imageUrl && this.mimeTypeWebp
        ? this.webpBrowserSupport ? this.imageUrl : this.fallbackUrl
        : this.imageUrl || this.fallbackUrl;
    },
    mimeTypeWebp() {
      const matches = this.imageUrl?.match(/.?(\.\w+)(?:$|\?)/);
      return matches && (matches[1] === '.webp') ? this.webpMimeType : null;
    },
    pictureSource() {
      return this.mimeTypeWebp === this.webpMimeType
        ? (this.webpImagesEnabled && this.webpBrowserSupport) ? this.imageUrl : this.fallbackUrl
        : this.fallbackUrl;
    }
  }
}
</script>
