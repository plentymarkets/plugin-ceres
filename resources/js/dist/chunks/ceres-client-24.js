(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


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
  props: {
    itemsPerPage: {
      type: Number,
      default: 4
    },
    maxItems: {
      type: Number,
      default: 4
    },
    paddingClasses: {
      type: String,
      default: null
    },
    paddingInlineStyles: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      mountedItems: [],
      isMounted: false
    };
  },
  computed: Object(vuex__WEBPACK_IMPORTED_MODULE_3__["mapState"])({
    items: function items(state) {
      return state.lastSeen.lastSeenItems.slice(0, this.maxItems);
    },
    containers: function containers(state) {
      return state.lastSeen.containers;
    }
  }),
  beforeMount: function beforeMount() {
    this.$store.dispatch("getLastSeenItems");
  },
  mounted: function mounted() {
    this.mountedItems = this.items;
    this.isMounted = true;
  },
  watch: {
    items: function items() {
      if (this.isMounted) {
        this.mountedItems = this.items;
      }
    }
  },
  methods: {
    getContainerContentById: function getContainerContentById(variationId, containerKey) {
      var containersById = this.containers[variationId];

      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(containersById)) {
        var container = containersById[containerKey];

        if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_2__["isDefined"])(container)) {
          return container;
        }
      }

      return "";
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.mountedItems.length,
            expression: "mountedItems.length"
          }
        ],
        staticClass: "col-12"
      },
      [_vm._t("heading")],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "col-12" },
      [
        _vm.mountedItems && _vm.mountedItems.length > 0
          ? _c(
              "carousel",
              {
                ref: "carousel",
                attrs: { "items-per-page": _vm.itemsPerPage }
              },
              [
                _vm._l(_vm.items, function(item) {
                  return _c(
                    "template",
                    { slot: "items" },
                    [
                      _c("category-item", {
                        key: item.id,
                        attrs: {
                          "item-data": item.data,
                          "decimal-count": _vm.$ceres.config.item.storeSpecial,
                          "disable-carousel-on-mobile":
                            _vm.mountedItems.length > _vm.itemsPerPage,
                          "padding-classes": _vm.paddingClasses,
                          "padding-inline-styles": _vm.paddingInlineStyles
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "before-prices",
                              fn: function() {
                                return [
                                  _c("div", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.getContainerContentById(
                                          item.id,
                                          "beforePrices"
                                        )
                                      )
                                    }
                                  })
                                ]
                              },
                              proxy: true
                            },
                            {
                              key: "after-prices",
                              fn: function() {
                                return [
                                  _c("div", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.getContainerContentById(
                                          item.id,
                                          "afterPrices"
                                        )
                                      )
                                    }
                                  })
                                ]
                              },
                              proxy: true
                            }
                          ],
                          null,
                          true
                        )
                      })
                    ],
                    1
                  )
                })
              ],
              2
            )
          : _vm._e()
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/containers/LastSeenItemList.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/src/app/components/containers/LastSeenItemList.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LastSeenItemList.vue?vue&type=template&id=653923dd& */ "./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd&");
/* harmony import */ var _LastSeenItemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LastSeenItemList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LastSeenItemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/containers/LastSeenItemList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LastSeenItemList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LastSeenItemList.vue?vue&type=template&id=653923dd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-24.js.map