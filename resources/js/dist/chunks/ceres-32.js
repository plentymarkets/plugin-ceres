"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemBundle.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemBundle.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "item-bundle",
  props: {
    paddingClasses: {
      type: String,
      default: null
    },
    paddingInlineStyles: {
      type: String,
      default: null
    },
    bundleType: String,
    bundleComponents: Array
  },
  computed: {
    showItemBundleItems: function showItemBundleItems() {
      return App.bundleSetting !== 1 && this.bundleType === "bundle";
    }
  },
  methods: {
    getBundleInnerText: function getBundleInnerText(item) {
      item.variation.bundleType = null;
      return item;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemBundle_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemBundle.vue */ "./resources/js/src/app/components/item/ItemBundle.vue");

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "single-item-bundle",
  components: {
    ItemBundle: _ItemBundle_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    isPreview: Boolean,
    paddingClasses: {
      type: String,
      default: null
    },
    paddingInlineStyles: {
      type: String,
      default: null
    }
  },
  inject: {
    itemId: {
      default: null
    }
  },
  computed: {
    bundleType: function bundleType() {
      return this.isPreview ? 'bundle' : this.$store.getters["".concat(this.itemId, "/currentItemVariation")].variation.bundleType;
    },
    bundleComponents: function bundleComponents() {
      return this.$store.getters["".concat(this.itemId, "/currentItemVariation")].bundleComponents;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemBundle.vue?vue&type=template&id=4a0735cf&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemBundle.vue?vue&type=template&id=4a0735cf& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_vm.showItemBundleItems ? _c("div", {
    staticClass: "small font-weight-bold mb-3"
  }, [_c("strong", [_vm._v(_vm._s(_vm.$translate("Ceres::Template.itemBundleContent")))]), _vm._v(" "), _vm._l(_vm.bundleComponents, function (item) {
    return _c("div", {
      class: _vm.paddingClasses,
      style: _vm.paddingInlineStyles
    }, [_c("span", {
      staticClass: "text-muted"
    }, [_vm._v(_vm._s(item.quantity) + " x")]), _vm._v(" "), _c("a", {
      staticClass: "text-appearance",
      attrs: {
        href: _vm._f("itemURL")(item.data)
      }
    }, [_vm._v(" " + _vm._s(_vm._f("itemName")(_vm.getBundleInnerText(item.data))) + " ")])]);
  })], 2) : _c("div", [_vm._t("default")], 2)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=template&id=605aaeb7&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=template&id=605aaeb7& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("item-bundle", {
    attrs: {
      "bundle-type": _vm.bundleType,
      "bundle-components": _vm.bundleComponents,
      "padding-classes": _vm.paddingClasses,
      "padding-inline-styles": _vm.paddingInlineStyles
    }
  }, [_vm.isPreview ? _c("div", {
    staticClass: "widget-placeholder p-0"
  }, [_c("div", [_c("p", {
    staticClass: "title mb-0"
  }, [_vm._v(_vm._s(_vm.$translate("Ceres::Widget.itemBundlePlaceholderTitle")))]), _vm._v(" "), _c("p", {
    staticClass: "description mt-3"
  }, [_vm._v(_vm._s(_vm.$translate("Ceres::Widget.itemBundlePlaceholderDescription")))])])]) : _vm._e()]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/src/app/components/item/ItemBundle.vue":
/*!*************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemBundle.vue ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemBundle_vue_vue_type_template_id_4a0735cf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemBundle.vue?vue&type=template&id=4a0735cf& */ "./resources/js/src/app/components/item/ItemBundle.vue?vue&type=template&id=4a0735cf&");
/* harmony import */ var _ItemBundle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemBundle.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemBundle.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemBundle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemBundle_vue_vue_type_template_id_4a0735cf___WEBPACK_IMPORTED_MODULE_0__.render,
  _ItemBundle_vue_vue_type_template_id_4a0735cf___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemBundle.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/SingleItemBundle.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/app/components/item/SingleItemBundle.vue ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SingleItemBundle_vue_vue_type_template_id_605aaeb7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SingleItemBundle.vue?vue&type=template&id=605aaeb7& */ "./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=template&id=605aaeb7&");
/* harmony import */ var _SingleItemBundle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingleItemBundle.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SingleItemBundle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SingleItemBundle_vue_vue_type_template_id_605aaeb7___WEBPACK_IMPORTED_MODULE_0__.render,
  _SingleItemBundle_vue_vue_type_template_id_605aaeb7___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/SingleItemBundle.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemBundle.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemBundle.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemBundle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemBundle.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemBundle.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemBundle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemBundle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SingleItemBundle.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemBundle_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemBundle.vue?vue&type=template&id=4a0735cf&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemBundle.vue?vue&type=template&id=4a0735cf& ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemBundle_vue_vue_type_template_id_4a0735cf___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemBundle_vue_vue_type_template_id_4a0735cf___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemBundle_vue_vue_type_template_id_4a0735cf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemBundle.vue?vue&type=template&id=4a0735cf& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemBundle.vue?vue&type=template&id=4a0735cf&");


/***/ }),

/***/ "./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=template&id=605aaeb7&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=template&id=605aaeb7& ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemBundle_vue_vue_type_template_id_605aaeb7___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemBundle_vue_vue_type_template_id_605aaeb7___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemBundle_vue_vue_type_template_id_605aaeb7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SingleItemBundle.vue?vue&type=template&id=605aaeb7& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SingleItemBundle.vue?vue&type=template&id=605aaeb7&");


/***/ })

}]);
//# sourceMappingURL=ceres-32.js.map