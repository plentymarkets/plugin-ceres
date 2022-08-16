"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[21],{

/***/ "./resources/js/src/app/components/containers/LastSeenItemList.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/src/app/components/containers/LastSeenItemList.vue ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LastSeenItemList.vue?vue&type=template&id=653923dd& */ "./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd&");
/* harmony import */ var _LastSeenItemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LastSeenItemList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LastSeenItemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__.render,
  _LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
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

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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
        itemsPerPage:
        {
            type: Number,
            default: 4
        },

        maxItems:
        {
            type: Number,
            default: 4
        },

        paddingClasses:
        {
            type: String,
            default: null
        },

        paddingInlineStyles:
        {
            type: String,
            default: null
        }
    },

    data() {
        return {
            mountedItems: [],
            isMounted: false
        }
    },

    computed: (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapState)({
        items(state)
        {
            return state.lastSeen.lastSeenItems.slice(0, this.maxItems);
        },

        containers: state => state.lastSeen.containers
    }),

    beforeMount()
    {
        this.$store.dispatch("getLastSeenItems");
    },

    mounted()
    {
        this.mountedItems = this.items;
        this.isMounted = true;
    },

    watch:
    {
        items()
        {
            if(this.isMounted)
            {
                this.mountedItems = this.items;
            }
        }
    },

    methods:
    {
        getContainerContentById(variationId, containerKey)
        {
            const containersById = this.containers[variationId];

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isDefined)(containersById))
            {
                const container = containersById[containerKey];

                if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isDefined)(container))
                {
                    return container;
                }
            }

            return "";
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LastSeenItemList.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd& ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LastSeenItemList_vue_vue_type_template_id_653923dd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./LastSeenItemList.vue?vue&type=template&id=653923dd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/containers/LastSeenItemList.vue?vue&type=template&id=653923dd& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "row" }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.mountedItems.length,
            expression: "mountedItems.length",
          },
        ],
        staticClass: "col-12",
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
                attrs: { "items-per-page": _vm.itemsPerPage },
              },
              [
                _vm._l(_vm.items, function (item) {
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
                          "padding-inline-styles": _vm.paddingInlineStyles,
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "before-prices",
                              fn: function () {
                                return [
                                  _c("div", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.getContainerContentById(
                                          item.id,
                                          "beforePrices"
                                        )
                                      ),
                                    },
                                  }),
                                ]
                              },
                              proxy: true,
                            },
                            {
                              key: "after-prices",
                              fn: function () {
                                return [
                                  _c("div", {
                                    domProps: {
                                      innerHTML: _vm._s(
                                        _vm.getContainerContentById(
                                          item.id,
                                          "afterPrices"
                                        )
                                      ),
                                    },
                                  }),
                                ]
                              },
                              proxy: true,
                            },
                          ],
                          null,
                          true
                        ),
                      }),
                    ],
                    1
                  )
                }),
              ],
              2
            )
          : _vm._e(),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-21.js.map