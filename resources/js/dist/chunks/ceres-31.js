(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.some */ "./node_modules/core-js/modules/es.array.some.js");
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");

//
//
//
//
//
//
//
//
//
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
  name: "item-data-table",
  props: {
    paddingClasses: {
      type: String,
      default: null
    },
    paddingInlineStyles: {
      type: String,
      default: null
    },
    itemInformation: {
      type: Array,
      default: function _default() {
        return [];
      }
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
    }
  },
  data: function data() {
    return {
      translationMap: {
        "item.id": "singleItemId",
        "item.condition.names.name": "singleItemCondition",
        "item.ageRestriction": "singleItemAge",
        "variation.externalId": "singleItemExternalVariationId",
        "variation.model": "singleItemModel",
        "item.manufacturer.externalName": "singleItemManufacturer",
        "item.producingCountry.names.name": "singleItemManufacturingCountry",
        "unit.names.name": "singleItemContent",
        "variation.weightG": "singleItemWeight",
        "variation.weightNetG": "singleItemNetWeight",
        "item.variationDimensions": "singleItemDimensions",
        "variation.customsTariffNumber": "singleItemCustomsTariffNumber"
      },
      formatMap: {
        "item.ageRestriction": {
          type: "filter",
          value: "ageRestriction"
        },
        "variation.weightG": {
          type: "text",
          value: " g"
        },
        "variation.weightNetG": {
          type: "text",
          value: " g"
        }
      }
    };
  },
  methods: {
    isCheckedAndNotEmpty: function isCheckedAndNotEmpty(path) {
      var _this = this;

      if (path === "item.ageRestriction") {
        // remove check for the age restriction to be greater than zero (0 means 'No age restriction')
        return true;
      }

      if (path !== "item.variationDimensions") {
        var value = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.currentVariation, path);
        return value !== "" && value !== 0;
      } else {
        return ["variation.lengthMM", "variation.widthMM", "variation.heightMM"].some(function (element) {
          var value = _this.getFieldValue(element);

          return !Object(_helper_utils__WEBPACK_IMPORTED_MODULE_2__["isNullOrUndefined"])(value) && value !== 0;
        });
      }
    },
    getTranslation: function getTranslation(path) {
      return this.$translate("Ceres::Template." + this.translationMap[path]);
    },
    getFieldValue: function getFieldValue(path) {
      var value;

      if (path === "item.variationDimensions") {
        value = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.currentVariation, "variation.lengthMM") + "×" + lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.currentVariation, "variation.widthMM") + "×" + lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.currentVariation, "variation.heightMM") + "mm";
      } else if (path === "unit.names.name") {
        value = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.currentVariation, "unit.content") + " " + lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.currentVariation, "unit.names.name");
      } else {
        value = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.currentVariation, path);
      }

      return this.formatFieldData(value, path);
    },
    formatFieldData: function formatFieldData(value, path) {
      var format = this.formatMap[path];

      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(format)) {
        switch (format.type) {
          case "text":
            return value + format.value;

          case "filter":
            var filterMethod = lodash_get__WEBPACK_IMPORTED_MODULE_1___default()(this.$options.filters, format.value);
            return Object(_helper_utils__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(filterMethod) ? filterMethod(value) : value;
        }
      }

      return value;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=template&id=7100e9f2&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=template&id=7100e9f2& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
    "table",
    { staticClass: "table table-striped table-hover table-sm" },
    [
      _c(
        "tbody",
        [
          _vm._l(_vm.itemInformation, function(itemDataAccessor) {
            return [
              _vm.isCheckedAndNotEmpty(itemDataAccessor)
                ? _c("tr", [
                    _c(
                      "td",
                      {
                        class: _vm.paddingClasses,
                        style: _vm.paddingInlineStyles
                      },
                      [
                        _vm._v(
                          "\n                " +
                            _vm._s(_vm.getTranslation(itemDataAccessor)) +
                            "\n            "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      {
                        class: _vm.paddingClasses,
                        style: _vm.paddingInlineStyles
                      },
                      [
                        _vm._v(
                          "\n                " +
                            _vm._s(_vm.getFieldValue(itemDataAccessor)) +
                            "\n            "
                        )
                      ]
                    )
                  ])
                : _vm._e()
            ]
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemDataTable.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemDataTable.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemDataTable_vue_vue_type_template_id_7100e9f2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemDataTable.vue?vue&type=template&id=7100e9f2& */ "./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=template&id=7100e9f2&");
/* harmony import */ var _ItemDataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemDataTable.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemDataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemDataTable_vue_vue_type_template_id_7100e9f2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemDataTable_vue_vue_type_template_id_7100e9f2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemDataTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemDataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemDataTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemDataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=template&id=7100e9f2&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=template&id=7100e9f2& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemDataTable_vue_vue_type_template_id_7100e9f2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemDataTable.vue?vue&type=template&id=7100e9f2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemDataTable.vue?vue&type=template&id=7100e9f2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemDataTable_vue_vue_type_template_id_7100e9f2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemDataTable_vue_vue_type_template_id_7100e9f2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-31.js.map