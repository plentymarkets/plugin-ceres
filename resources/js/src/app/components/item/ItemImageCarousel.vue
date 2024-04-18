<template>
    <div itemscope itemtype="http://schema.org/Thing" class="bkr-cc">
        <div class="bkr-cc single-carousel owl-carousel owl-theme owl-single-item mt-0" id="imageGallery" ref="single">
            <div v-for="image in singleImages" class="prop-1-1 slide-owl-wrap">
                <a :href="image.url" :data-fancybox="'single-item-image' + _uid">
                    <img class="owl-lazy" :data-src="image.url" :alt="getAltText(image)" :title="getImageName(image) ">
                </a>
            </div>
        </div>
        <div v-if="showThumbs" id="thumb-carousel" class="owl-thumbs owl-carousel owl-theme owl-single-item"
            ref="thumbs">
            <template
                v-if="currentVariation.variationProperties && currentVariation.variationProperties.filter(function (prop) { return (prop.id == 4) })[0]">
                <template
                    v-for="property in currentVariation.variationProperties.filter(function (prop) { return (prop.id == 4) })[0].properties.filter(function (prop) { return (prop.id == 192) })">
                    <div class="prop-1-1" v-if="property.values.value != ''">
                        <div class="image-container">
                            <a data-toggle="modal" class="videoButton text-center" data-target="#videoModal">
                                <img src="https://cdn.bio-kinder.de/frontend/images/static/playbtn.svg"
                                    alt="Video wiedergeben" />
                                <span>Video <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor"
                                        stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                        class="css-i6dzq1">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg></span>
                            </a>
                        </div>
                    </div>
                </template>
            </template>
            <div class="prop-1-1" v-for="(imagePreview, index) in carouselImages">
                <div class="image-container" @click="goTo(index)">
                    <lazy-img picture-class="owl-thumb border-appearance"
                        v-bind:class="{ 'active': currentItem === index }" :image-url="imagePreview.url"
                        :alt="getAltText(imagePreview)" :title="getImageName(imagePreview)">
                    </lazy-img>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isNullOrUndefined } from "../../helper/utils";

export default {
    name: "item-image-carousel",

    props: {
        maxQuantity:
        {
            type: Number,
            default: 10
        },
        imageUrlAccessor:
        {
            type: String,
            default: "url"
        },
        showThumbs:
        {
            type: Boolean,
            default: true
        },
        showDots:
        {
            type: Boolean,
            default: true
        },
        animationStyle:
        {
            type: String,
            default: "standard"
        },
        pluginPath:
        {
            type: String,
            default: ""
        }
    },

    inject: {
        itemId: {
            default: null
        }
    },

    data()
    {
        return {
            currentItem: 0,
            initialized: false
        };
    },

    computed:
    {
        currentVariation()
        {
            return this.$store.getters[`${this.itemId}/currentItemVariation`]
        },

        carouselImages()
        {
            return this.$options.filters.itemImages(
                    this.currentVariation.images,
                    "urlPreview"
                ).slice(0, this.maxQuantity);
        },

        singleImages()
        {
            return this.$options.filters.itemImages(
                    this.currentVariation.images,
                    this.imageUrlAccessor
            ).slice(0, this.maxQuantity);
        }
    },

    watch: {
        currentVariation:
        {
            handler(val, oldVal)
            {
                if (val !== oldVal)
                {
                    setTimeout(() =>
                    {
                        this.reInitialize();
                    }, 1);
                }
            },
            deep: true
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.initCarousel();
            this.initThumbCarousel();
        });
    },

    methods:
    {
        getImageCount()
        {
            return this.carouselImages.length > this.maxQuantity ? this.maxQuantity : this.carouselImages.length;
        },

        reInitialize()
        {
            const $owl = $(this.$refs.single);

            $owl.trigger("destroy.owl.carousel");
            $owl.html($owl.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $owl.find(".owl-item").remove();

            const $thumbs = $(this.$refs.thumbs);

            $thumbs.trigger("destroy.owl.carousel");
            $thumbs.html($thumbs.find(".owl-stage-outer").html()).removeClass("owl-loaded");
            $thumbs.find(".owl-item").remove();

            this.initCarousel();
            this.initThumbCarousel();
        },

        initCarousel()
        {
            const imageCount = this.getImageCount();
            const carouselSettings = {
                autoHeight       : true,
                dots             : this.showDots,
                items            : 1,
                lazyLoad         : true,
                rewind           : true,
                margin           : 10,
                mouseDrag        : imageCount > 1,
                nav              : imageCount > 1,
                navClass         : [
                    "owl-single-item-nav left carousel-control",
                    "owl-single-item-nav right carousel-control"
                ],
                navContainerClass: "",
                navText          : [
                    "<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>",
                    "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"
                ],
                smartSpeed       : 350,
                onChanged: event =>
                {
                    const $thumb = $(this.$refs.thumbs);

                    $thumb.trigger("to.owl.carousel", [
                        event.page.index,
                        350
                    ]);
                },
                onInitialized: event =>
                {
                    this.initialized = true;
                }
            };

            if (this.animationStyle !== "standard")
            {
                carouselSettings.animateOut = this.animationStyle;
            }

            $(this.$refs.single).owlCarousel(carouselSettings);

            $(this.$refs.single).on("changed.owl.carousel", event =>
            {
                this.currentItem = event.page.index;
            });
        },

        initThumbCarousel()
        {
            $(this.$refs.thumbs).owlCarousel({
                autoHeight       : true,
                dots             : false,
                items            : 5,
                lazyLoad         : true,
                loop             : false,
                margin           : 10,
                mouseDrag        : false,
                center           : false,
                nav              : true,
                navClass         : [
                    "owl-single-item-nav left carousel-control",
                    "owl-single-item-nav right carousel-control"
                ],
                navContainerClass: "",
                navText          : [
                    "<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>",
                    "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"
                ],
                smartSpeed       : 350
            });
        },

        goTo(index)
        {
            const $owl = $(this.$refs.single);

            $owl.trigger("to.owl.carousel", [
                index,
                350
            ]);
        },

        getAltText(image)
        {
            return image && image.alternate ? image.alternate : this.$options.filters.itemName(this.currentVariation);
        },

        getImageName(image)
        {
            return image && image.name ? image.name : this.$options.filters.itemName(this.currentVariation);
        }
    }
}
</script>
