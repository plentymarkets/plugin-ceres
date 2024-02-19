<template>
  <a v-if="$data.$_enableCarousel"
     :id="`owl-carousel-${_uid}`"
     :href="itemUrl"
     :aria-label="$translate('Ceres::Template.itemImageCarousel')"
     role="listbox"
     class="owl-carousel owl-theme">
    <div v-for="(imageUrl, index) in imageUrls" :key="index">
      <lazy-img
          :image-url="`${imageUrl.url}.webp`"
          :fallback-url="imageUrl.url"
          :alt="getAltText(imageUrl)"
          :title="getTitleText(imageUrl)"
          :ref="index === 0 ? 'itemLazyImage' : ''"
          :picture-class="index === 0 ? 'img-fluid' : 'img-fluid owl-lazy'"
          role="option" />
    </div>
  </a>

  <a v-else :href="itemUrl">
    <lazy-img
        :ref="!disableLazyLoad ? 'itemLazyImage' : ''"
        :image-url="`${imageOrItemImage}.webp`"
        :fallback-url="imageOrItemImage"
        :alt="getAltText(imageUrls[0])"
        :title="getTitleText(imageUrls[0])"
        picture-class="img-fluid" />
  </a>
</template>

<script>
export default {
  name: "category-image-carousel",
  props: {
    imageUrlsData: {
      type: Array
    },
    itemUrl: {
      type: String
    },
    alt: {
      type: String
    },
    title: {
      type: String
    },
    showDots: {
      type: Boolean,
      default: App.config.item.categoryShowDots
    },
    showNav: {
      type: Boolean,
      default: App.config.item.categoryShowNav
    },
    disableLazyLoad: {
      type: Boolean,
      default: false
    },
    disableCarouselOnMobile: {
      type: Boolean
    },
    enableCarousel: {
      type: Boolean
    },
    template: {
      type: String
    }
  },

  data() {
    return {
      $_enableCarousel: false
    };
  },

  computed: {
    imageUrls() {
      return this.imageUrlsData;
    },
    imageOrItemImage() {
      const selectedImg = this.imageUrls.length ? this.imageUrls[0] : this.itemImage;

      return `${selectedImg}`;
    }
  },

  mounted() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const shouldCarouselBeEnabled = this.enableCarousel && this.imageUrls.length > 1;

    this.$data.$_enableCarousel = this.disableCarouselOnMobile && isMobile ? false : shouldCarouselBeEnabled;

    this.$nextTick(() => {
      if (this.$data.$_enableCarousel) {
        this.initializeCarousel();
      }
    });
  },

  methods: {
    initializeCarousel() {
      $("#owl-carousel-" + this._uid).owlCarousel({
        dots     : !!this.showDots,
        items    : 1,
        mouseDrag: false,
        loop     : this.imageUrls.length > 1,
        lazyLoad : !this.disableLazyLoad,
        margin   : 10,
        nav      : !!this.showNav,
        navText  : [
          `<i id="owl-nav-text-left-${this._uid}" class='fa fa-chevron-left' aria-hidden='true'></i>`,
          `<i id="owl-nav-text-right-${this._uid}" class='fa fa-chevron-right' aria-hidden='true'></i>`
        ],
        onTranslated(event) {
          const element = event.target.querySelector(".owl-item.active img");

          if (element && element.dataset.src && !element.src) {
            element.src = element.dataset.src;
            element.removeAttribute("data-src");
          }
        },
        onInitialized: event => {
          if (this.showNav) {
            document.querySelector(`#owl-nav-text-left-${this._uid}`).parentElement.onclick = event => event.preventDefault();
            document.querySelector(`#owl-nav-text-right-${this._uid}`).parentElement.onclick = event => event.preventDefault();
          }
        }
      });
    },

    getAltText(image) {
      const alt = image && image.alternate ? image.alternate : this.alt;

      return alt;
    },

    getTitleText(image) {
      const title = image && image.name ? image.name : this.title;

      return title;
    }
  }
}
</script>
