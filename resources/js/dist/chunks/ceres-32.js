"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[32],{

/***/ "./resources/js/src/app/components/item/ItemAvailability.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemAvailability.vue ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemAvailability_vue_vue_type_template_id_3f09aa68___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemAvailability.vue?vue&type=template&id=3f09aa68& */ "./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=template&id=3f09aa68&");
/* harmony import */ var _ItemAvailability_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemAvailability.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemAvailability_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemAvailability_vue_vue_type_template_id_3f09aa68___WEBPACK_IMPORTED_MODULE_0__.render,
  _ItemAvailability_vue_vue_type_template_id_3f09aa68___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemAvailability.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=script&lang=js& ***!
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "item-availability",

    props: {
        paddingClasses: String,
        paddingStyles: String
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        availability() {
            const currentVariation = this.$store.getters[`${this.itemId}/currentItemVariation`];
            return currentVariation && currentVariation.variation && currentVariation.variation.availability;
        },

        classes() {
            return [
                "availability",
                "badge",
                "availability-" + (this.availability && this.availability.id),
                this.paddingClasses
            ];
        },

        name() {
            return this.availability && this.availability.names && this.availability.names.name;
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ItemAvailability_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemAvailability.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemAvailability_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=template&id=3f09aa68&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=template&id=3f09aa68& ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemAvailability_vue_vue_type_template_id_3f09aa68___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemAvailability_vue_vue_type_template_id_3f09aa68___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemAvailability_vue_vue_type_template_id_3f09aa68___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemAvailability.vue?vue&type=template&id=3f09aa68& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=template&id=3f09aa68&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=template&id=3f09aa68&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/ItemAvailability.vue?vue&type=template&id=3f09aa68& ***!
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
  return _vm.availability
    ? _c("span", { class: _vm.classes, style: _vm.paddingStyles }, [
        _c("span", [_vm._v("\n        " + _vm._s(_vm.name) + "\n    ")]),
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-32.js.map