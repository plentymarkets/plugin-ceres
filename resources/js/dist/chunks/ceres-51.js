"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[51],{

/***/ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/PrivacySettings.vue ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PrivacySettings.vue?vue&type=template&id=28a6037b& */ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&");
/* harmony import */ var _PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrivacySettings.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__.render,
  _PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
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

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

    data()
    {
        return {
            expandedGroups: {}
        };
    },

    methods:
    {
        ...(0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapMutations)([
            "toggleConsent"
        ]),

        isConsented(key, defaultValue)
        {
            return this.$store.getters.isConsented(key, defaultValue);
        },

        setGroupVisibility(groupKey, value, event)
        {
            event.preventDefault();
            event.stopPropagation();
            this.$set(this.expandedGroups, groupKey, value);
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrivacySettings.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b& ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PrivacySettings_vue_vue_type_template_id_28a6037b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PrivacySettings.vue?vue&type=template&id=28a6037b& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/pageDesign/PrivacySettings.vue?vue&type=template&id=28a6037b& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "privacy-settings d-flex flex-column" }, [
    _c(
      "div",
      { staticClass: "privacy-settings-body overflow-auto" },
      _vm._l(_vm.consentGroups, function (consentGroup, index) {
        return _c(
          "div",
          {
            staticClass: "card consent-group",
            class: {
              cardClass: _vm.cardClass,
              "mb-3": index < consentGroup.length - 1,
            },
            style: _vm.cardStyle,
          },
          [
            _c(
              "div",
              {
                staticClass: "card-body mb-0",
                on: {
                  click: function ($event) {
                    $event.stopPropagation()
                    return _vm.toggleConsent(consentGroup.key + ".*")
                  },
                },
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
                            ),
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
                            ),
                          ],
                      _vm._v(
                        "\n                        (" +
                          _vm._s(consentGroup.consents.length) +
                          ")\n                    "
                      ),
                    ],
                    2
                  ),
                  _vm._v(" "),
                  !consentGroup.necessary
                    ? _c(
                        "span",
                        {
                          staticClass:
                            "custom-control custom-switch custom-control-appearance",
                        },
                        [
                          _c("input", {
                            staticClass: "custom-control-input",
                            attrs: { type: "checkbox" },
                            domProps: {
                              checked: _vm.isConsented(consentGroup.key + ".*"),
                            },
                          }),
                          _vm._v(" "),
                          _c("label", { staticClass: "custom-control-label" }),
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
                          ),
                        ]
                      ),
                ]),
                _vm._v(" "),
                consentGroup.description.length > 0
                  ? _c("p", { staticClass: "card-text" }, [
                      _vm._v(_vm._s(consentGroup.description)),
                    ])
                  : _vm._e(),
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-body mt-0" }, [
              _vm.expandedGroups[consentGroup.key]
                ? _c(
                    "div",
                    _vm._l(consentGroup.consents, function (consent) {
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
                              consentGroup.necessary,
                          },
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "card-body",
                              on: {
                                click: function ($event) {
                                  $event.stopPropagation()
                                  return _vm.toggleConsent(
                                    consentGroup.key + "." + consent.key
                                  )
                                },
                              },
                            },
                            [
                              _c(
                                "p",
                                { staticClass: "d-flex mb-0 font-weight-bold" },
                                [
                                  _c("span", { staticClass: "flex-fill" }, [
                                    _vm._v(_vm._s(consent.label)),
                                  ]),
                                  _vm._v(" "),
                                  !consentGroup.necessary && !consent.necessary
                                    ? _c(
                                        "span",
                                        {
                                          staticClass:
                                            "custom-control custom-switch custom-control-appearance",
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
                                              ),
                                            },
                                          }),
                                          _vm._v(" "),
                                          _c("label", {
                                            staticClass: "custom-control-label",
                                          }),
                                        ]
                                      )
                                    : _vm._e(),
                                ]
                              ),
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
                                    "table table-responsive-md table-sm table-striped mb-0",
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
                                            ),
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "pr-3" }, [
                                            _vm._v(_vm._s(consent.provider)),
                                          ]),
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
                                            ),
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "pr-3" }, [
                                            _vm._v(_vm._s(consent.description)),
                                          ]),
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
                                            ),
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
                                                  target: "_blank",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(consent.policyUrl)
                                                ),
                                              ]
                                            ),
                                          ]),
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
                                            ),
                                          ]),
                                          _vm._v(" "),
                                          _c("td", { staticClass: "pr-3" }, [
                                            _vm._v(_vm._s(consent.lifespan)),
                                          ]),
                                        ])
                                      : _vm._e(),
                                  ]),
                                ]
                              )
                            : _vm._e(),
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
                        "data-testing":
                          "privacy-settings-show-more-information",
                      },
                      on: {
                        click: function ($event) {
                          return _vm.setGroupVisibility(
                            consentGroup.key,
                            true,
                            $event
                          )
                        },
                      },
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
                      ),
                    ]
                  )
                : _c(
                    "a",
                    {
                      staticClass: "card-link text-primary text-appearance",
                      attrs: {
                        href: "#",
                        "data-testing":
                          "privacy-settings-hide-more-information",
                      },
                      on: {
                        click: function ($event) {
                          return _vm.setGroupVisibility(
                            consentGroup.key,
                            false,
                            $event
                          )
                        },
                      },
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.privacySettingsLessInformation"
                            )
                          ) +
                          "\n                "
                      ),
                    ]
                  ),
            ]),
          ]
        )
      }),
      0
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-51.js.map