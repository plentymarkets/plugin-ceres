"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[40],{

/***/ "./resources/js/src/app/components/item/SetQuantityInput.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/app/components/item/SetQuantityInput.vue ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SetQuantityInput_vue_vue_type_template_id_836bc0d2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetQuantityInput.vue?vue&type=template&id=836bc0d2& */ "./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=template&id=836bc0d2&");
/* harmony import */ var _SetQuantityInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SetQuantityInput.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SetQuantityInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SetQuantityInput_vue_vue_type_template_id_836bc0d2___WEBPACK_IMPORTED_MODULE_0__.render,
  _SetQuantityInput_vue_vue_type_template_id_836bc0d2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/SetQuantityInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "set-quantity-input",

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        setComponentConfig()
        {
            const itemSetId = this.$store.state.items.itemSetId;

            const setComponents = this.$store.getters[`${itemSetId}/currentItemVariation`].setComponents;

            if(App.isShopBuilder)
            {
                return setComponents[0];
            }
            else
            {
                return setComponents.find(setComponent => setComponent.itemId === this.itemId);
            }
        },

        currentVariation()
        {
            return this.$store.getters[`${this.itemId}/currentItemVariation`];
        },

        isLoading()
        {
            return this.$store.state.items.isAddToBasketLoading === this.currentVariation.variation.id || this.$store.state.items.isSetLoading;
        },

        isSalable()
        {
            return !!this.currentVariation.filter && this.currentVariation.filter.isSalable;
        },

        currentQuantity:
        {
            get()
            {
                return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variationOrderQuantity;
            },

            set(quantity)
            {
                this.$store.commit(`${this.itemId}/setVariationOrderQuantity`, quantity);
            }
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_SetQuantityInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SetQuantityInput.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_SetQuantityInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=template&id=836bc0d2&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=template&id=836bc0d2& ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SetQuantityInput_vue_vue_type_template_id_836bc0d2___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SetQuantityInput_vue_vue_type_template_id_836bc0d2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SetQuantityInput_vue_vue_type_template_id_836bc0d2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SetQuantityInput.vue?vue&type=template&id=836bc0d2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=template&id=836bc0d2&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=template&id=836bc0d2&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/SetQuantityInput.vue?vue&type=template&id=836bc0d2& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("quantity-input", {
    staticClass: "widget-alignment qty-set",
    attrs: {
      value: _vm.currentQuantity,
      min: _vm.setComponentConfig.minimumOrderQuantity,
      max: _vm.setComponentConfig.maximumOrderQuantity,
      "variation-id": _vm.currentVariation.variation.id,
      waiting:
        !_vm.setComponentConfig.orderQuantityPossible ||
        _vm.isLoading ||
        !_vm.isSalable,
      "use-appearance": true,
    },
    on: {
      "quantity-change": function ($event) {
        _vm.currentQuantity = $event
      },
    },
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-40.js.map