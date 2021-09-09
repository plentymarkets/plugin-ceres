(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[41],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");




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
    tagAppearance: {
      type: String,
      default: ""
    },
    marginClasses: {
      type: String,
      default: ""
    },
    marginInlineStyles: {
      type: String,
      default: ""
    },
    enabledRoutes: {
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
    isTagRouteEnabled: function isTagRouteEnabled() {
      return this.enabledRoutes.includes("all") || this.enabledRoutes.includes("tags");
    },
    tags: function tags() {
      var currentVariation = this.$store.getters["".concat(this.itemId, "/currentItemVariation")];
      return currentVariation && currentVariation.tags;
    }
  },
  methods: {
    getTextColorClass: function getTextColorClass(bgColor) {
      if (!bgColor) return "badge-primary";
      var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
      var red = parseInt(color.substring(0, 2), 16);
      var green = parseInt(color.substring(2, 4), 16);
      var blue = parseInt(color.substring(4, 6), 16);
      var result = red * 0.299 + green * 0.587 + blue * 0.114;
      return result > 186 ? "text-dark" : "text-light";
    },
    getStyles: function getStyles(tag) {
      if (tag.color) {
        return {
          backgroundColor: tag.color
        };
      }

      return {};
    },
    getTagLink: function getTagLink(tag) {
      return "/" + encodeURIComponent(tag.names.name.toLowerCase()) + "_t" + tag.id;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
  return _vm.tags
    ? _c(
        "div",
        { staticClass: "pt-1 pb-1" },
        [
          _vm.isTagRouteEnabled
            ? _vm._l(_vm.tags, function(tag) {
                return _c(
                  "a",
                  {
                    key: tag.id,
                    staticClass: "badge mr-1",
                    class: [
                      _vm.tagAppearance,
                      _vm.marginClasses,
                      _vm.getTextColorClass(tag.color)
                    ],
                    style: [_vm.getStyles(tag), _vm.marginInlineStyles],
                    attrs: { href: _vm.getTagLink(tag) }
                  },
                  [_c("span", [_vm._v(_vm._s(tag.names.name))])]
                )
              })
            : _vm._l(_vm.tags, function(tag) {
                return _c(
                  "span",
                  {
                    key: tag.id,
                    staticClass: "badge mr-1",
                    class: [
                      _vm.tagAppearance,
                      _vm.marginClasses,
                      _vm.getTextColorClass(tag.color)
                    ],
                    style: [_vm.getStyles(tag), _vm.marginInlineStyles]
                  },
                  [_c("span", [_vm._v(_vm._s(tag.names.name))])]
                )
              })
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/TagList.vue":
/*!**********************************************************!*\
  !*** ./resources/js/src/app/components/item/TagList.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TagList.vue?vue&type=template&id=2a940624& */ "./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624&");
/* harmony import */ var _TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
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

/***/ "./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TagList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/TagList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./TagList.vue?vue&type=template&id=2a940624& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/TagList.vue?vue&type=template&id=2a940624&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TagList_vue_vue_type_template_id_2a940624___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-41.js.map