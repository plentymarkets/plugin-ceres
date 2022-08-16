"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[42],{

/***/ "./resources/js/src/app/components/item/TagList.vue":
/*!**********************************************************!*\
  !*** ./resources/js/src/app/components/item/TagList.vue ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagList.vue?vue&type=template&id=2a940624& */ "./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624&");
/* harmony import */ var _TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__.render,
  _TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/TagList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************/
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

    name: "tag-list",

    props: {
        tagAppearance:
        {
            type: String,
            default: ""
        },
        marginClasses:
        {
            type: String,
            default: ""
        },
        marginInlineStyles:
        {
            type: String,
            default: ""
        },
        enabledRoutes:
        {
            type: Array,
            default: () => []
        }
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed: {
        isTagRouteEnabled()
        {
            return this.enabledRoutes.includes("all") || this.enabledRoutes.includes("tags");
        },

        tags()
        {
            const currentVariation = this.$store.getters[`${this.itemId}/currentItemVariation`];
            
            return (currentVariation && currentVariation.tags) ? currentVariation.tags.filter((tag) => tag.names.name) : [];
        }
    },

    methods:
    {
        getTextColorClass(bgColor)
        {
            if (!bgColor)return "badge-primary";
            const color = (bgColor.charAt(0) === "#") ? bgColor.substring(1, 7) : bgColor;
            const red = parseInt(color.substring(0, 2), 16);
            const green = parseInt(color.substring(2, 4), 16);
            const blue = parseInt(color.substring(4, 6), 16);
            const result = (red * 0.299) + (green * 0.587) + (blue * 0.114);

            return (result > 186) ? "text-dark" : "text-light";
        },
        getStyles(tag)
        {
            if (tag.color)
            {
                return {
                    backgroundColor: tag.color
                };
            }
            return {};
        },
        getTagLink(tag)
        {
            return "/" + encodeURIComponent(tag.names.name.toLowerCase()) + "_t" + tag.id;
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TagList.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624& ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./TagList.vue?vue&type=template&id=2a940624& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
  return _vm.tags && _vm.tags.length > 0
    ? _c(
        "div",
        { staticClass: "pt-1 pb-1" },
        [
          _vm.isTagRouteEnabled
            ? _vm._l(_vm.tags, function (tag) {
                return _c(
                  "a",
                  {
                    key: tag.id,
                    staticClass: "badge mr-1",
                    class: [
                      _vm.tagAppearance,
                      _vm.marginClasses,
                      _vm.getTextColorClass(tag.color),
                    ],
                    style: [_vm.getStyles(tag), _vm.marginInlineStyles],
                    attrs: { href: _vm.getTagLink(tag) },
                  },
                  [_c("span", [_vm._v(_vm._s(tag.names.name))])]
                )
              })
            : _vm._l(_vm.tags, function (tag) {
                return _c(
                  "span",
                  {
                    key: tag.id,
                    staticClass: "badge mr-1",
                    class: [
                      _vm.tagAppearance,
                      _vm.marginClasses,
                      _vm.getTextColorClass(tag.color),
                    ],
                    style: [_vm.getStyles(tag), _vm.marginInlineStyles],
                  },
                  [_c("span", [_vm._v(_vm._s(tag.names.name))])]
                )
              }),
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-42.js.map