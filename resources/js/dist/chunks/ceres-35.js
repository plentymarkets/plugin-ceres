"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[35],{

/***/ "./resources/js/src/app/components/item/ItemImageCarousel.vue":
/*!********************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemImageCarousel.vue ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemImageCarousel.vue?vue&type=template&id=5285279e& */ "./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e&");
/* harmony import */ var _ItemImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemImageCarousel.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__.render,
  _ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemImageCarousel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
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
            this.loadLightbox().then(() =>
                {
                    this.initCarousel();
                    this.initThumbCarousel();
                })
                .catch(event =>
                {
                    console.log("error while loading lightbox", event);
                });
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

            if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(window.lightbox))
            {
                lightbox.option({
                    wrapAround: true,
                    albumLabel: this.$translate("Ceres::Template.singleItemLightboxImageShown")
                });
            }

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
        },

        loadLightbox()
        {
            return new Promise((resolve, reject) =>
            {
                const script = document.querySelector("script#lightboxscript");

                if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNullOrUndefined)(script))
                {
                    resolve();
                }
                else
                {
                    const script = document.createElement("script");

                    script.type = "text/javascript";
                    script.id = "lightboxscript";
                    script.src = `${ this.pluginPath }/js/dist/lightbox.min.js`;

                    script.addEventListener("load", () => resolve(), false);
                    script.addEventListener("error", event => reject(event), false);

                    document.body.appendChild(script);
                }
            });
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemImageCarousel.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e& ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemImageCarousel.vue?vue&type=template&id=5285279e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { itemscope: "", itemtype: "http://schema.org/Thing" } },
    [
      [
        _c(
          "div",
          {
            ref: "single",
            staticClass:
              "single-carousel owl-carousel owl-theme owl-single-item mt-0",
          },
          _vm._l(_vm.singleImages, function (image) {
            return _c("div", { staticClass: "prop-1-1" }, [
              _c(
                "a",
                {
                  attrs: {
                    href: image.url,
                    "data-lightbox": "single-item-image" + _vm._uid,
                  },
                },
                [
                  _c("img", {
                    staticClass: "owl-lazy",
                    attrs: {
                      "data-src": image.url,
                      alt: _vm.getAltText(image),
                      title: _vm.getImageName(image),
                    },
                  }),
                ]
              ),
            ])
          }),
          0
        ),
        _vm._v(" "),
        _vm.showThumbs
          ? _c(
              "div",
              {
                ref: "thumbs",
                staticClass:
                  "owl-thumbs owl-carousel owl-theme owl-single-item",
                attrs: { id: "thumb-carousel" },
              },
              _vm._l(_vm.carouselImages, function (imagePreview, index) {
                return _c("div", { staticClass: "prop-1-1" }, [
                  _c(
                    "div",
                    {
                      staticClass: "image-container",
                      on: {
                        click: function ($event) {
                          return _vm.goTo(index)
                        },
                      },
                    },
                    [
                      _c("lazy-img", {
                        class: { active: _vm.currentItem === index },
                        attrs: {
                          "picture-class": "owl-thumb border-appearance",
                          "image-url": imagePreview.url,
                          alt: _vm.getAltText(imagePreview),
                          title: _vm.getImageName(imagePreview),
                        },
                      }),
                    ],
                    1
                  ),
                ])
              }),
              0
            )
          : _vm._e(),
      ],
      _vm._v(" "),
      !_vm.initialized
        ? _c(
            "div",
            {
              staticClass:
                "single-carousel owl-carousel owl-loaded owl-theme owl-single-item mt-0",
            },
            [
              _c("div", { staticClass: "prop-1-1" }, [
                _c("img", {
                  staticClass: "owl-placeholder",
                  attrs: {
                    src: _vm.singleImages[0].url,
                    alt: _vm.getAltText(_vm.singleImages[0].url),
                    title: _vm.getImageName(_vm.singleImages[0].url),
                  },
                }),
              ]),
            ]
          )
        : _vm._e(),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-35.js.map