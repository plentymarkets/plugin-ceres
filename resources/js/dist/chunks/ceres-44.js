(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__);


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
  components: {
    SlotComponent: {
      functional: true,
      render: function render(createElement, context) {
        return context.data.attrs.vnode;
      }
    }
  },
  props: {
    itemsPerPage: {
      type: Number,
      default: 4
    }
  },
  computed: {
    columnWidths: function columnWidths() {
      var itemsPerPage = Math.min(Math.max(this.itemsPerPage, 1), 4);
      return ["col-12", itemsPerPage === 1 ? "col-sm-12" : "col-sm-6", "col-md-" + 12 / itemsPerPage];
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.initializeCarousel();
    });
  },
  updated: function updated() {
    this.initializeCarousel();
  },
  methods: {
    initializeCarousel: function initializeCarousel() {
      if (this.$slots.items && this.$slots.items[0].tag && this.$slots.items.length > this.itemsPerPage) {
        var $owl = $(this.$refs.carouselContainer); // do not render, if no html element is inside of the carousels container

        if (!$owl.children().length) {
          return;
        }

        $owl.owlCarousel({
          onInitialized: function onInitialized() {
            $owl.find(".owl-carousel.owl-loaded").each(function () {
              $(this).trigger("refresh.owl.carousel");
            });
          },
          autoHeight: true,
          dots: true,
          items: this.itemsPerPage,
          responsive: {
            0: {
              items: 1
            },
            576: {
              items: this.itemsPerPage > 1 ? 2 : 1
            },
            768: {
              items: this.itemsPerPage > 3 ? 3 : this.itemsPerPage
            },
            992: {
              items: this.itemsPerPage
            }
          },
          lazyLoad: false,
          loop: false,
          margin: 30,
          mouseDrag: true,
          nav: true,
          navClass: ["owl-single-item-nav left carousel-control list-control-special", "owl-single-item-nav right carousel-control list-control-special"],
          navContainerClass: "",
          navText: ["<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>", "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"],
          smartSpeed: 350
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "row" },
    [
      _vm.$slots.items && _vm.$slots.items.length > _vm.itemsPerPage
        ? _c("div", { staticClass: "col-12 col-lg-12" }, [
            _c(
              "div",
              {
                ref: "carouselContainer",
                staticClass:
                  "list-item-carousel owl-carousel owl-theme owl-single-item"
              },
              _vm._l(_vm.$slots.items, function(item, index) {
                return _c("slot-component", {
                  key: index,
                  attrs: { vnode: item }
                })
              }),
              1
            )
          ])
        : _vm._l(_vm.$slots.items, function(item) {
            return _c(
              "div",
              { class: _vm.columnWidths },
              [_c("slot-component", { attrs: { vnode: item } })],
              1
            )
          })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/Carousel.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/Carousel.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Carousel.vue?vue&type=template&id=70daac60& */ "./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60&");
/* harmony import */ var _Carousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Carousel.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Carousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/pageDesign/Carousel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Carousel.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Carousel.vue?vue&type=template&id=70daac60& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-44.js.map