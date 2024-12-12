(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);

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
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "ManufacturerDetails",
  props: {
    manufacturer: {
      type: Object,
      required: true
    },
    concatenatedNames: {
      type: String,
      default: ''
    }
  },
  computed: {
    isManufacturerTabShown: function isManufacturerTabShown() {
      return this.manufacturer.url !== "" || this.manufacturer.street !== "" || this.manufacturer.houseNo !== "" || this.manufacturer.postcode !== "" || this.manufacturer.town !== "" || this.manufacturer.countryId !== 0 || this.manufacturer.phoneNumber !== "" || this.manufacturer.faxNumber !== "" || this.manufacturer.email !== "" || this.manufacturer.legalName !== "" || this.manufacturer.contactUrl !== "" || this.manufacturer.name !== "" || this.manufacturer.externalName !== "";
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
    [
      _c("h4", [
        _vm._v(
          _vm._s(_vm.$translate("Ceres::Template.itemManufacturerDetailsTitle"))
        )
      ]),
      _vm._v(" "),
      _vm.manufacturer && _vm.isManufacturerTabShown
        ? [
            _vm.concatenatedNames
              ? _c("div", { staticClass: "mb-2" }, [
                  _c("b", [_vm._v(_vm._s(_vm.concatenatedNames))])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.manufacturer.name
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [_vm._v(_vm._s(_vm.manufacturer.name))])
                ])
              : _vm.manufacturer.externalName
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [_vm._v(_vm._s(_vm.manufacturer.externalName))])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.legalName))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.street))]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.houseNo))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.postcode))]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.town))]),
              _vm._v(" "),
              _vm.manufacturer.countryObject
                ? _c("span", [
                    _vm._v(_vm._s(_vm.manufacturer.countryObject.name))
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.email))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.url))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.phoneNumber))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.faxNumber))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.contactUrl))])
            ])
          ]
        : [
            _vm._v(
              "\n    " +
                _vm._s(
                  _vm.$translate(
                    "Ceres::Template.itemManufacturerNoInformation"
                  )
                ) +
                "\n  "
            )
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/ManufacturerDetails.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/src/app/components/item/ManufacturerDetails.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManufacturerDetails.vue?vue&type=template&id=145dfd47& */ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47&");
/* harmony import */ var _ManufacturerDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManufacturerDetails.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ManufacturerDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ManufacturerDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManufacturerDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManufacturerDetails.vue?vue&type=template&id=145dfd47& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-42.js.map