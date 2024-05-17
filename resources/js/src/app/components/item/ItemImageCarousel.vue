<template>
    <div itemscope itemtype="http://schema.org/Thing" class="bkr-cc">
        <div class="bkr-cc single-carousel owl-carousel owl-theme owl-single-item mt-0" id="imageGallery" ref="single">
            <div v-for="image in singleImages" class="prop-1-1 slide-owl-wrap">
                <a :href="image.url" :data-fancybox="'single-item-image' + _uid" :class="{'largeVideoThumb': image.position < 0}">
                    <img class="owl-lazy" v-if="image.position >= 0" :data-src="image.url" :alt="getAltText(image)" :title="getImageName(image) " />
                    <img class="owl-lazy" v-else :data-src="image.thumb" alt="Video abspielen" />
                </a>
            </div>
        </div>
        <div v-if="showThumbs" id="thumb-carousel" class="owl-thumbs owl-carousel owl-theme owl-single-item" ref="thumbs">
            <div class="prop-1-1" v-for="(imagePreview, idx) in carouselImages">
                <div class="image-container" @click="goTo(idx)">
                    <lazy-img :picture-class="imagePreview.class"
                        v-bind:class="{ 'active': currentItem === idx, 'videoButton': imagePreview.position < 0 }" :image-url="imagePreview.url"
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
        videoCarouselPosition:
        {
            type: Number,
            default: 1
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

        youtubeVideoIds() 
        {
            let videoIdString = "";
            if (isNullOrUndefined(this.currentVariation.variationProperties))
                return [];

            for (const property of this.currentVariation.variationProperties) {
                for (const prop of property.properties) {
                    if (prop.id === 192)
                        videoIdString = prop.values.value.trim();
                }
            }

            return videoIdString.split(",").map(item => item.trim()).filter(item => item !== "");
        },

        carouselImages()
        {
            const carouselImages =  this.$options.filters.itemImages(
                    this.currentVariation.images,
                    "urlPreview"
                ).slice(0, this.maxQuantity);


            const carouselVideos = [];
            if (this.videoThumbUrl && this.youtubeVideoIds.length > 0) {
                let i = -1;
                for (let id of this.youtubeVideoIds)
                {
                    const videoBtn = {
                        url: 'https://img.youtube.com/vi/'+ id +'/mqdefault.jpg',
                        class: 'owl-thumb border-appearance videoButton',
                        alternate: 'Video abspielen',
                        position: i,
                        name: ''
                    };
                    carouselVideos.push(videoBtn);
                    i--;
                }
            }
            
            // Insert on the n-th position
            carouselImages.splice(this.videoCarouselPosition, 0, ...carouselVideos);

            return carouselImages;
        },

        singleImages()
        {
            let images = this.$options.filters.itemImages(
                    this.currentVariation.images,
                    this.imageUrlAccessor
            ).slice(0, this.maxQuantity);

            let videos = [];
            if (this.videoThumbUrl && this.youtubeVideoIds.length > 0) {
                let i = -1;
                for (let id of this.youtubeVideoIds) {
                    const videoBtn = {
                        url: 'https://www.youtube.com/watch?v='+ id +'?autoplay=0',
                        thumb: 'https://img.youtube.com/vi/' + id +'/maxresdefault.jpg',
                        alternate: 'Video abspielen',
                        position: i,
                        name: ''
                    };
                    videos.push(videoBtn);
                    i--;
                }
            }
            // Insert after 1st element
            images.splice(this.videoCarouselPosition, 0, ...videos);

            return images;
        },
        videoThumbUrl()
        {
            const hasProps = this.currentVariation.variationProperties?.find(prop => prop.id === 4);
            // Return the properties array filtered by id 192, if it exists
            const videoUrl = hasProps ? hasProps.properties.filter(prop => prop.id === 192) : [];

            return videoUrl.length > 0;
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
                video            : true,
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
                items            : 6,
                lazyLoad         : true,
                loop             : false,
                margin           : 5,
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
            if(index < 0) 
            {
                $('#videoModal').modal('toggle');
                return;
            }

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
