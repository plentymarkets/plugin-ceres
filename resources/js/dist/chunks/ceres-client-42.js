(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
/* harmony import */ var _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/ValidationService */ "./resources/js/src/app/services/ValidationService.js");
/* harmony import */ var _helper_executeReCaptcha__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper/executeReCaptcha */ "./resources/js/src/app/helper/executeReCaptcha.js");
/* harmony import */ var _mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/buttonSizeProperty.mixin */ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_5__["ButtonSizePropertyMixin"]],
  props: {
    showNameInputs: {
      type: Boolean,
      default: false
    },
    showPrivacyPolicyCheckbox: {
      type: Boolean,
      default: true
    },
    emailFolder: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      isDisabled: false,
      privacyPolicyValue: false,
      honeypot: "",
      loadRecaptcha: false
    };
  },
  computed: {
    privacyPolicyText: function privacyPolicyText() {
      var link = "<a href=\"" + App.urls.privacyPolicy + "\" target=\"_blank\"><span class=\"text-primary text-appearance\">" + this.$translate("Ceres::Template.checkoutPrivacyPolicy", {
        "hyphen": "&shy;"
      }) + "</span></a>";
      return this.$translate("Ceres::Template.newsletterAcceptPrivacyPolicy", {
        "policy": link
      });
    }
  },
  methods: {
    validateData: function validateData() {
      var _this = this;

      this.isDisabled = true;
      _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__["default"].validate($("#newsletter-input-form_" + this._uid)).done(function () {
        _this.save();
      }).fail(function (invalidFields) {
        _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__["default"].markInvalidFields(invalidFields, "error");
        _this.isDisabled = false;
      });
    },
    save: function save() {
      var _this2 = this;

      Object(_helper_executeReCaptcha__WEBPACK_IMPORTED_MODULE_4__["executeReCaptcha"])(this.$el).then(function (recaptchaToken) {
        _services_ApiService__WEBPACK_IMPORTED_MODULE_1__["default"].post("/rest/io/customer/newsletter", {
          email: _this2.email,
          firstName: _this2.firstName,
          lastName: _this2.lastName,
          emailFolder: _this2.emailFolder,
          honeypot: _this2.honeypot,
          recaptcha: recaptchaToken
        }).done(function (data) {
          if (!!data.containsHoneypot) {
            _services_NotificationService__WEBPACK_IMPORTED_MODULE_2__["default"].warn(_this2.$translate("Ceres::Template.newsletterHoneypotWarning"));
          } else {
            _services_NotificationService__WEBPACK_IMPORTED_MODULE_2__["default"].success(_this2.$translate("Ceres::Template.newsletterSuccessMessage")).closeAfter(3000);
          }

          _this2.resetInputs();
        }).fail(function () {
          _services_NotificationService__WEBPACK_IMPORTED_MODULE_2__["default"].error(_this2.$translate("Ceres::Template.newsletterErrorMessage")).closeAfter(5000);
        }).always(function () {
          _this2.isDisabled = false;

          _this2.resetRecaptcha();
        });
      });
    },
    resetInputs: function resetInputs() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.privacyPolicyValue = false;
    },
    resetRecaptcha: function resetRecaptcha() {
      if (App.config.global.googleRecaptchaVersion === 2 && window.grecaptcha) {
        var recaptchaId = this.$el.querySelector("[data-recaptcha]");
        window.grecaptcha.reset(recaptchaId);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=template&id=73e680cd&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=template&id=73e680cd& ***!
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
  return _c(
    "form",
    {
      ref: "newsletterForm",
      attrs: { id: "newsletter-input-form_" + _vm._uid, method: "post" },
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.validateData($event)
        }
      }
    },
    [
      _c("div", { staticClass: "row" }, [
        _vm.showNameInputs
          ? _c("div", { staticClass: "col-6" }, [
              _c("div", { staticClass: "input-unit" }, [
                _c(
                  "label",
                  { attrs: { for: "first-name-input_" + _vm._uid } },
                  [
                    _vm._v(
                      _vm._s(
                        _vm.$translate("Ceres::Template.newsletterFirstName")
                      )
                    )
                  ]
                ),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.firstName,
                      expression: "firstName"
                    }
                  ],
                  attrs: { type: "text", id: "first-name-input_" + _vm._uid },
                  domProps: { value: _vm.firstName },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.firstName = $event.target.value
                    }
                  }
                })
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.showNameInputs
          ? _c("div", { staticClass: "col-6 pl-0" }, [
              _c("div", { staticClass: "input-unit" }, [
                _c("label", { attrs: { for: "last-name-input_" + _vm._uid } }, [
                  _vm._v(
                    _vm._s(_vm.$translate("Ceres::Template.newsletterLastName"))
                  )
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.lastName,
                      expression: "lastName"
                    }
                  ],
                  attrs: { type: "text", id: "last-name-input_" + _vm._uid },
                  domProps: { value: _vm.lastName },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.lastName = $event.target.value
                    }
                  }
                })
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "col-12" }, [
          _c("div", { staticClass: "input-group" }, [
            _c(
              "div",
              { staticClass: "input-unit", attrs: { "data-validate": "mail" } },
              [
                _c("label", { attrs: { for: "email-input-id_" + _vm._uid } }, [
                  _vm._v(
                    _vm._s(_vm.$translate("Ceres::Template.newsletterEmail")) +
                      " *"
                  )
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.email,
                      expression: "email"
                    }
                  ],
                  attrs: {
                    type: "email",
                    autocomplete: "email",
                    id: "email-input-id_" + _vm._uid
                  },
                  domProps: { value: _vm.email },
                  on: {
                    focus: function($event) {
                      _vm.loadRecaptcha = true
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.email = $event.target.value
                    }
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.honeypot,
                  expression: "honeypot"
                }
              ],
              staticClass: "honey",
              attrs: {
                autocomplete: "none",
                type: "text",
                name: "username",
                tabindex: "-1"
              },
              domProps: { value: _vm.honeypot },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.honeypot = $event.target.value
                }
              }
            })
          ])
        ]),
        _vm._v(" "),
        _vm.showPrivacyPolicyCheckbox
          ? _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                {
                  staticClass: "form-check small",
                  attrs: { "data-validate": "" }
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.privacyPolicyValue,
                        expression: "privacyPolicyValue"
                      }
                    ],
                    staticClass: "form-check-input",
                    attrs: {
                      type: "checkbox",
                      id: "privacy-policy-accept-id_" + _vm._uid,
                      name: "privacy-policy-accept"
                    },
                    domProps: {
                      checked: Array.isArray(_vm.privacyPolicyValue)
                        ? _vm._i(_vm.privacyPolicyValue, null) > -1
                        : _vm.privacyPolicyValue
                    },
                    on: {
                      change: function($event) {
                        var $$a = _vm.privacyPolicyValue,
                          $$el = $event.target,
                          $$c = $$el.checked ? true : false
                        if (Array.isArray($$a)) {
                          var $$v = null,
                            $$i = _vm._i($$a, $$v)
                          if ($$el.checked) {
                            $$i < 0 &&
                              (_vm.privacyPolicyValue = $$a.concat([$$v]))
                          } else {
                            $$i > -1 &&
                              (_vm.privacyPolicyValue = $$a
                                .slice(0, $$i)
                                .concat($$a.slice($$i + 1)))
                          }
                        } else {
                          _vm.privacyPolicyValue = $$c
                        }
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", {
                    staticClass: "form-check-label",
                    attrs: { for: "privacy-policy-accept-id_" + _vm._uid },
                    domProps: { innerHTML: _vm._s(_vm.privacyPolicyText) }
                  })
                ]
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "col-12 mt-3" }, [
          _c("div", { staticClass: "input-group-btn" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-block btn-primary btn-appearance",
                class: _vm.buttonSizeClass,
                attrs: { type: "button", disabled: _vm.isDisabled },
                on: { click: _vm.validateData }
              },
              [
                _c("icon", {
                  attrs: { icon: "paper-plane-o", loading: _vm.isDisabled }
                }),
                _vm._v(
                  "\n                    " +
                    _vm._s(
                      _vm.$translate(
                        "Ceres::Template.newsletterSubscribeButtonLabel"
                      )
                    ) +
                    "\n                "
                )
              ],
              1
            )
          ])
        ])
      ]),
      _vm._v(" "),
      !!_vm.$ceres.config.global.googleRecaptchaApiKey && _vm.loadRecaptcha
        ? _c("recaptcha")
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/newsletter/NewsletterInput.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/app/components/newsletter/NewsletterInput.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewsletterInput_vue_vue_type_template_id_73e680cd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewsletterInput.vue?vue&type=template&id=73e680cd& */ "./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=template&id=73e680cd&");
/* harmony import */ var _NewsletterInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewsletterInput.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewsletterInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewsletterInput_vue_vue_type_template_id_73e680cd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewsletterInput_vue_vue_type_template_id_73e680cd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/newsletter/NewsletterInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewsletterInput.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=template&id=73e680cd&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=template&id=73e680cd& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterInput_vue_vue_type_template_id_73e680cd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewsletterInput.vue?vue&type=template&id=73e680cd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/newsletter/NewsletterInput.vue?vue&type=template&id=73e680cd&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterInput_vue_vue_type_template_id_73e680cd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterInput_vue_vue_type_template_id_73e680cd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-42.js.map