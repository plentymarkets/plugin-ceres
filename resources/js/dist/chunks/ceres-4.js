"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed.js */ "./node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");





/* harmony default export */ __webpack_exports__["default"] = ({
  name: "item-store-special",
  props: ["storeSpecial", "recommendedRetailPrice", "variationRetailPrice", "specialOfferPrice", "decimalCount", "bundleType", "itemType"],
  data: function data() {
    return {
      tagClass: "",
      label: "",
      tagClasses: {
        1: "badge-offer badge-danger",
        2: "badge-new badge-primary",
        3: "badge-top badge-success",
        default: "badge-success",
        itemBundle: "badge badge-bundle bg-info",
        itemSet: "badge badge-dark"
      },
      labels: {
        1: this.$translate("Ceres::Template.storeSpecialOffer"),
        2: this.$translate("Ceres::Template.storeSpecialNew"),
        3: this.$translate("Ceres::Template.storeSpecialTop")
      }
    };
  },
  computed: {
    hasLabel: function hasLabel() {
      return this.label && this.label !== "";
    },
    isBundle: function isBundle() {
      return this.bundleType === "bundle";
    },
    isSet: function isSet() {
      return this.itemType === "set";
    }
  },
  created: function created() {
    this.initializeStoreSpecial();
  },
  methods: {
    initializeStoreSpecial: function initializeStoreSpecial() {
      if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_4__.isNullOrUndefined)(this.storeSpecial)) {
        this.tagClass = this.tagClasses[this.storeSpecial.id] || this.tagClasses.default;
      } else {
        this.tagClass = this.tagClasses.default;
      }
      this.label = this.getLabel();
    },
    getLabel: function getLabel() {
      if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_4__.isNullOrUndefined)(this.storeSpecial) && this.storeSpecial.id === 1 && !(0,_helper_utils__WEBPACK_IMPORTED_MODULE_4__.isNullOrUndefined)(this.recommendedRetailPrice)) {
        return this.getPercentageSale();
      }
      if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_4__.isNullOrUndefined)(this.storeSpecial)) {
        return "";
      }
      return this.labels[this.storeSpecial.id] || this.storeSpecial.names.name;
    },
    getPercentageSale: function getPercentageSale() {
      var percent;
      if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_4__.isDefined)(this.specialOfferPrice)) {
        percent = (1 - this.specialOfferPrice.unitPrice.value / this.variationRetailPrice.unitPrice.value) * -100;
      } else {
        percent = (1 - this.variationRetailPrice.unitPrice.value / this.recommendedRetailPrice.unitPrice.value) * -100;
      }
      if (percent < 0) {
        return percent.toFixed(this.decimalCount).replace(".", App.decimalSeparator) + "%";
      }
      return "";
    }
  },
  watch: {
    storeSpecial: function storeSpecial() {
      this.initializeStoreSpecial();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.hasLabel || _vm.isBundle || _vm.isSet ? _c("div", {
    staticClass: "special-tags p-2"
  }, [_vm.hasLabel ? _c("span", {
    staticClass: "badge",
    class: _vm.tagClass
  }, [_vm._v("\n        " + _vm._s(_vm.label) + "\n    ")]) : _vm.isBundle ? _c("span", {
    class: _vm.tagClasses.itemBundle
  }, [_vm._v("\n        " + _vm._s(_vm.$translate("Ceres::Template.itemBundle")) + "\n    ")]) : _vm.isSet ? _c("span", {
    class: _vm.tagClasses.itemSet
  }, [_vm._v("\n        " + _vm._s(_vm.$translate("Ceres::Template.itemSet")) + "\n    ")]) : _vm._e()]) : _vm._e();
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/ItemStoreSpecial.vue ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& */ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&");
/* harmony import */ var _ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemStoreSpecial.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__.render,
  _ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/itemList/ItemStoreSpecial.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemStoreSpecial.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemStoreSpecial_vue_vue_type_template_id_9410a8b2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemStoreSpecial.vue?vue&type=template&id=9410a8b2& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/ItemStoreSpecial.vue?vue&type=template&id=9410a8b2&");


/***/ })

}]);
//# sourceMappingURL=ceres-4.js.map