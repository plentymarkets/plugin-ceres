"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[44],{

/***/ "./resources/js/src/app/components/itemList/SearchSuggestionItem.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/SearchSuggestionItem.vue ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SearchSuggestionItem_vue_vue_type_template_id_4ff8d14a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchSuggestionItem.vue?vue&type=template&id=4ff8d14a& */ "./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=template&id=4ff8d14a&");
/* harmony import */ var _SearchSuggestionItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchSuggestionItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SearchSuggestionItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SearchSuggestionItem_vue_vue_type_template_id_4ff8d14a___WEBPACK_IMPORTED_MODULE_0__.render,
  _SearchSuggestionItem_vue_vue_type_template_id_4ff8d14a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/itemList/SearchSuggestionItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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
    props:
    {
        showImages: Boolean,

        paddingClasses:
        {
            type: String,
            default: "px-3 py-2"
        },
        
        paddingInlineStyles:
        {
            type: String,
            default: null
        },

        suggestionType:
        {
            type: String,
            required: true
        },

        showCount: Boolean,

        showAdditionalInformation: Boolean
    },

    computed:
    {
        ...(0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)({
            autocompleteResult(state)
            {
                return state.itemSearch.autocompleteResult[this.suggestionType];
            },
            autocompleteSearchString: state => state.itemSearch.autocompleteSearchString
        })
    },

    created()
    {
        this.$store.commit("addAutocompleteType", this.suggestionType);
    },

    methods:
    {
        getHighlightedLabel(label)
        {
            const search = this.autocompleteSearchString.split(/\s+/)
                .filter(word => word.length)
                .join("|");

            label = (label || "").toString();

            return label
                .replace(new RegExp(search, "ig"), match =>
                {
                    return `<strong class="text-appearance">${ match }</strong>`;
                });
        },

        getTargetUrl(item)
        {
            if (item.url && item.url.length)
            {
                return item.url;
            }

            return `${ App.urls.search }?query=${ encodeURIComponent(item.label) }`
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_SearchSuggestionItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchSuggestionItem.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchSuggestionItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=template&id=4ff8d14a&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=template&id=4ff8d14a& ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchSuggestionItem_vue_vue_type_template_id_4ff8d14a___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchSuggestionItem_vue_vue_type_template_id_4ff8d14a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SearchSuggestionItem_vue_vue_type_template_id_4ff8d14a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SearchSuggestionItem.vue?vue&type=template&id=4ff8d14a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=template&id=4ff8d14a&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=template&id=4ff8d14a&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/SearchSuggestionItem.vue?vue&type=template&id=4ff8d14a& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    [
      _vm.autocompleteResult && _vm.autocompleteResult.length
        ? [
            _c(
              "div",
              { attrs: { "data-testing": "autocomplete-list" } },
              _vm._l(_vm.autocompleteResult, function (item, index) {
                return _c(
                  "a",
                  {
                    key: index,
                    staticClass: "autocomplete-suggestion",
                    class: _vm.paddingClasses,
                    style: _vm.paddingInlineStyles,
                    attrs: { href: _vm.getTargetUrl(item), tabindex: "0" },
                  },
                  [
                    _vm.showImages
                      ? _c("div", { staticClass: "image flex-shrink-0 mr-3" }, [
                          item.image
                            ? _c("img", { attrs: { src: item.image } })
                            : _vm._e(),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "label overflow-hidden",
                        class: {
                          compact:
                            _vm.showAdditionalInformation &&
                            item.beforeLabel &&
                            item.afterLabel,
                        },
                      },
                      [
                        _vm.showAdditionalInformation && item.beforeLabel
                          ? _c(
                              "p",
                              { staticClass: "small mb-0 text-truncate" },
                              [_vm._v(_vm._s(item.beforeLabel))]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c("p", {
                          staticClass: "mb-0 text-truncate",
                          domProps: {
                            innerHTML: _vm._s(
                              _vm.getHighlightedLabel(item.label)
                            ),
                          },
                        }),
                        _vm._v(" "),
                        _vm.showAdditionalInformation && item.afterLabel
                          ? _c(
                              "p",
                              { staticClass: "small mb-0 text-truncate" },
                              [_vm._v(_vm._s(item.afterLabel))]
                            )
                          : _vm._e(),
                      ]
                    ),
                    _vm._v(" "),
                    _vm.showCount && item.count > 0
                      ? _c("div", { staticClass: "count" }, [
                          _c("span", [_vm._v(_vm._s(item.count))]),
                        ])
                      : _vm._e(),
                  ]
                )
              }),
              0
            ),
          ]
        : [
            _c(
              "p",
              {
                staticClass: "text-muted",
                class: _vm.paddingClasses,
                style: _vm.paddingInlineStyles,
              },
              [
                _vm._v(
                  "\n            " +
                    _vm._s(
                      _vm.$translate(
                        "Ceres::Template.itemSearchSuggestionNoResults"
                      )
                    ) +
                    "\n        "
                ),
              ]
            ),
          ],
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-44.js.map