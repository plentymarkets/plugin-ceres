(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[39],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
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
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "item-manufacturer-data-list",
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
          return _c("div", { key: index }, [
            component.concatenatedNames
              ? _c("b", [_vm._v(_vm._s(component.concatenatedNames))])
              : _vm._e(),
            _vm._v(" "),
            component.manufacturer.name
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [_vm._v(_vm._s(component.manufacturer.name))])
                ])
              : component.manufacturer.externalName
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [
                    _vm._v(_vm._s(component.manufacturer.externalName))
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(component.manufacturer.legalName))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(component.manufacturer.street))]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(component.manufacturer.houseNo))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(component.manufacturer.postcode))]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(component.manufacturer.town))]),
              _vm._v(" "),
              component.manufacturer.countryObject
                ? _c("span", [
                    _vm._v(
                      "\n              " +
                        _vm._s(component.manufacturer.countryObject.name) +
                        "\n            "
                    )
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(component.manufacturer.email))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(component.manufacturer.url))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(component.manufacturer.phoneNumber))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(component.manufacturer.faxNumber))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(component.manufacturer.contactUrl))])
            ]),
            _vm._v(" "),
            _c("hr")
          ])
        }),
        0
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturerDataList.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemManufacturerDataList.vue?vue&type=template&id=c4011134& */ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134&");
/* harmony import */ var _ItemManufacturerDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemManufacturerDataList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemManufacturerDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemManufacturerDataList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturerDataList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturerDataList.vue?vue&type=template&id=c4011134& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-39.js.map