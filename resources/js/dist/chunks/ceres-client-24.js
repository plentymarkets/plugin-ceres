(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.search.js */ "./node_modules/core-js/modules/es.string.search.js");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
/* harmony import */ var _services_ModalService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/ModalService */ "./resources/js/src/app/services/ModalService.js");
/* harmony import */ var _services_ValidationService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/ValidationService */ "./resources/js/src/app/services/ValidationService.js");
/* harmony import */ var _services_UrlService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/UrlService */ "./resources/js/src/app/services/UrlService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../helper/utils */ "./resources/js/src/app/helper/utils.js");


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "forgot-password-modal",
  props: {
    currentTemplate: String
  },
  data: function data() {
    return {
      username: "",
      isDisabled: false,
      honeypot: ""
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      $(_this.$refs.pwdModal).on("hidden.bs.modal", function () {
        _this.username = "";
      });
      var urlParams = _services_UrlService__WEBPACK_IMPORTED_MODULE_6__["default"].getUrlParams(document.location.search);

      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_7__["isNullOrUndefined"])(urlParams.show) && urlParams.show === "forgotPassword") {
        _services_ModalService__WEBPACK_IMPORTED_MODULE_4__["default"].findModal(_this.$refs.pwdModal).show();
        _this.username = !Object(_helper_utils__WEBPACK_IMPORTED_MODULE_7__["isNullOrUndefined"])(urlParams.email) ? urlParams.email : "";
      }
    });
  },
  watch: {
    username: function username(val, oldVal) {
      this.resetError();
    }
  },
  methods: {
    validateResetPwd: function validateResetPwd() {
      var _this2 = this;

      _services_ValidationService__WEBPACK_IMPORTED_MODULE_5__["default"].validate(this.$refs.pwdModal).done(function () {
        _this2.sendResetPwd();
      }).fail(function (invalidFields) {
        _services_ValidationService__WEBPACK_IMPORTED_MODULE_5__["default"].markInvalidFields(invalidFields, "error");
      });
    },

    /**
     *  Reset password
     */
    sendResetPwd: function sendResetPwd() {
      var _this3 = this;

      this.isDisabled = true;
      _services_ApiService__WEBPACK_IMPORTED_MODULE_2__["default"].post("/rest/io/customer/password_reset", {
        email: this.username,
        honeypot: this.honeypot
      }).done(function () {
        _services_ModalService__WEBPACK_IMPORTED_MODULE_4__["default"].findModal(_this3.$refs.pwdModal).hide();
        _this3.isDisabled = false;
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_3__["default"].success(_this3.$translate("Ceres::Template.loginSendEmailOk")).closeAfter(5000);
      }).fail(function () {
        _this3.isDisabled = false;
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_3__["default"].error(_this3.$translate("Ceres::Template.loginResetPwDErrorOnSendEmail")).closeAfter(5000);
      });
    },
    cancelResetPwd: function cancelResetPwd() {
      this.resetError();
      _services_ModalService__WEBPACK_IMPORTED_MODULE_4__["default"].findModal(this.$refs.pwdModal).hide().then(function () {
        _services_ModalService__WEBPACK_IMPORTED_MODULE_4__["default"].findModal(document.getElementById("login")).show();
      });
    },
    resetError: function resetError() {
      _services_ValidationService__WEBPACK_IMPORTED_MODULE_5__["default"].unmarkAllFields(this.$refs.pwdModal);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=template&id=7f94eb33&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=template&id=7f94eb33& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "reset-pwd-container login-pwd-reset",
      attrs: { id: "reset-pwd-form-" + _vm._uid, method: "post" }
    },
    [
      _c(
        "div",
        {
          ref: "pwdModal",
          staticClass: "modal fade",
          attrs: { id: "resetPwd", tabindex: "-1", role: "dialog" }
        },
        [
          _c("div", { staticClass: "modal-dialog" }, [
            _c("div", { staticClass: "modal-content" }, [
              _c("div", { staticClass: "modal-header" }, [
                _c("div", { staticClass: "modal-title h3" }, [
                  _vm._v(
                    _vm._s(
                      _vm.$translate("Ceres::Template.loginForgotPassword")
                    )
                  )
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "close",
                    attrs: {
                      type: "button",
                      "data-dismiss": "modal",
                      "aria-hidden": "true"
                    }
                  },
                  [_vm._v("×")]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c(
                  "div",
                  { staticClass: "alert alert-info w-100 pwd-forgot-info" },
                  [
                    _c("span", { staticClass: "info-badge" }, [
                      _vm._v(
                        _vm._s(
                          _vm.$translate(
                            "Ceres::Template.loginForgotPasswordInfo"
                          )
                        )
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-12" }, [
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
                        type: "text",
                        name: "username",
                        autocomplete: "new-password",
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
                    }),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "input-unit no-bottom",
                        attrs: { "data-validate": "mail" }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.username,
                              expression: "username"
                            }
                          ],
                          attrs: {
                            type: "email",
                            name: "email",
                            autocomplete: "email",
                            id: "mail" + _vm._uid,
                            "data-autofocus": ""
                          },
                          domProps: { value: _vm.username },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.username = $event.target.value
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("label", { attrs: { for: "mail" + _vm._uid } }, [
                          _vm._v(
                            _vm._s(
                              _vm.$translate("Ceres::Template.loginEmail")
                            ) + "*"
                          )
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("span", { staticClass: "error-msg" }, [
                      _vm._v(
                        _vm._s(
                          _vm.$translate(
                            "Ceres::Template.loginEnterConfirmEmail"
                          )
                        )
                      )
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [
                _c(
                  "div",
                  [
                    _vm._t("extend-overlay-buttons"),
                    _vm._v(" "),
                    !!_vm.currentTemplate && _vm.currentTemplate != "tpl.login"
                      ? _c(
                          "button",
                          {
                            staticClass: "btn btn-danger btn-medium mr-2",
                            attrs: { type: "button" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.cancelResetPwd($event)
                              }
                            }
                          },
                          [
                            _c("i", {
                              staticClass: "fa fa-arrow-left",
                              attrs: { "aria-hidden": "true" }
                            }),
                            _vm._v(
                              "\n                                " +
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.loginBackToLogin"
                                  )
                                ) +
                                "\n                            "
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary btn-medium",
                        attrs: { disabled: _vm.isDisabled },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.validateResetPwd($event)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t\t\t\t" +
                            _vm._s(
                              _vm.$translate("Ceres::Template.loginSend")
                            ) +
                            "\n\t\t\t\t\t\t\t\t"
                        ),
                        _c("icon", {
                          attrs: {
                            icon: "paper-plane-o",
                            loading: _vm.isDisabled
                          }
                        })
                      ],
                      1
                    )
                  ],
                  2
                )
              ])
            ])
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/customer/login/ForgotPassword.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/ForgotPassword.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ForgotPassword_vue_vue_type_template_id_7f94eb33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ForgotPassword.vue?vue&type=template&id=7f94eb33& */ "./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=template&id=7f94eb33&");
/* harmony import */ var _ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ForgotPassword.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ForgotPassword_vue_vue_type_template_id_7f94eb33___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ForgotPassword_vue_vue_type_template_id_7f94eb33___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/login/ForgotPassword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ForgotPassword.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=template&id=7f94eb33&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=template&id=7f94eb33& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_7f94eb33___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ForgotPassword.vue?vue&type=template&id=7f94eb33& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/ForgotPassword.vue?vue&type=template&id=7f94eb33&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_7f94eb33___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ForgotPassword_vue_vue_type_template_id_7f94eb33___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-24.js.map