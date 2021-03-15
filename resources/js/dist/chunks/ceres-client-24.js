(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/form/FormAttachment.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/form/FormAttachment.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_4__);





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
  name: "form-attachment",
  data: function data() {
    return {
      selectedFiles: ""
    };
  },
  props: {
    allowMultiple: Boolean,
    allowedFileExtensions: String,
    isRequired: Boolean,
    formFieldId: String,
    label: String
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.isRequired) {
        _this.$refs.inputUnit.setAttribute("data-validate", "file");
      }
    });
  },
  methods: {
    collectFiles: function collectFiles(event) {
      var fileList = event.target.files;
      this.selectedFiles = Array.from(fileList).map(function (file) {
        return file.name;
      }).join(", ");
      this.$emit('files-changed', fileList);
    },
    clearSelectedFiles: function clearSelectedFiles() {
      this.selectedFiles = null;
      this.$refs.fileInput.value = "";
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/form/FormAttachment.vue?vue&type=template&id=64299210&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/form/FormAttachment.vue?vue&type=template&id=64299210& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    "label",
    {
      directives: [{ name: "tooltip", rawName: "v-tooltip" }],
      ref: "inputUnit",
      staticClass: "input-unit file-input",
      attrs: { "data-toggle": "tooltip", title: _vm.selectedFiles }
    },
    [
      _c("label", { attrs: { for: _vm.formFieldId } }, [
        _vm._v("\n        " + _vm._s(_vm.label)),
        _vm.isRequired ? _c("span", [_vm._v("*")]) : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "input-unit-preview",
          class: { disabled: !!_vm.selectedFiles },
          attrs: { "data-testing": "form-attachment-file-name" }
        },
        [_vm._v("\n        " + _vm._s(_vm.selectedFiles) + "\n    ")]
      ),
      _vm._v(" "),
      !_vm.selectedFiles
        ? _c("span", { staticClass: "input-unit-btn" }, [
            _c("i", { staticClass: "fa fa-ellipsis-h" })
          ])
        : _c(
            "span",
            {
              staticClass: "input-unit-btn",
              attrs: { "data-testing": "remove-attached-file" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.clearSelectedFiles()
                }
              }
            },
            [_c("i", { staticClass: "fa fa-times" })]
          ),
      _vm._v(" "),
      _c("input", {
        ref: "fileInput",
        attrs: {
          type: "file",
          multiple: _vm.allowMultiple,
          name: _vm.formFieldId,
          id: _vm.formFieldId,
          disabled:
            _vm.allowedFileExtensions.trim().length === 0 ||
            !!_vm.selectedFiles,
          accept: _vm.allowedFileExtensions,
          "data-testing": "form-attachment-input"
        },
        on: { change: _vm.collectFiles }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/form/FormAttachment.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/components/form/FormAttachment.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormAttachment_vue_vue_type_template_id_64299210___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormAttachment.vue?vue&type=template&id=64299210& */ "./resources/js/src/app/components/form/FormAttachment.vue?vue&type=template&id=64299210&");
/* harmony import */ var _FormAttachment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormAttachment.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/form/FormAttachment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _FormAttachment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormAttachment_vue_vue_type_template_id_64299210___WEBPACK_IMPORTED_MODULE_0__["render"],
  _FormAttachment_vue_vue_type_template_id_64299210___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/form/FormAttachment.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/form/FormAttachment.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/src/app/components/form/FormAttachment.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FormAttachment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormAttachment.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/form/FormAttachment.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_FormAttachment_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/form/FormAttachment.vue?vue&type=template&id=64299210&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/form/FormAttachment.vue?vue&type=template&id=64299210& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormAttachment_vue_vue_type_template_id_64299210___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./FormAttachment.vue?vue&type=template&id=64299210& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/form/FormAttachment.vue?vue&type=template&id=64299210&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormAttachment_vue_vue_type_template_id_64299210___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FormAttachment_vue_vue_type_template_id_64299210___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-24.js.map