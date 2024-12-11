(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js& ***!
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
  name: "EuResponsibleDetails",
  props: {
    manufacturer: {
      type: Object,
      required: true
    },
    concatenatedNames: {
      type: String,
      default: ''
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EuResponsibleDetails.vue */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue");
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
  name: "item-eu-responsible-data-list",
  components: {
    EuResponsibleDetails: _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    itemComponents: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196& ***!
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
  return _c("div", [
    _vm.concatenatedNames
      ? _c("b", [_vm._v(_vm._s(_vm.concatenatedNames))])
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "p-0" }, [
      _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleName))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "p-0" }, [
      _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleStreet))]),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleHouseNo))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "p-0" }, [
      _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsiblePostCode))]),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleTown))]),
      _vm._v(" "),
      _vm.manufacturer.responsibleCountryObject
        ? _c("span", [
            _vm._v(
              "\n      " +
                _vm._s(_vm.manufacturer.responsibleCountryObject.name) +
                "\n    "
            )
          ])
        : _vm._e()
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "p-0" }, [
      _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleEmail))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "p-0" }, [
      _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsiblePhoneNo))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "p-0" }, [
      _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleContactUrl))])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
  return _vm.itemComponents.length > 0
    ? _c(
        "div",
        _vm._l(_vm.itemComponents, function(component, index) {
          return _c(
            "div",
            { key: index },
            [
              component.manufacturer
                ? _c("eu-responsible-details", {
                    attrs: {
                      manufacturer: component.manufacturer,
                      "concatenated-names": component.concatenatedNames
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("hr")
            ],
            1
          )
        }),
        0
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/EuResponsibleDetails.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/app/components/item/EuResponsibleDetails.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EuResponsibleDetails.vue?vue&type=template&id=74bdf196& */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196&");
/* harmony import */ var _EuResponsibleDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EuResponsibleDetails.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EuResponsibleDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/EuResponsibleDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EuResponsibleDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EuResponsibleDetails.vue?vue&type=template&id=74bdf196& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e& */ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e&");
/* harmony import */ var _ItemEuResponsibleDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemEuResponsibleDataList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemEuResponsibleDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemEuResponsibleDataList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemEuResponsibleDataList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-13.js.map