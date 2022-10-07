"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[54],{

/***/ "./resources/js/src/app/components/common/BackgroundImg.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/app/components/common/BackgroundImg.vue ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BackgroundImg_vue_vue_type_template_id_0570c6a3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackgroundImg.vue?vue&type=template&id=0570c6a3& */ "./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=template&id=0570c6a3&");
/* harmony import */ var _BackgroundImg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BackgroundImg.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BackgroundImg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BackgroundImg_vue_vue_type_template_id_0570c6a3___WEBPACK_IMPORTED_MODULE_0__.render,
  _BackgroundImg_vue_vue_type_template_id_0570c6a3___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/common/BackgroundImg.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_featureDetect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/featureDetect */ "./resources/js/src/app/helper/featureDetect.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    props:
    {
        url: "",
        fallbackUrl: "",
        pictureClass: ""
    },
    data(){
        return {
            supported: undefined
        }
    },
    beforeMount()
    {
        (0,_helper_featureDetect__WEBPACK_IMPORTED_MODULE_0__.detectWebP)(((supported) =>
        {
            this.supported = supported;
        }));
    },
    computed: {
        /**
         *  Determine appropriate image url to use as background source
         */
        backgroundSource() {
            if (!this.url)
            {
                return null;
            }
            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.isDefined)(this.supported))
            {
                if (!this.supported && this.fallbackUrl?.length) {
                    return { backgroundImage: 'url(' + this.fallbackUrl + ')' };
                }
            }
            return { backgroundImage: 'url(' + this.url + ')' };
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundImg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundImg.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundImg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=template&id=0570c6a3&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=template&id=0570c6a3& ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundImg_vue_vue_type_template_id_0570c6a3___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundImg_vue_vue_type_template_id_0570c6a3___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BackgroundImg_vue_vue_type_template_id_0570c6a3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BackgroundImg.vue?vue&type=template&id=0570c6a3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=template&id=0570c6a3&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=template&id=0570c6a3&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/common/BackgroundImg.vue?vue&type=template&id=0570c6a3& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { class: _vm.pictureClass, style: _vm.backgroundSource })
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-54.js.map