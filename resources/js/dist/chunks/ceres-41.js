(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[41],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "guarantee-label-widget",
  props: {
    collapseId: String,
    customClass: {
      type: String,
      default: ""
    },
    spacingClasses: {
      type: String,
      default: ""
    },
    inlineSpacings: {
      type: String,
      default: ""
    },
    badgeAltText: {
      type: String,
      default: ""
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
    brandValue: function brandValue() {
      var _this$currentVariatio, _this$currentVariatio2, _this$currentVariatio3;

      return ((_this$currentVariatio = this.currentVariation) === null || _this$currentVariatio === void 0 ? void 0 : (_this$currentVariatio2 = _this$currentVariatio.item) === null || _this$currentVariatio2 === void 0 ? void 0 : (_this$currentVariatio3 = _this$currentVariatio2.manufacturer) === null || _this$currentVariatio3 === void 0 ? void 0 : _this$currentVariatio3.externalName) || "";
    },
    modelValue: function modelValue() {
      var _this$currentVariatio4, _this$currentVariatio5;

      return ((_this$currentVariatio4 = this.currentVariation) === null || _this$currentVariatio4 === void 0 ? void 0 : (_this$currentVariatio5 = _this$currentVariatio4.variation) === null || _this$currentVariatio5 === void 0 ? void 0 : _this$currentVariatio5.model) || "";
    },
    durabilityYears: function durabilityYears() {
      var _this$currentVariatio6, _this$currentVariatio7;

      return ((_this$currentVariatio6 = this.currentVariation) === null || _this$currentVariatio6 === void 0 ? void 0 : (_this$currentVariatio7 = _this$currentVariatio6.variation) === null || _this$currentVariatio7 === void 0 ? void 0 : _this$currentVariatio7.durabilityYears) || "";
    },
    isVisible: function isVisible() {
      return this.brandValue.length > 0 && this.modelValue.length > 0 && String(this.durabilityYears).length > 0;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=template&id=bb2189ec&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=template&id=bb2189ec& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
  return _vm.isVisible
    ? _c(
        "div",
        {
          class: [
            "widget",
            "widget-guarantee-label",
            _vm.customClass,
            _vm.spacingClasses
          ],
          style: _vm.inlineSpacings
        },
        [
          _c(
            "button",
            {
              staticClass:
                "guarantee-badge-toggle btn-collapse p-0 border-0 bg-transparent collapsed",
              attrs: {
                type: "button",
                "data-toggle": "collapse",
                "data-target": "#" + _vm.collapseId,
                "aria-expanded": "false",
                "aria-controls": _vm.collapseId,
                "aria-label": _vm.badgeAltText
              }
            },
            [
              _c("guarantee-badge", {
                attrs: { guarantee: _vm.durabilityYears }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "collapse guarantee-label-collapse",
              attrs: { id: _vm.collapseId }
            },
            [
              _c("guarantee-label-full", {
                attrs: {
                  guarantee: _vm.durabilityYears,
                  brand: _vm.brandValue,
                  model: _vm.modelValue
                }
              })
            ],
            1
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/GuaranteeLabelWidget.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/app/components/item/GuaranteeLabelWidget.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GuaranteeLabelWidget_vue_vue_type_template_id_bb2189ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuaranteeLabelWidget.vue?vue&type=template&id=bb2189ec& */ "./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=template&id=bb2189ec&");
/* harmony import */ var _GuaranteeLabelWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuaranteeLabelWidget.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GuaranteeLabelWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GuaranteeLabelWidget_vue_vue_type_template_id_bb2189ec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GuaranteeLabelWidget_vue_vue_type_template_id_bb2189ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/GuaranteeLabelWidget.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuaranteeLabelWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./GuaranteeLabelWidget.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_GuaranteeLabelWidget_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=template&id=bb2189ec&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=template&id=bb2189ec& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuaranteeLabelWidget_vue_vue_type_template_id_bb2189ec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./GuaranteeLabelWidget.vue?vue&type=template&id=bb2189ec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/GuaranteeLabelWidget.vue?vue&type=template&id=bb2189ec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuaranteeLabelWidget_vue_vue_type_template_id_bb2189ec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuaranteeLabelWidget_vue_vue_type_template_id_bb2189ec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-41.js.map