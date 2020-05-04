(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.sort */ "./node_modules/core-js/modules/es.array.sort.js");
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.function.name */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var owl_carousel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! owl.carousel */ "./node_modules/owl.carousel/dist/owl.carousel.js");
/* harmony import */ var owl_carousel__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(owl_carousel__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");







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
  props: {
    maxQuantity: {
      type: Number,
      default: 10
    },
    imageUrlAccessor: {
      type: String,
      default: "url"
    },
    showThumbs: {
      type: Boolean,
      default: true
    },
    showDots: {
      type: Boolean,
      default: true
    },
    animationStyle: {
      type: String,
      default: "standard"
    },
    pluginPath: {
      type: String,
      default: ""
    }
  },
  inject: {
    itemId: {
      default: null
    }
  },
  data: function data() {
    return {
      currentItem: 0
    };
  },
  computed: {
    currentVariation: function currentVariation() {
      return this.$store.getters["".concat(this.itemId, "/currentItemVariation")];
    },
    carouselImages: function carouselImages() {
      return this.orderByPosition(this.$options.filters.itemImages(this.currentVariation.images, "urlPreview")).slice(0, this.maxQuantity);
    },
    singleImages: function singleImages() {
      return this.orderByPosition(this.$options.filters.itemImages(this.currentVariation.images, this.imageUrlAccessor)).slice(0, this.maxQuantity);
    }
  },
  watch: {
    currentVariation: {
      handler: function handler(val, oldVal) {
        var _this = this;

        if (val !== oldVal) {
          setTimeout(function () {
            _this.reInitialize();
          }, 1);
        }
      },
      deep: true
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.loadLightbox().then(function () {
        _this2.initCarousel();

        _this2.initThumbCarousel();
      }).catch(function (event) {
        console.log("error while loading lightbox", event);
      });
    });
  },
  methods: {
    getImageCount: function getImageCount() {
      return this.carouselImages.length > this.maxQuantity ? this.maxQuantity : this.carouselImages.length;
    },
    reInitialize: function reInitialize() {
      var $owl = $(this.$refs.single);
      $owl.trigger("destroy.owl.carousel");
      $owl.html($owl.find(".owl-stage-outer").html()).removeClass("owl-loaded");
      $owl.find(".owl-item").remove();
      var $thumbs = $(this.$refs.thumbs);
      $thumbs.trigger("destroy.owl.carousel");
      $thumbs.html($thumbs.find(".owl-stage-outer").html()).removeClass("owl-loaded");
      $thumbs.find(".owl-item").remove();
      this.initCarousel();
      this.initThumbCarousel();
    },
    initCarousel: function initCarousel() {
      var _this3 = this;

      var imageCount = this.getImageCount();
      var carouselSettings = {
        autoHeight: true,
        dots: this.showDots,
        items: 1,
        lazyLoad: true,
        rewind: true,
        margin: 10,
        mouseDrag: imageCount > 1,
        nav: imageCount > 1,
        navClass: ["owl-single-item-nav left carousel-control", "owl-single-item-nav right carousel-control"],
        navContainerClass: "",
        navText: ["<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>", "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"],
        smartSpeed: 350,
        onChanged: function onChanged(event) {
          var $thumb = $(_this3.$refs.thumbs);
          $thumb.trigger("to.owl.carousel", [event.page.index, 350]);
        }
      };

      if (this.animationStyle !== "standard") {
        carouselSettings.animateOut = this.animationStyle;
      }

      $(this.$refs.single).owlCarousel(carouselSettings);

      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_7__["isNullOrUndefined"])(window.lightbox)) {
        lightbox.option({
          wrapAround: true
        });
      }

      $(this.$refs.single).on("changed.owl.carousel", function (event) {
        _this3.currentItem = event.page.index;
      });
    },
    initThumbCarousel: function initThumbCarousel() {
      $(this.$refs.thumbs).owlCarousel({
        autoHeight: true,
        dots: false,
        items: 5,
        lazyLoad: true,
        loop: false,
        margin: 10,
        mouseDrag: false,
        center: false,
        nav: true,
        navClass: ["owl-single-item-nav left carousel-control", "owl-single-item-nav right carousel-control"],
        navContainerClass: "",
        navText: ["<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>", "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"],
        smartSpeed: 350
      });
    },
    goTo: function goTo(index) {
      var $owl = $(this.$refs.single);
      $owl.trigger("to.owl.carousel", [index, 350]);
    },
    orderByPosition: function orderByPosition(list) {
      return list.sort(function (entryA, entryB) {
        if (entryA.position > entryB.position) {
          return 1;
        }

        if (entryA.position < entryB.position) {
          return -1;
        }

        return 0;
      });
    },
    getAltText: function getAltText(image) {
      return image && image.alternate ? image.alternate : this.$options.filters.itemName(this.currentVariation);
    },
    getImageName: function getImageName(image) {
      return image && image.name ? image.name : this.$options.filters.itemName(this.currentVariation);
    },
    loadLightbox: function loadLightbox() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var script = document.querySelector("script#lightboxscript");

        if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_7__["isNullOrUndefined"])(script)) {
          resolve();
        } else {
          var _script = document.createElement("script");

          _script.type = "text/javascript";
          _script.id = "lightboxscript";
          _script.src = "".concat(_this4.pluginPath, "/js/dist/lightbox.min.js");

          _script.addEventListener("load", function () {
            return resolve();
          }, false);

          _script.addEventListener("error", function (event) {
            return reject(event);
          }, false);

          document.body.appendChild(_script);
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { itemscope: "", itemtype: "http://schema.org/Thing" } },
    [
      _c(
        "div",
        {
          ref: "single",
          staticClass:
            "single-carousel owl-carousel owl-theme owl-single-item mt-0"
        },
        _vm._l(_vm.singleImages, function(image) {
          return _c("div", { staticClass: "prop-1-1" }, [
            _c(
              "a",
              {
                attrs: {
                  href: image.url,
                  "data-lightbox": "single-item-image" + _vm._uid
                }
              },
              [
                _c("img", {
                  staticClass: "owl-lazy",
                  attrs: {
                    "data-src": image.url,
                    alt: _vm.getAltText(image),
                    title: _vm.getImageName(image)
                  }
                })
              ]
            )
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
              staticClass: "owl-thumbs owl-carousel owl-theme owl-single-item",
              attrs: { id: "thumb-carousel" }
            },
            _vm._l(_vm.carouselImages, function(imagePreview, index) {
              return _c("div", { staticClass: "prop-1-1" }, [
                _c(
                  "div",
                  {
                    staticClass: "image-container",
                    on: {
                      click: function($event) {
                        return _vm.goTo(index)
                      }
                    }
                  },
                  [
                    _c("lazy-img", {
                      class: { active: _vm.currentItem === index },
                      attrs: {
                        "picture-class": "owl-thumb border-appearance",
                        "image-url": imagePreview.url,
                        alt: _vm.getAltText(imagePreview),
                        title: _vm.getImageName(imagePreview)
                      }
                    })
                  ],
                  1
                )
              ])
            }),
            0
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemImageCarousel.vue":
/*!********************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemImageCarousel.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemImageCarousel.vue?vue&type=template&id=5285279e& */ "./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e&");
/* harmony import */ var _ItemImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemImageCarousel.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
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

/***/ "./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemImageCarousel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemImageCarousel.vue?vue&type=template&id=5285279e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemImageCarousel.vue?vue&type=template&id=5285279e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemImageCarousel_vue_vue_type_template_id_5285279e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-32.js.map