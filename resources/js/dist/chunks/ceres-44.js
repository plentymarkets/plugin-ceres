(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    styles: String,
    classes: String,
    consentGroups: Object
  },
  data: function data() {
    return {
      isCollapsed: true,
      isExpanded: false
    };
  },
  computed: {
    isVisible: function isVisible() {
      return App.isShopBuilder || !this.$store.state.consents.hasResponse || !this.isCollapsed;
    },
    isShopBuilder: function isShopBuilder() {
      return App.isShopBuilder;
    },
    text: function text() {
      var links = {
        gtc: "<a class=\"text-appearance\" href=\"" + App.urls.gtc + "\" target=\"_blank\">" + this.$translate("Ceres::Template.checkoutGtc") + "</a>",
        cancellation: "<a class=\"text-appearance\" href=\"" + App.urls.cancellationRights + "\" target=\"_blank\">" + this.$translate("Ceres::Template.checkoutCancellationRight", {
          "hyphen": "&shy;"
        }) + "</a>",
        policy: "<a class=\"text-appearance\" href=\"" + App.urls.privacyPolicy + "\" target=\"_blank\">" + this.$translate("Ceres::Template.checkoutPrivacyPolicy", {
          "hyphen": "&shy;"
        }) + "</a>",
        legal: "<a class=\"text-appearance\" href=\"" + App.urls.legalDisclosure + "\" target=\"_blank\">" + this.$translate('Ceres::Template.footerLegalDisclosure') + "</a>"
      };
      return this.$translate("Ceres::Template.cookieBarHintText", links);
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_8__["mapMutations"])(["storeConsents", "acceptAll"])), {}, {
    close: function close() {
      this.isCollapsed = true;
      this.isExpanded = false;
    },
    isConsented: function isConsented(groupKey) {
      return this.$store.getters.isConsented(groupKey + ".*");
    },
    toggleConsent: function toggleConsent(groupKey) {
      this.$store.commit("toggleConsent", groupKey + ".*");
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=template&id=cb92f282&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=template&id=cb92f282& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
    "div",
    {
      staticClass: "cookie-bar",
      class: {
        out: !_vm.isVisible,
        "border-top bg-white": _vm.isVisible,
        "fixed-bottom": !_vm.isShopBuilder || false
      }
    },
    [
      _vm.isVisible
        ? _c("div", { staticClass: "container-max" }, [
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: !_vm.isExpanded,
                    expression: "!isExpanded"
                  }
                ],
                staticClass: "row py-3",
                class: _vm.classes,
                style: _vm.styles
              },
              [
                _c("div", { staticClass: "col-12 col-md-8" }, [
                  _c("p", { domProps: { innerHTML: _vm._s(_vm.text) } }),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _vm._l(_vm.consentGroups, function(consentGroup) {
                        return [
                          consentGroup.consents.length > 0
                            ? _c(
                                "span",
                                {
                                  staticClass:
                                    "custom-control custom-switch custom-control-appearance d-md-inline-block mr-3"
                                },
                                [
                                  _c("input", {
                                    staticClass: "custom-control-input",
                                    attrs: {
                                      type: "checkbox",
                                      id:
                                        _vm._uid + "-group-" + consentGroup.key,
                                      disabled: consentGroup.necessary
                                    },
                                    domProps: {
                                      checked:
                                        _vm.isConsented(consentGroup.key) ||
                                        consentGroup.necessary
                                    },
                                    on: {
                                      change: function($event) {
                                        return _vm.toggleConsent(
                                          consentGroup.key
                                        )
                                      }
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "label",
                                    {
                                      staticClass: "custom-control-label",
                                      attrs: {
                                        for:
                                          _vm._uid +
                                          "-group-" +
                                          consentGroup.key
                                      }
                                    },
                                    [
                                      consentGroup.label.length > 0
                                        ? [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(consentGroup.label) +
                                                "\n                                "
                                            )
                                          ]
                                        : [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(
                                                  _vm.$translate(
                                                    "Ceres::Template.privacySettingsDefaultGroup"
                                                  )
                                                ) +
                                                "\n                                "
                                            )
                                          ]
                                    ],
                                    2
                                  )
                                ]
                              )
                            : _vm._e()
                        ]
                      }),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          staticClass:
                            "text-primary text-appearance d-block d-md-inline-block",
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              $event.stopPropagation()
                              _vm.isExpanded = true
                            }
                          }
                        },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.cookieBarMoreSettings"
                              )
                            )
                          )
                        ]
                      )
                    ],
                    2
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-12 col-md-4 pt-3 pt-md-0" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary btn-block btn-appearance",
                      on: {
                        click: function($event) {
                          _vm.acceptAll()
                          _vm.close()
                        }
                      }
                    },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.$translate("Ceres::Template.cookieBarAcceptAll")
                        )
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default btn-block",
                      on: {
                        click: function($event) {
                          _vm.storeConsents()
                          _vm.close()
                        }
                      }
                    },
                    [
                      _vm._v(
                        _vm._s(_vm.$translate("Ceres::Template.cookieBarSave"))
                      )
                    ]
                  )
                ])
              ]
            ),
            _vm._v(" "),
            _vm.isExpanded
              ? _c(
                  "div",
                  {
                    staticClass: "row py-3",
                    class: _vm.classes,
                    style: _vm.styles
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "col-12 mb-3" },
                      [
                        _c("privacy-settings", {
                          attrs: { "consent-groups": _vm.consentGroups }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-12 col-md-6" }, [
                      _c(
                        "a",
                        {
                          staticClass:
                            "text-primary text-appearance d-inline-block mb-3",
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              $event.stopPropagation()
                              _vm.isExpanded = false
                            }
                          }
                        },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate("Ceres::Template.cookieBarBack")
                            )
                          )
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-6 col-md-3" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-block btn-primary btn-appearance",
                          on: {
                            click: function($event) {
                              _vm.acceptAll()
                              _vm.close()
                            }
                          }
                        },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.cookieBarAcceptAll"
                              )
                            )
                          )
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-6 col-md-3" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-block btn-block btn-default",
                          on: {
                            click: function($event) {
                              _vm.storeConsents()
                              _vm.close()
                            }
                          }
                        },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate("Ceres::Template.cookieBarSave")
                            )
                          )
                        ]
                      )
                    ])
                  ]
                )
              : _vm._e()
          ])
        : _c("div", [
            _c(
              "button",
              {
                staticClass: "btn btn-primary btn-appearance",
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    $event.stopPropagation()
                    _vm.isCollapsed = false
                  }
                }
              },
              [
                _c("i", { staticClass: "fa fa-shield float-none" }),
                _vm._v(" "),
                _c("span", { staticClass: "d-none d-sm-inline-block" }, [
                  _vm._v(
                    _vm._s(
                      _vm.$translate("Ceres::Template.cookieBarPrivacySettings")
                    )
                  )
                ])
              ]
            )
          ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/CookieBar.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/CookieBar.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CookieBar_vue_vue_type_template_id_cb92f282___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CookieBar.vue?vue&type=template&id=cb92f282& */ "./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=template&id=cb92f282&");
/* harmony import */ var _CookieBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CookieBar.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CookieBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CookieBar_vue_vue_type_template_id_cb92f282___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CookieBar_vue_vue_type_template_id_cb92f282___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/pageDesign/CookieBar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CookieBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CookieBar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CookieBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=template&id=cb92f282&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=template&id=cb92f282& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CookieBar_vue_vue_type_template_id_cb92f282___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CookieBar.vue?vue&type=template&id=cb92f282& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/CookieBar.vue?vue&type=template&id=cb92f282&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CookieBar_vue_vue_type_template_id_cb92f282___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CookieBar_vue_vue_type_template_id_cb92f282___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-44.js.map