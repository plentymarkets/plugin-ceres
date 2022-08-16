"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[46],{

/***/ "./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemFilterTagList_vue_vue_type_template_id_6da91432___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemFilterTagList.vue?vue&type=template&id=6da91432& */ "./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=template&id=6da91432&");
/* harmony import */ var _ItemFilterTagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemFilterTagList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemFilterTagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemFilterTagList_vue_vue_type_template_id_6da91432___WEBPACK_IMPORTED_MODULE_0__.render,
  _ItemFilterTagList_vue_vue_type_template_id_6da91432___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************/
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



/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        facetData:
        {
            type: Array,
            default()
            {
                return [];
            }
        },
        marginClasses:
        {
            type: String,
            default: null
        },
        marginInlineStyles:
        {
            type: String,
            default: null
        }
    },

    computed: (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)({
        tagList: state => state.itemList.selectedFacets
    }),

    created()
    {
        if (!this.$store.state.itemList.facets?.length)
        {
            this.$store.commit("addFacets", this.facetData);
        }
    },

    methods:
    {
        removeTag(tag)
        {
            this.selectFacet({ facetValue: tag });
            this.loadItemList();
        },

        resetAllTags()
        {
            this.resetAllSelectedFacets();
            this.loadItemList();
        },

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapMutations)([
            "resetAllSelectedFacets"
        ]),

        ...(0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapActions)([
            "selectFacet",
            "loadItemList"
        ])
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ItemFilterTagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemFilterTagList.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemFilterTagList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=template&id=6da91432&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=template&id=6da91432& ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemFilterTagList_vue_vue_type_template_id_6da91432___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemFilterTagList_vue_vue_type_template_id_6da91432___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemFilterTagList_vue_vue_type_template_id_6da91432___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ItemFilterTagList.vue?vue&type=template&id=6da91432& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=template&id=6da91432&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=template&id=6da91432&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/itemList/filter/ItemFilterTagList.vue?vue&type=template&id=6da91432& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "selected-filters clearfix" },
    [
      _vm._l(_vm.tagList, function (tag) {
        return _c(
          "span",
          {
            class:
              "text-appearance selected-filter filter-" +
              tag.id +
              " " +
              _vm.marginClasses,
            style: _vm.marginInlineStyles,
            on: {
              click: function ($event) {
                return _vm.removeTag(tag)
              },
            },
          },
          [
            _c("i", {
              staticClass: "fa fa-times",
              attrs: { "aria-hidden": "true" },
            }),
            _vm._v(" " + _vm._s(tag.name) + "\n    "),
          ]
        )
      }),
      _vm._v(" "),
      _vm.tagList.length >= 2
        ? _c(
            "span",
            {
              class:
                "bg-appearance selected-filter reset-all" +
                " " +
                _vm.marginClasses,
              style: _vm.marginInlineStyles,
              on: {
                click: function ($event) {
                  return _vm.resetAllTags()
                },
              },
            },
            [
              _vm._v(
                "\n        " +
                  _vm._s(_vm.$translate("Ceres::Template.itemFilterReset")) +
                  "\n    "
              ),
            ]
          )
        : _vm._e(),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-46.js.map