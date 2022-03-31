(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var _OrderPropertyValueListItem_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./OrderPropertyValueListItem.vue */ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue");




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
  name: "order-property-value-list",
  components: {
    OrderPropertyValueListItem: _OrderPropertyValueListItem_vue__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  props: {
    basketItem: {
      required: true,
      type: Object
    }
  },
  computed: {
    shownProperties: function shownProperties() {
      var _this = this;

      var shownProperties = [];
      this.basketItem.variation.data.properties.forEach(function (property) {
        var filledProperty = _this.basketItem.basketItemOrderParams.find(function (prop) {
          return parseInt(prop.propertyId) === property.propertyId;
        });

        if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(filledProperty)) {
          if (filledProperty.type === "selection") {
            property.property.value = property.property.selectionValues[filledProperty.value].name;
          } else {
            property.property.value = filledProperty.value;
          }
        }

        if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_4__["isDefined"])(filledProperty) || _this.isPropertyWithAdditionalCosts(property)) {
          shownProperties.push(property);
        }
      });
      return shownProperties;
    }
  },
  methods: {
    isPropertyWithAdditionalCosts: function isPropertyWithAdditionalCosts(property) {
      return property.property && property.property.isShownAtCheckout && property.property.isShownAsAdditionalCosts && !property.property.isOderProperty;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "order-property-value-list-item",
  props: {
    property: {
      required: true,
      type: Object
    }
  },
  computed: {
    surcharge: function surcharge() {
      return this.$options.filters.propertySurcharge([this.property], this.property.propertyId);
    },
    isAdditionalCosts: function isAdditionalCosts() {
      var _this$property;

      var property = (_this$property = this.property) === null || _this$property === void 0 ? void 0 : _this$property.property;
      return property && property.isShownAsAdditionalCosts && property.isShownAtCheckout && (!property.isOderProperty && !App.useVariationOrderProperties || property.isOderProperty && App.useVariationOrderProperties);
    },
    isTaxless: function isTaxless() {
      var hasVat = this.property.property.vatId !== 'none' && this.property.property.vatId !== null;
      return !hasVat && this.property.property.isOderProperty && App.useVariationOrderProperties;
    },
    showColon: function showColon() {
      return this.property && this.property.property.value && this.property.property.valueType !== "empty";
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
  return _vm.shownProperties && _vm.shownProperties.length
    ? _c("div", { staticClass: "small" }, [
        _c("div", { staticClass: "font-weight-bold my-1" }, [
          _vm._v(
            _vm._s(_vm.$translate("Ceres::Template.basketAdditionalCosts")) +
              ":"
          )
        ]),
        _vm._v(" "),
        _c(
          "ul",
          { staticClass: "ml-1 pl-3" },
          _vm._l(_vm.shownProperties, function(property) {
            return _c("order-property-value-list-item", {
              key: property.propertyId,
              attrs: { property: property }
            })
          }),
          1
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
  return _c("li", [
    _c("span", { staticClass: "d-block" }, [
      _c(
        "strong",
        { class: { colon: _vm.showColon } },
        [
          _vm._v(
            "\n            " +
              _vm._s(_vm.property.property.names.name) +
              " \n            "
          ),
          _vm.surcharge > 0
            ? [
                _vm.isAdditionalCosts || _vm.isTaxless
                  ? [
                      _vm._v(
                        "\n                    (" +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketPlusAbbr")
                          ) +
                          " " +
                          _vm._s(_vm._f("currency")(_vm.surcharge)) +
                          ")\n                "
                      )
                    ]
                  : [
                      _vm._v(
                        "\n                    (" +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketIncludeAbbr")
                          ) +
                          " " +
                          _vm._s(_vm._f("currency")(_vm.surcharge)) +
                          ")\n                "
                      )
                    ]
              ]
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c("span", [
        _vm.property.property.valueType === "file"
          ? _c("span", [
              _c(
                "a",
                {
                  attrs: {
                    href: _vm._f("fileUploadPath")(_vm.property.property.value),
                    target: "_blank"
                  }
                },
                [
                  _c("i", {
                    staticClass: "fa fa-external-link",
                    attrs: { "aria-hidden": "true" }
                  }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm._f("fileName")(_vm.property.property.value)) +
                      "\n                "
                  )
                ]
              )
            ])
          : _vm.property.property.valueType !== "empty"
          ? _c("span", [_vm._v(_vm._s(_vm.property.property.value))])
          : _vm._e()
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueList.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueList.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderPropertyValueList.vue?vue&type=template&id=0f3f4786& */ "./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786&");
/* harmony import */ var _OrderPropertyValueList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderPropertyValueList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderPropertyValueList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/OrderPropertyValueList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderPropertyValueList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderPropertyValueList.vue?vue&type=template&id=0f3f4786& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue":
/*!*****************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueListItem.vue ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderPropertyValueListItem.vue?vue&type=template&id=905d838e& */ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e&");
/* harmony import */ var _OrderPropertyValueListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderPropertyValueListItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderPropertyValueListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/OrderPropertyValueListItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderPropertyValueListItem.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./OrderPropertyValueListItem.vue?vue&type=template&id=905d838e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-0.js.map