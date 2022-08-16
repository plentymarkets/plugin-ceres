"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[5],{

/***/ "./resources/js/src/app/components/pageDesign/Carousel.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/Carousel.vue ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Carousel.vue?vue&type=template&id=70daac60& */ "./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60&");
/* harmony import */ var _Carousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Carousel.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Carousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__.render,
  _Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
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

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
            render: (createElement, context) => context.data.attrs.vnode
        }
    },

    props: {
        itemsPerPage: {
            type: Number,
            default: 4
        }
    },

    computed:
    {
        columnWidths()
        {
            const itemsPerPage = Math.min(Math.max(this.itemsPerPage, 1), 4);

            return [
                "col-12",
                itemsPerPage === 1 ? "col-sm-12" : "col-sm-6",
                "col-md-" + (12 / itemsPerPage)
            ];
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.initializeCarousel();
        });
    },

    updated()
    {
        this.initializeCarousel();
    },

    methods:
    {
        initializeCarousel()
        {
            if (this.$slots.items && this.$slots.items[0].tag && this.$slots.items.length > this.itemsPerPage)
            {
                const $owl = $(this.$refs.carouselContainer);

                // do not render, if no html element is inside of the carousels container
                if (!$owl.children().length)
                {
                    return;
                }

                $owl.owlCarousel({
                    onInitialized(){
                        $owl.find(".owl-carousel.owl-loaded").each(function() {
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
                    navClass: [
                        "owl-single-item-nav left carousel-control list-control-special",
                        "owl-single-item-nav right carousel-control list-control-special"
                    ],
                    navContainerClass: "",
                    navText: [
                        "<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>",
                        "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"
                    ],
                    smartSpeed: 350
                });
            }
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Carousel.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60& ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Carousel_vue_vue_type_template_id_70daac60___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Carousel.vue?vue&type=template&id=70daac60& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/Carousel.vue?vue&type=template&id=70daac60& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "row" },
    [
      _vm.$slots.items && _vm.$slots.items.length > _vm.itemsPerPage
        ? _c("div", { staticClass: "col-12 col-lg-12" }, [
            _c(
              "div",
              {
                ref: "carouselContainer",
                staticClass:
                  "list-item-carousel owl-carousel owl-theme owl-single-item",
              },
              _vm._l(_vm.$slots.items, function (item, index) {
                return _c("slot-component", {
                  key: index,
                  attrs: { vnode: item },
                })
              }),
              1
            ),
          ])
        : _vm._l(_vm.$slots.items, function (item) {
            return _c(
              "div",
              { class: _vm.columnWidths },
              [_c("slot-component", { attrs: { vnode: item } })],
              1
            )
          }),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-5.js.map