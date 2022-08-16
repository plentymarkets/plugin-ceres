"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[19],{

/***/ "./resources/js/src/app/components/category/StepByStepNavigation.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/src/app/components/category/StepByStepNavigation.vue ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StepByStepNavigation_vue_vue_type_template_id_1c90b572___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StepByStepNavigation.vue?vue&type=template&id=1c90b572& */ "./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=template&id=1c90b572&");
/* harmony import */ var _StepByStepNavigation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StepByStepNavigation.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _StepByStepNavigation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StepByStepNavigation_vue_vue_type_template_id_1c90b572___WEBPACK_IMPORTED_MODULE_0__.render,
  _StepByStepNavigation_vue_vue_type_template_id_1c90b572___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/category/StepByStepNavigation.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=script&lang=js& ***!
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



/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        categoryId:
        {
            type: Number,
            required: true
        },
        chunkSize:
        {
            type: Number,
            default: 8
        },
        imageSource:
        {
            type: String,
            default: "imagePath"
        },
        columns:
        {
            type: Number,
            default: 4
        },
        columnsMax:
        {
            type: Number,
            default: 12
        },
        childrenCount:
        {
            type: Number,
            required: true
        }
    },

    data()
    {
        return {
            isWaiting: false,
            isInitiallyLoaded: false
        };
    },

    computed:
        {
            columnDivider()
            {
                return this.columnsMax / this.columns;
            },

            ...(0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapState)({
                categoryChildren: state => state.navigation.categoryChildren
            })
        },

    created()
    {
        this.loadChunk();
    },

    methods:
    {
        loadChunk()
        {
            if (!this.isWaiting)
            {
                this.isWaiting = true;

                this.$store.dispatch("loadCategoryChildrenChunk",
                    { categoryId: this.categoryId, size: this.chunkSize })
                    .finally(() =>
                    {
                        this.isWaiting = false;
                        this.isInitiallyLoaded = true;
                    });
            }
        },

        getCategoryUrl(url)
        {
            const trailingSlash = url[0] === "/" ? "" : "/";
            const prefix = App.urls.includeLanguage ? `/${ App.language }${ trailingSlash }` : "";

            return prefix + url;
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_StepByStepNavigation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./StepByStepNavigation.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_StepByStepNavigation_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=template&id=1c90b572&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=template&id=1c90b572& ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StepByStepNavigation_vue_vue_type_template_id_1c90b572___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StepByStepNavigation_vue_vue_type_template_id_1c90b572___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StepByStepNavigation_vue_vue_type_template_id_1c90b572___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./StepByStepNavigation.vue?vue&type=template&id=1c90b572& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=template&id=1c90b572&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=template&id=1c90b572&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/category/StepByStepNavigation.vue?vue&type=template&id=1c90b572& ***!
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
      !_vm.isInitiallyLoaded ? _vm._t("default") : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "row" },
        [
          _vm._l(_vm.categoryChildren, function (category) {
            return _c(
              "div",
              {
                staticClass: "mb-3 col-6",
                class: "col-md-" + _vm.columnDivider,
              },
              [
                _c(
                  "a",
                  {
                    attrs: {
                      href: _vm.getCategoryUrl(category.url),
                      title:
                        category.details[0].metaTitle ||
                        category.details[0].name,
                    },
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "nav-item border d-flex",
                        class: { "no-img": _vm.imageSource === "none" },
                      },
                      [
                        category.details[0][_vm.imageSource]
                          ? _c("div", { staticClass: "prop-1-1" }, [
                              _vm.imageSource !== "none"
                                ? _c("img", {
                                    attrs: {
                                      src:
                                        "/documents/" +
                                        category.details[0][_vm.imageSource],
                                      alt:
                                        category.details[0].metaTitle ||
                                        category.details[0].name,
                                    },
                                  })
                                : _vm._e(),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "nav-text d-flex align-center p-2" },
                          [
                            _c(
                              "span",
                              {
                                staticClass:
                                  "text-appearance mx-auto text-truncate",
                              },
                              [_vm._v(_vm._s(category.details[0].name))]
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]
                ),
              ]
            )
          }),
          _vm._v(" "),
          _vm.categoryChildren.length &&
          _vm.categoryChildren.length < _vm.childrenCount
            ? _c("div", { staticClass: "mb-3 mx-auto" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-appearance px-4 py-3",
                    class: { disabled: _vm.isWaiting },
                    attrs: { type: "button" },
                    on: {
                      click: function ($event) {
                        return _vm.loadChunk()
                      },
                    },
                  },
                  [
                    _c("span", [
                      _vm._v(
                        _vm._s(
                          _vm.$translate(
                            "Ceres::Template.stepByStepNavigationShowMore"
                          )
                        )
                      ),
                    ]),
                    _vm._v(" "),
                    _c("icon", {
                      staticClass: "fa-fw",
                      attrs: {
                        icon: "plus-circle",
                        "class-loading": "fa-repeat",
                        loading: _vm.isWaiting,
                      },
                    }),
                  ],
                  1
                ),
              ])
            : _vm._e(),
        ],
        2
      ),
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-19.js.map