"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[39],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetPrice.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetPrice.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "set-price",
  props: {
    showCrossPrice: {
      type: Boolean,
      default: true
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
    variationTotalPrice: function variationTotalPrice() {
      return this.$store.getters["".concat(this.itemId, "/variationTotalPrice")];
    },
    setNoRebatePrice: function setNoRebatePrice() {
      if (this.isSet) {
        if (this.isSetLoading) {
          return this.variationTotalPrice / (100 - this.currentVariation.item.rebate) * 100;
        } else {
          return this.variationTotalPrice;
        }
      }
      return null;
    },
    variationSetRebatePrice: function variationSetRebatePrice() {
      if (this.isSetLoading) {
        return this.variationTotalPrice;
      } else {
        return this.variationTotalPrice * (1 - this.currentVariation.item.rebate / 100);
      }
    },
    isVariationSelected: function isVariationSelected() {
      if (this.isSet) {
        return this.$store.getters["itemSetAllVariationSelected"];
      } else {
        return this.$store.state.items[this.itemId].variationSelect.isVariationSelected;
      }
    },
    isSet: function isSet() {
      return this.currentVariation.item.itemType === "set" || App.isShopBuilder && this.currentVariation.item.itemType !== undefined;
    },
    isSetLoading: function isSetLoading() {
      return this.$store.state.items.isSetLoading;
    },
    dynamicPrice: function dynamicPrice() {
      return this.isSet ? this.variationSetRebatePrice : this.variationTotalPrice;
    },
    dynamicTranslationKey: function dynamicTranslationKey() {
      return this.isSet ? "dynamicSetPrice" : "dynamicSetComponentPrice";
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetPrice.vue?vue&type=template&id=26f10c3e&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetPrice.vue?vue&type=template&id=26f10c3e& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "has-crossprice"
  }, [_vm.showCrossPrice && _vm.isSet && this.currentVariation.item.rebate > 0 ? _c("div", {
    staticClass: "crossprice"
  }, [_c("del", {
    staticClass: "text-muted small text-appearance"
  }, [_vm._v("\n            " + _vm._s(_vm._f("itemCrossPrice")(_vm._f("currency")(_vm.setNoRebatePrice, _vm.currentVariation.prices.set.currency))) + "\n        ")])]) : _vm._e(), _vm._v(" "), _c("span", {
    staticClass: "price h1"
  }, [_c("span", [!_vm.isVariationSelected || _vm.isSetLoading ? [_vm._v("\n                " + _vm._s(_vm.$translate("Ceres::Template." + _vm.dynamicTranslationKey, {
    price: _vm.$options.filters.currency(_vm.dynamicPrice, _vm.currentVariation.prices.set.currency)
  })) + "\n            ")] : [_vm._v("\n                " + _vm._s(_vm._f("currency")(_vm.dynamicPrice, _vm.currentVariation.prices.set.currency)) + "\n            ")]], 2), _vm._v(" "), _c("sup", [_vm._v(_vm._s(_vm.$translate("Ceres::Template.singleItemFootnote1")))])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/src/app/components/item/SetPrice.vue":
/*!***********************************************************!*\
  !*** ./resources/js/src/app/components/item/SetPrice.vue ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SetPrice_vue_vue_type_template_id_26f10c3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetPrice.vue?vue&type=template&id=26f10c3e& */ "./resources/js/src/app/components/item/SetPrice.vue?vue&type=template&id=26f10c3e&");
/* harmony import */ var _SetPrice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SetPrice.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/SetPrice.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SetPrice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SetPrice_vue_vue_type_template_id_26f10c3e___WEBPACK_IMPORTED_MODULE_0__.render,
  _SetPrice_vue_vue_type_template_id_26f10c3e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/SetPrice.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/SetPrice.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SetPrice.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_SetPrice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SetPrice.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetPrice.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_SetPrice_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/SetPrice.vue?vue&type=template&id=26f10c3e&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SetPrice.vue?vue&type=template&id=26f10c3e& ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SetPrice_vue_vue_type_template_id_26f10c3e___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SetPrice_vue_vue_type_template_id_26f10c3e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SetPrice_vue_vue_type_template_id_26f10c3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SetPrice.vue?vue&type=template&id=26f10c3e& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetPrice.vue?vue&type=template&id=26f10c3e&");


/***/ })

}]);
//# sourceMappingURL=ceres-39.js.map