(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_5__);






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
  name: "biokinder-shipping-icon",
  data: function data() {
    return {
      freightExpress: 'https://cdn.bio-kinder.de/frontend/seals/spedition_sl.svg',
      packageExpress: 'https://cdn.bio-kinder.de/frontend/seals/paket_sl.svg',
      freightStd: 'https://cdn.bio-kinder.de/frontend/seals/truck.svg',
      packageStd: 'https://cdn.bio-kinder.de/frontend/seals/package.svg',
      easterPackage: 'https://cdn.bio-kinder.de/frontend/seals/lieferbar-ostern.svg'
    };
  },
  props: {
    avd: {
      type: Object
    },
    variation: {
      type: Object
    },
    availability: {
      type: Number,
      default: 1
    },
    shipping: {
      float: Object,
      default: 5.95
    },
    countryId: {
      type: Number,
      default: -1
    }
  },
  computed: {
    shippingCosts: function shippingCosts() {
      if (this.shipping !== null) return this.formatFloat(this.shipping) + ' €';else return '0,00 €';
    },
    countryName: function countryName() {
      if (this.countryId < 0) return "...";
      if (this.countryId == 2) return "&Ouml;sterreichs";
      return "Deutschlands";
    },
    shippingIconUrl: function shippingIconUrl() {
      if (this.availability == 1) return this.freightExpress;
      if (this.avd.isSped) return this.freightStd;
      return this.packageStd;
    },
    shippingName: function shippingName() {
      if (this.avd.isSped) return "Spedition";
      return "Paket";
    },
    middleLlistElement: function middleLlistElement() {
      if (this.avd.isSped) return 'Lieferung mit 2-Mann-Spedition bis ins Zimmer';
      return 'CO<sub>2</sub>-neutraler Paketversand';
    }
  },
  methods: {
    formatFloat: function formatFloat(e) {
      return e.toFixed(2).replace(".", ",").toString();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=template&id=797f982c&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=template&id=797f982c& ***!
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
  return _c("div", { staticClass: "descriptionContent row" }, [
    _c("div", { staticClass: "col-4" }, [
      _c("img", {
        staticClass: "openPorto",
        attrs: { src: _vm.shippingIconUrl, alt: _vm.shippingName }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "detail col-8" }, [
      _c("span", [_vm._v("Versand per " + _vm._s(_vm.shippingName))]),
      _vm._v(" "),
      _c("ul", { staticClass: "ship" }, [
        _c("li", {
          domProps: {
            innerHTML: _vm._s(
              _vm.shippingCosts + " innerhalb " + _vm.countryName
            )
          }
        }),
        _vm._v(" "),
        _c(
          "li",
          [
            _c("biokinder-availability", {
              attrs: { short: true, avd: _vm.avd, variation: _vm.variation }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("li", { domProps: { innerHTML: _vm._s(_vm.middleLlistElement) } }),
        _vm._v(" "),
        _c("li", [
          _vm._v("... "),
          _c(
            "a",
            {
              staticClass: "openPorto",
              attrs: {
                "data-toggle": "modal",
                href: "#shippingscosts",
                title: _vm.$translate("Ceres::Template.singleItemShippingCosts")
              }
            },
            [
              _vm._v(
                _vm._s(
                  _vm.$translate(
                    "biokinderDesign::Template.itemMoreInformation"
                  )
                )
              )
            ]
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/BKShippingIcon.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/components/item/BKShippingIcon.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BKShippingIcon_vue_vue_type_template_id_797f982c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BKShippingIcon.vue?vue&type=template&id=797f982c& */ "./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=template&id=797f982c&");
/* harmony import */ var _BKShippingIcon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BKShippingIcon.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BKShippingIcon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BKShippingIcon_vue_vue_type_template_id_797f982c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BKShippingIcon_vue_vue_type_template_id_797f982c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/BKShippingIcon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BKShippingIcon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./BKShippingIcon.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BKShippingIcon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=template&id=797f982c&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=template&id=797f982c& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BKShippingIcon_vue_vue_type_template_id_797f982c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./BKShippingIcon.vue?vue&type=template&id=797f982c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/BKShippingIcon.vue?vue&type=template&id=797f982c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BKShippingIcon_vue_vue_type_template_id_797f982c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BKShippingIcon_vue_vue_type_template_id_797f982c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-32.js.map