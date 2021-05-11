<template>
    <a :id="'owl-carousel-' + _uid" v-if="$data.$_enableCarousel" class="owl-carousel owl-theme" :href="itemUrl" role="listbox" :aria-label="$translate('Ceres::Template.itemImageCarousel')">
        <div v-for="(imageUrl, index) in imageUrls" :key="index">
            <lazy-img v-if="index === 0 && !disableLazyLoad" ref="itemLazyImage" picture-class="img-fluid" :image-url="imageUrl.url" :alt="getAltText(imageUrl)" :title="getTitleText(imageUrl)" role="option"></lazy-img>
            <img v-else-if="index !== 0 && !disableLazyLoad" class="img-fluid owl-lazy" :data-src="imageUrl.url" :alt="getAltText(imageUrl)" :title="getTitleText(imageUrl)" role="option">
            <img v-else class="img-fluid" :src="imageUrl.url" :alt="getAltText(imageUrl)" :title="getAltText(imageUrl)" role="option">
        </div>
    </a>

    <a v-else :href="itemUrl">
        <lazy-img v-if="!disableLazyLoad" ref="itemLazyImage" picture-class="img-fluid" :image-url="imageUrls | itemImage" :alt="getAltText(imageUrls[0])" :title="getTitleText(imageUrls[0])"></lazy-img>
        <img v-else class="img-fluid" :src="imageUrls | itemImage" :alt="getAltText(imageUrls[0])" :title="getTitleText(imageUrls[0])">
    </a>
</template>

<script>

export default {

    name: "category-image-carousel",

    props: {
        imageUrlsData:
        {
            type: Array
        },
        itemUrl:
        {
            type: String
        },
        alt:
        {
            type: String
        },
        title:
        {
            type: String
        },
        showDots:
        {
            type: Boolean,
            default: App.config.item.categoryShowDots
        },
        showNav:
        {
            type: Boolean,
            default: App.config.item.categoryShowNav
        },
        disableLazyLoad: {
            type: Boolean,
            default: false
        },
        disableCarouselOnMobile:
        {
            type: Boolean
        },
        enableCarousel:
        {
            type: Boolean
        },
        template:
        {
            type: String
        }
    },

    data()
    {
        return {
            $_enableCarousel: false
        };
    },

    computed:
    {
        imageUrls()
        {
            return this.imageUrlsData;
        }
    },

    mounted()
    {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const shouldCarouselBeEnabled = this.enableCarousel && this.imageUrls.length > 1;

        this.$data.$_enableCarousel = this.disableCarouselOnMobile && isMobile ? false : shouldCarouselBeEnabled;

        this.$nextTick(() =>
        {
            if (this.$data.$_enableCarousel)
            {
                this.initializeCarousel();
            }
        });
    },

    methods:
    {
        initializeCarousel()
        {
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
                onTranslated(event)
                {
                    const element = event.target.querySelector(".owl-item.active img");

                    if (element && element.dataset.src && !element.src)
                    {
                        element.src = element.dataset.src;
                        element.removeAttribute("data-src");
                    }
                },
                onInitialized: event =>
                {
                    if (this.showNav)
                    {
                        document.querySelector(`#owl-nav-text-left-${this._uid}`).parentElement.onclick = event => event.preventDefault();
                        document.querySelector(`#owl-nav-text-right-${this._uid}`).parentElement.onclick = event => event.preventDefault();
                    }
                }
            });
        },

        getAltText(image)
        {
            const alt = image && image.alternate ? image.alternate : this.alt;

            return alt;
        },

        getTitleText(image)
        {
            const title = image && image.name ? image.name : this.title;

            return title;
        }
    }
}
</script>
