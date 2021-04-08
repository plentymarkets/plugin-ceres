(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemPrice.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemPrice.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
  name: "item-price",
  props: {
    showCrossPrice: {
      type: Boolean,
      default: true
    }
  },
  inject: {
    itemId: {
      default: null
    }
  },
  computed: {
    currentVariation: function currentVariation() {
      return this.$store.getters["".concat(this.itemId, "/currentItemVariation")];
    },
    hasCrossPrice: function hasCrossPrice() {
      var hasRrpPrice = !!this.currentVariation.prices.rrp && this.currentVariation.prices.rrp.unitPrice.value > this.currentVariation.prices.default.unitPrice.value;
      var hasBeforePrice = this.hasSpecialOffer && !!this.currentVariation.prices.default && this.currentVariation.prices.default.unitPrice.value > this.currentVariation.prices.specialOffer.unitPrice.value;
      return hasRrpPrice || hasBeforePrice;
    },
    hasSpecialOffer: function hasSpecialOffer() {
      return !!this.currentVariation.prices.specialOffer;
    },
    variationGraduatedPrice: function variationGraduatedPrice() {
      return this.$store.getters["".concat(this.itemId, "/variationGraduatedPrice")];
    },
    variationTotalPrice: function variationTotalPrice() {
      return this.$store.getters["".concat(this.itemId, "/variationTotalPrice")];
    },
    showDynamicPrice: function showDynamicPrice() {
      var state = this.$store.state.items[this.itemId];
      return App.config.item.showPleaseSelect && App.isCheapestSorting && state.variationSelect && !state.variationSelect.isVariationSelected && (state.pleaseSelectVariationId === this.currentVariation.variation.id || state.pleaseSelectVariationId === 0);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemPrice.vue?vue&type=template&id=27592de8&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemPrice.vue?vue&type=template&id=27592de8& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { class: { "has-crossprice": _vm.hasCrossPrice } }, [
    _vm.showCrossPrice && _vm.hasCrossPrice
      ? _c(
          "div",
          {
            staticClass: "crossprice",
            class: { "is-special-offer": _vm.hasSpecialOffer }
          },
          [
            _c(
              "del",
              { staticClass: "text-muted small text-appearance" },
              [
                _vm.hasSpecialOffer
                  ? [
                      _vm._v(
                        "\n                " +
                          _vm._s(
                            _vm._f("itemCrossPrice")(
                              _vm.currentVariation.prices.default.unitPrice
                                .formatted,
                              true
                            )
                          ) +
                          "\n            "
                      )
                    ]
                  : [
                      _vm._v(
                        "\n                " +
                          _vm._s(
                            _vm._f("itemCrossPrice")(
                              _vm.currentVariation.prices.rrp.unitPrice
                                .formatted
                            )
                          ) +
                          "\n            "
                      )
                    ]
              ],
              2
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "span",
      {
        staticClass: "price h1",
        class: { "is-special-offer": _vm.hasSpecialOffer }
      },
      [
        _c(
          "span",
          [
            _vm.showDynamicPrice
              ? [
                  _vm._v(
                    "\n                " +
                      _vm._s(
                        _vm.$translate(
                          "Ceres::Template.dynamicVariationPrice",
                          {
                            price: _vm.$options.filters.currency(
                              _vm.variationTotalPrice,
                              _vm.currentVariation.prices.default.currency
                            )
                          }
                        )
                      ) +
                      "\n            "
                  )
                ]
              : [
                  _vm._v(
                    "\n                " +
                      _vm._s(
                        _vm._f("currency")(
                          _vm.variationTotalPrice,
                          _vm.currentVariation.prices.default.currency
                        )
                      ) +
                      "\n            "
                  )
                ]
          ],
          2
        ),
        _vm._v(" "),
        _c("sup", [_vm._v("*")])
      ]
    ),
    _vm._v(" "),
    _vm.currentVariation.unit
      ? _c(
          "div",
          {
            staticClass: "base-price text-muted my-3",
            class: {
              "is-single-piece":
                _vm.currentVariation.unit &&
                _vm.currentVariation.unit.content === 1 &&
                _vm.currentVariation.unit.unitOfMeasurement === "C62"
            }
          },
          [
            _c("div", [
              _vm._v(
                "\n            " +
                  _vm._s(_vm.$translate("Ceres::Template.singleItemContent")) +
                  "\n            "
              ),
              _c("span", [
                _vm._v(
                  _vm._s(
                    _vm._f("numberFormat")(_vm.currentVariation.unit.content)
                  ) + " "
                )
              ]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.currentVariation.unit.names.name))])
            ]),
            _vm._v(" "),
            _vm.currentVariation.variation.mayShowUnitPrice
              ? _c("div", [
                  _vm._v(
                    "\n            " +
                      _vm._s(
                        _vm.$translate("Ceres::Template.singleItemUnitPrice")
                      ) +
                      "\n            "
                  ),
                  _c("span", { staticClass: "base-price-value" }, [
                    _vm._v(
                      "\n                " +
                        _vm._s(
                          _vm._f("specialOffer")(
                            _vm.variationGraduatedPrice.basePrice,
                            _vm.currentVariation.prices,
                            "basePrice"
                          )
                        ) +
                        "\n            "
                    )
                  ])
                ])
              : _vm._e()
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemPrice.vue":
/*!************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemPrice.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemPrice_vue_vue_type_template_id_27592de8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemPrice.vue?vue&type=template&id=27592de8& */ "./resources/js/src/app/components/item/ItemPrice.vue?vue&type=template&id=27592de8&");
/* harmony import */ var _ItemPrice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemPrice.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemPrice.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemPrice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemPrice_vue_vue_type_template_id_27592de8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemPrice_vue_vue_type_template_id_27592de8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemPrice.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemPrice.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemPrice.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPrice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemPrice.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemPrice.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPrice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemPrice.vue?vue&type=template&id=27592de8&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemPrice.vue?vue&type=template&id=27592de8& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPrice_vue_vue_type_template_id_27592de8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemPrice.vue?vue&type=template&id=27592de8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemPrice.vue?vue&type=template&id=27592de8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPrice_vue_vue_type_template_id_27592de8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemPrice_vue_vue_type_template_id_27592de8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-34.js.map