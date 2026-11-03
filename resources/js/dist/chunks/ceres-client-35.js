(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[35],{

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
    },
    visibleFieldsEu: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  computed: {
    isEuResponsibleTabShown: function isEuResponsibleTabShown() {
      return this.manufacturer.responsibleEmail !== "" || this.manufacturer.responsibleHouseNo !== "" || this.manufacturer.responsibleName !== "" || this.manufacturer.responsiblePhoneNo !== "" || this.manufacturer.responsiblePostCode !== "" || this.manufacturer.responsibleStreet !== "" || this.manufacturer.responsibleTown !== "" || this.manufacturer.responsibleContactUrl !== "" || this.manufacturer.responsibleCountry !== 0;
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
  return _c(
    "div",
    [
      _c("h4", [
        _vm._v(
          _vm._s(_vm.$translate("Ceres::Template.itemEuResponsiblePersonTitle"))
        )
      ]),
      _vm._v(" "),
      _vm.manufacturer && _vm.isEuResponsibleTabShown
        ? [
            _vm.concatenatedNames
              ? _c("div", { staticClass: "mb-2" }, [
                  _c("b", [_vm._v(_vm._s(_vm.concatenatedNames))])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.visibleFieldsEu.includes("EUname")
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleName))])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _vm.visibleFieldsEu.includes("EUstreet")
                ? _c("span", [
                    _vm._v(_vm._s(_vm.manufacturer.responsibleStreet))
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.visibleFieldsEu.includes("EUhouseNr")
                ? _c("span", [
                    _vm._v(_vm._s(_vm.manufacturer.responsibleHouseNo))
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _vm.visibleFieldsEu.includes("EUzipcode")
                ? _c("span", [
                    _vm._v(_vm._s(_vm.manufacturer.responsiblePostCode))
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.visibleFieldsEu.includes("EUcity")
                ? _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleTown))])
                : _vm._e(),
              _vm._v(" "),
              _vm.manufacturer.responsibleCountryObject &&
              _vm.visibleFieldsEu.includes("EUcountry")
                ? _c("span", [
                    _vm._v(
                      "\n        " +
                        _vm._s(_vm.manufacturer.responsibleCountryObject.name) +
                        "\n      "
                    )
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _vm.visibleFieldsEu.includes("EUmail")
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [
                    _vm._v(_vm._s(_vm.manufacturer.responsibleEmail))
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.visibleFieldsEu.includes("EUphone")
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [
                    _vm._v(_vm._s(_vm.manufacturer.responsiblePhoneNo))
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.visibleFieldsEu.includes("EUcontactForm")
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [
                    _vm._v(_vm._s(_vm.manufacturer.responsibleContactUrl))
                  ])
                ])
              : _vm._e()
          ]
        : [
            _vm._v(
              "\n    " +
                _vm._s(
                  _vm.$translate(
                    "Ceres::Template.itemEuResponsibleNoInformation"
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



/***/ })

}]);
//# sourceMappingURL=ceres-client-35.js.map