"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[31],{

/***/ "./resources/js/src/app/components/item/GraduatedPrices.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/app/components/item/GraduatedPrices.vue ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GraduatedPrices_vue_vue_type_template_id_0fc0278e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GraduatedPrices.vue?vue&type=template&id=0fc0278e& */ "./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=template&id=0fc0278e&");
/* harmony import */ var _GraduatedPrices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GraduatedPrices.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GraduatedPrices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GraduatedPrices_vue_vue_type_template_id_0fc0278e___WEBPACK_IMPORTED_MODULE_0__.render,
  _GraduatedPrices_vue_vue_type_template_id_0fc0278e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/GraduatedPrices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************/
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

    name: "graduated-prices",

    props: {
        paddingClasses: {
            type: String
        },
        paddingInlineStyles: {
            type: String
        }
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        graduatedPrices()
        {
            const currentVariation = this.$store.getters[`${this.itemId}/currentItemVariation`];

            let prices = currentVariation && currentVariation.prices.graduatedPrices;
            const minQuantity = currentVariation && currentVariation.variation.minimumOrderQuantity;

            prices = prices.filter(price => price.minimumOrderQuantity > minQuantity);

            return [...prices].sort((priceA, priceB) =>
            {
                return priceA.minimumOrderQuantity - priceB.minimumOrderQuantity;
            });
        },

       showBasePrice()
       {
            const currentVariation = this.$store.getters[`${this.itemId}/currentItemVariation`];
            const mayShowUnitPrice = currentVariation.variation.mayShowUnitPrice;
            const isSinglePiece = currentVariation.unit && currentVariation.unit.content === 1 && currentVariation.unit.unitOfMeasurement === "C62";

            return mayShowUnitPrice && !isSinglePiece;
       },

        activeGraduationIndex()
        {
            const prices = this.graduatedPrices.filter(price => this.variationOrderQuantity >= price.minimumOrderQuantity);

            if (!prices.length)
            {
                return -1;
            }

            const price = prices.reduce((prev, current) => (prev.minimumOrderQuantity > current.minimumOrderQuantity) ? prev : current);

            return this.graduatedPrices.indexOf(price);
        },

        variationOrderQuantity()
        {
            return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationOrderQuantity
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_GraduatedPrices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GraduatedPrices.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_GraduatedPrices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=template&id=0fc0278e&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=template&id=0fc0278e& ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GraduatedPrices_vue_vue_type_template_id_0fc0278e___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GraduatedPrices_vue_vue_type_template_id_0fc0278e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GraduatedPrices_vue_vue_type_template_id_0fc0278e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GraduatedPrices.vue?vue&type=template&id=0fc0278e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=template&id=0fc0278e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=template&id=0fc0278e&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/GraduatedPrices.vue?vue&type=template&id=0fc0278e& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
  return _vm.graduatedPrices[0]
    ? _c("div", [
        _c("b", [
          _vm._v(
            _vm._s(
              _vm.$translate("Ceres::Template.singleItemGraduatedPrices")
            ) + ":"
          ),
        ]),
        _vm._v(" "),
        _c("table", { staticClass: "graduated-prices-table text-muted" }, [
          _c(
            "tbody",
            [
              _vm._l(_vm.graduatedPrices, function (price, index) {
                return [
                  _c("tr", [
                    _c(
                      "td",
                      {
                        class: _vm.paddingClasses,
                        style: _vm.paddingInlineStyles,
                      },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.singleItemMinimumQuantity"
                            )
                          ) +
                            " " +
                            _vm._s(price.minimumOrderQuantity)
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      {
                        staticClass: "graduated-price",
                        class: _vm.paddingClasses,
                        style: _vm.paddingInlineStyles,
                      },
                      [
                        _vm._v(
                          "\n                        " +
                            _vm._s(price.unitPrice.formatted) +
                            "\n                        "
                        ),
                        _c("transition", { attrs: { name: "fade" } }, [
                          index === _vm.activeGraduationIndex
                            ? _c("i", {
                                staticClass:
                                  "fa fa-lg fa-check-circle-o text-appearance",
                                attrs: { "aria-hidden": "true" },
                              })
                            : _vm._e(),
                        ]),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _vm.showBasePrice
                      ? _c(
                          "td",
                          {
                            staticClass:
                              "graduated-base-price pl-3 d-none d-xl-block",
                            class: _vm.paddingClasses,
                            style: _vm.paddingInlineStyles,
                          },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.singleItemGraduatedBasePrice",
                                  { price: price.basePrice }
                                )
                              )
                            ),
                          ]
                        )
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _vm.showBasePrice
                    ? _c(
                        "tr",
                        { staticClass: "graduated-base-price d-xl-none" },
                        [
                          _c("td", {
                            class: _vm.paddingClasses,
                            style: _vm.paddingInlineStyles,
                          }),
                          _vm._v(" "),
                          _c(
                            "td",
                            {
                              class: _vm.paddingClasses,
                              style: _vm.paddingInlineStyles,
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.singleItemGraduatedBasePrice",
                                    { price: price.basePrice }
                                  )
                                )
                              ),
                            ]
                          ),
                        ]
                      )
                    : _vm._e(),
                ]
              }),
            ],
            2
          ),
        ]),
        _vm._v(" "),
        _c("br"),
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-31.js.map