(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[47],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");







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
    consentGroups: {
      type: Object
    },
    cardClass: {
      type: String
    },
    cardStyle: {
      type: String
    }
  },
  data: function data() {
    return {
      expandedGroups: {}
    };
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_6__["mapMutations"])(["toggleConsent"])), {}, {
    isConsented: function isConsented(key, defaultValue) {
      return this.$store.getters.isConsented(key, defaultValue);
    },
    setGroupVisibility: function setGroupVisibility(groupKey, value, event) {
      event.preventDefault();
      event.stopPropagation();
      this.$set(this.expandedGroups, groupKey, value);
    }
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "privacy-settings d-flex flex-column" }, [
    _c(
      "div",
      { staticClass: "privacy-settings-body overflow-auto" },
      _vm._l(_vm.consentGroups, function(consentGroup, index) {
        return _c(
          "div",
          {
            staticClass: "card consent-group",
            class: {
              cardClass: _vm.cardClass,
              "mb-3": index < consentGroup.length - 1
            },
            style: _vm.cardStyle
          },
          [
            _c(
              "div",
              {
                staticClass: "card-body mb-0",
                on: {
                  click: function($event) {
                    $event.stopPropagation()
                    return _vm.toggleConsent(consentGroup.key + ".*")
                  }
                }
              },
              [
                _c("p", { staticClass: "card-title h4 d-flex" }, [
                  _c(
                    "span",
                    { staticClass: "flex-fill" },
                    [
                      consentGroup.label.length > 0
                        ? [
                            _vm._v(
                              "\n                            " +
                                _vm._s(consentGroup.label) +
                                "\n                        "
                            )
                          ]
                        : [
                            _vm._v(
                              "\n                            " +
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.privacySettingsDefaultGroup"
                                  )
                                ) +
                                "\n                        "
                            )
                          ],
                      _vm._v(
                        "\n                        (" +
                          _vm._s(consentGroup.consents.length) +
                          ")\n                    "
                      )
                    ],
                    2
                  ),
                  _vm._v(" "),
                  !consentGroup.necessary
                    ? _c(
                        "span",
                        {
                          staticClass:
                            "custom-control custom-switch custom-control-appearance"
                        },
                        [
                          _c("input", {
                            staticClass: "custom-control-input",
                            attrs: { type: "checkbox" },
                            domProps: {
                              checked: _vm.isConsented(consentGroup.key + ".*")
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { staticClass: "custom-control-label" })
                        ]
                      )
                    : _c(
                        "span",
                        { staticClass: "badge badge-primary bg-appearance" },
                        [
                          _vm._v(
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.privacySettingsNecessary"
                              )
                            )
                          )
                        ]
                      )
                ]),
                _vm._v(" "),
                consentGroup.description.length > 0
                  ? _c("p", { staticClass: "card-text" }, [
                      _vm._v(_vm._s(consentGroup.description))
                    ])
                  : _vm._e()
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-body mt-0" }, [
              _vm.expandedGroups[consentGroup.key]
                ? _c(
                    "div",
                    _vm._l(consentGroup.consents, function(consent) {
                      return _c(
                        "div",
                        {
                          staticClass: "card consent bg-light mb-3",
                          class: {
                            "border-primary border-appearance active":
                              _vm.isConsented(
                                consentGroup.key + "." + consent.key
                              ) ||
                              consent.necessary ||
                              consentGroup.necessary
                          }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "card-body",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  return _vm.toggleConsent(
                                    consentGroup.key + "." + consent.key
                                  )
                                }
                              }
                            },
                            [
                              _c(
                                "p",
                                { staticClass: "d-flex mb-0 font-weight-bold" },
                                [
                                  _c("span", { staticClass: "flex-fill" }, [
                                    _vm._v(_vm._s(consent.label))
                                  ]),
                                  _vm._v(" "),
                                  !consentGroup.necessary && !consent.necessary
                                    ? _c(
                                        "span",
                                        {
                                          staticClass:
                                            "custom-control custom-switch custom-control-appearance"
                                        },
                                        [
                                          _c("input", {
                                            staticClass: "custom-control-input",
                                            attrs: { type: "checkbox" },
                                            domProps: {
                                              checked: _vm.isConsented(
                                                consentGroup.key +
                                                  "." +
                                                  consent.key
                                              )
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c("label", {
                                            staticClass: "custom-control-label"
                                          })
                                        ]
                                      )
                                    : _vm._e()
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          consent.provider.length > 0 ||
                          consent.description.length > 0 ||
                          consent.policyUrl.length > 0 ||
                          consent.lifespan.length > 0
                            ? _c(
                                "table",
                                {
                                  staticClass:
                                    "table table-responsive-md table-sm table-striped mb-0"
                                },
                                [
                                  _c("tbody", [
                                    consent.provider.length > 0
                                      ? _c("tr", [
                                          _c("td", { staticClass: "pl-3" }, [
                                            _vm._v(
                                              _vm._s(
                                                _vm.$translate(
                                                  "Ceres::Template.privacySettingsProvider"
                                                )
                                              )
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "pr-3" }, [
                                            _vm._v(_vm._s(consent.provider))
                                          ])
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    consent.description.length > 0
                                      ? _c("tr", [
                                          _c("td", { staticClass: "pl-3" }, [
                                            _vm._v(
                                              _vm._s(
                                                _vm.$translate(
                                                  "Ceres::Template.privacySettingsDescription"
                                                )
                                              )
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "pr-3" }, [
                                            _vm._v(_vm._s(consent.description))
                                          ])
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    consent.policyUrl.length > 0
                                      ? _c("tr", [
                                          _c("td", { staticClass: "pl-3" }, [
                                            _vm._v(
                                              _vm._s(
                                                _vm.$translate(
                                                  "Ceres::Template.privacySettingsPolicyUrl"
                                                )
                                              )
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "pr-3" }, [
                                            _c(
                                              "a",
                                              {
                                                staticClass:
                                                  "text-primary text-appearance",
                                                attrs: {
                                                  href: consent.policyUrl,
                                                  target: "_blank"
                                                }
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(consent.policyUrl)
                                                )
                                              ]
                                            )
                                          ])
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    consent.lifespan.length > 0
                                      ? _c("tr", [
                                          _c("td", { staticClass: "pl-3" }, [
                                            _vm._v(
                                              _vm._s(
                                                _vm.$translate(
                                                  "Ceres::Template.privacySettingsLifespan"
                                                )
                                              )
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "pr-3" }, [
                                            _vm._v(_vm._s(consent.lifespan))
                                          ])
                                        ])
                                      : _vm._e()
                                  ])
                                ]
                              )
                            : _vm._e()
                        ]
                      )
                    }),
                    0
                  )
                : _vm._e(),
              _vm._v(" "),
              !_vm.expandedGroups[consentGroup.key]
                ? _c(
                    "a",
                    {
                      staticClass: "card-link text-primary text-appearance",
                      attrs: {
                        href: "#",
                        "data-testing": "privacy-settings-show-more-information"
                      },
                      on: {
                        click: function($event) {
                          return _vm.setGroupVisibility(
                            consentGroup.key,
                            true,
                            $event
                          )
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.privacySettingsMoreInformation"
                            )
                          ) +
                          "\n                "
                      )
                    ]
                  )
                : _c(
                    "a",
                    {
                      staticClass: "card-link text-primary text-appearance",
                      attrs: {
                        href: "#",
                        "data-testing": "privacy-settings-hide-more-information"
                      },
                      on: {
                        click: function($event) {
                          return _vm.setGroupVisibility(
                            consentGroup.key,
                            false,
                            $event
                          )
                        }
                      }
                    },
                    [
                      _vm._v(
                        ">\n                    " +
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.privacySettingsLessInformation"
                            )
                          ) +
                          "\n                "
                      )
                    ]
                  )
            ])
          ]
        )
      }),
      0
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/PrivacySettings.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrivacySettings.vue?vue&type=template&id=28a6037b& */ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&");
/* harmony import */ var _PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrivacySettings.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/pageDesign/PrivacySettings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PrivacySettings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./PrivacySettings.vue?vue&type=template&id=28a6037b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-47.js.map