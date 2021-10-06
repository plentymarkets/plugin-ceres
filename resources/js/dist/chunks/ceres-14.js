(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/Login.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/login/Login.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../mixins/buttonSizeProperty.mixin */ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js");
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
/* harmony import */ var _services_ModalService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/ModalService */ "./resources/js/src/app/services/ModalService.js");
/* harmony import */ var _services_AutoFocusService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/AutoFocusService */ "./resources/js/src/app/services/AutoFocusService.js");
/* harmony import */ var _services_ValidationService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/ValidationService */ "./resources/js/src/app/services/ValidationService.js");
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







/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [_mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_1__["ButtonSizePropertyMixin"]],
  props: {
    backlink: {
      type: String
    },
    modalElement: {
      type: String
    },
    hasToForward: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      password: "",
      username: "",
      loginFields: [],
      isDisabled: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.loginFields = _this.$refs.loginForm.querySelectorAll(".input-unit");
      _services_AutoFocusService__WEBPACK_IMPORTED_MODULE_5__["default"].triggerAutoFocus();
    });
  },
  watch: {
    password: function password(val, oldVal) {
      this.resetError();
    },
    username: function username(val, oldVal) {
      this.resetError();
    }
  },
  methods: {
    /**
     * Open the login modal
     */
    showLogin: function showLogin() {
      _services_ModalService__WEBPACK_IMPORTED_MODULE_4__["default"].findModal(document.getElementById(this.modalElement)).show();
    },
    validateLogin: function validateLogin() {
      var _this2 = this;

      _services_ValidationService__WEBPACK_IMPORTED_MODULE_6__["default"].validate($("#login-form-" + this._uid)).done(function () {
        _this2.sendLogin();
      }).fail(function (invalidFields) {
        _services_ValidationService__WEBPACK_IMPORTED_MODULE_6__["default"].markInvalidFields(invalidFields, "error");
      });
    },

    /**
     * Send the login data
     */
    sendLogin: function sendLogin() {
      var _this3 = this;

      this.isDisabled = true;
      _services_ApiService__WEBPACK_IMPORTED_MODULE_2__["default"].post("/rest/io/customer/login", {
        email: this.username,
        password: this.password
      }, {
        supressNotifications: true
      }).done(function (response) {
        _services_ApiService__WEBPACK_IMPORTED_MODULE_2__["default"].setToken(response);
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_3__["default"].success(_this3.$translate("Ceres::Template.loginSuccessful")).closeAfter(3000);

        if (_this3.backlink !== null && _this3.backlink) {
          location.assign(decodeURIComponent(_this3.backlink));
        } else if (_this3.hasToForward) {
          location.assign(location.origin);
        } else {
          location.reload();
        }
      }).fail(function (response) {
        _this3.isDisabled = false;

        switch (response.error.code) {
          case 401:
            _this3.loginFields.forEach(function (element) {
              return element.classList.add("has-login-error");
            });

            var translationKey = "Ceres::Template.loginFailed";

            if (response.error.message.length > 0 && response.error.message === "user is blocked") {
              translationKey = "Ceres::Template.loginBlocked";
            }

            _services_NotificationService__WEBPACK_IMPORTED_MODULE_3__["default"].error(_this3.$translate(translationKey)).closeAfter(10000);
            break;

          default:
            return;
        }
      });
    },
    showResetPwdView: function showResetPwdView() {
      var _this4 = this;

      this.resetError();
      this.$store.dispatch("loadComponent", "forgot-password-modal");
      Vue.nextTick(function () {
        var modalDOM = document.querySelector('#resetPwd');
        var modalVue = Object(_helper_utils__WEBPACK_IMPORTED_MODULE_7__["getContainingComponent"])(modalDOM);
        modalVue.$data.username = _this4.username;

        var showModal = function showModal() {
          return _services_ModalService__WEBPACK_IMPORTED_MODULE_4__["default"].findModal(modalDOM).show();
        };

        if (_this4.modalElement) {
          _services_ModalService__WEBPACK_IMPORTED_MODULE_4__["default"].findModal(document.getElementById(_this4.modalElement)).hide().then(showModal);
        } else {
          showModal();
        }
      });
    },
    resetError: function resetError() {
      this.loginFields.forEach(function (element) {
        return element.classList.remove("has-login-error");
      });
      _services_ValidationService__WEBPACK_IMPORTED_MODULE_6__["default"].unmarkAllFields("#login-form-" + this._uid);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/Login.vue?vue&type=template&id=0f0e37b8&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/login/Login.vue?vue&type=template&id=0f0e37b8& ***!
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
  return _c("div", { staticClass: "login-pwd-reset" }, [
    _c(
      "form",
      {
        ref: "loginForm",
        attrs: { id: "login-form-" + _vm._uid, method: "post" }
      },
      [
        _c("div", { class: { "modal-body": _vm.modalElement } }, [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
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
                      "data-testing": "email-login",
                      type: "email",
                      name: "email",
                      autocomplete: "email",
                      id: "email" + _vm._uid,
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
                  _c("label", { attrs: { for: "email" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.loginEmail")) + "*"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "error-msg" }, [
                _vm._v(
                  _vm._s(
                    _vm.$translate("Ceres::Template.loginEnterConfirmEmail")
                  )
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  class: { "no-bottom": _vm.modalElement },
                  attrs: { "data-validate": "text" }
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.password,
                        expression: "password"
                      }
                    ],
                    attrs: {
                      "data-testing": "password-login",
                      type: "password",
                      name: "password",
                      autocomplete: "current-password",
                      id: "password" + _vm._uid
                    },
                    domProps: { value: _vm.password },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.password = $event.target.value
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "password" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.loginPassword")) +
                        "*"
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "error-msg" }, [
                _vm._v(
                  _vm._s(_vm.$translate("Ceres::Template.loginEmptyPassword"))
                )
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            class: {
              "modal-footer justify-content-between": _vm.modalElement,
              row: !_vm.modalElement
            }
          },
          [
            _c("div", { class: { "col-7 col-sm-4": !_vm.modalElement } }, [
              _c(
                "a",
                {
                  staticClass: "small text-appearance",
                  attrs: { href: "javascript:void(0)" },
                  on: { click: _vm.showResetPwdView }
                },
                [
                  _vm._v(
                    _vm._s(
                      _vm.$translate("Ceres::Template.loginForgotPassword")
                    ) + "?"
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { class: { "col-5 col-sm-8 text-sm-right": !_vm.modalElement } },
              [
                _vm._t("extend-overlay-buttons"),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary btn-appearance btn-medium",
                    class: [
                      { "float-right": !_vm.modalElement },
                      _vm.buttonSizeClass
                    ],
                    attrs: {
                      "data-testing": "submit-login",
                      disabled: _vm.isDisabled
                    },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.validateLogin($event)
                      }
                    }
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.$translate("Ceres::Template.login")) +
                        "\n                    "
                    ),
                    _c("icon", {
                      attrs: { icon: "user", loading: _vm.isDisabled }
                    })
                  ],
                  1
                )
              ],
              2
            )
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/customer/login/Login.vue":
/*!******************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/Login.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_0f0e37b8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=0f0e37b8& */ "./resources/js/src/app/components/customer/login/Login.vue?vue&type=template&id=0f0e37b8&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/login/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_0f0e37b8___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_0f0e37b8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/login/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/login/Login.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/Login.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/login/Login.vue?vue&type=template&id=0f0e37b8&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/Login.vue?vue&type=template&id=0f0e37b8& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_0f0e37b8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=template&id=0f0e37b8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/Login.vue?vue&type=template&id=0f0e37b8&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_0f0e37b8___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_0f0e37b8___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/mixins/buttonSizeProperty.mixin.js ***!
  \*****************************************************************/
/*! exports provided: ButtonSizePropertyMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonSizePropertyMixin", function() { return ButtonSizePropertyMixin; });
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }














var BUTTON_SIZES = ["btn-sm", "btn-lg"];
var LEGACY_CLASS_MAP = {
  "sm": "btn-sm",
  "md": "",
  "lg": "btn-lg"
};
var ButtonSizePropertyMixin = {
  props: {
    buttonSize: {
      type: [String, null],
      default: null,
      validator: function validator(value) {
        return [""].concat(BUTTON_SIZES, _toConsumableArray(Object.keys(LEGACY_CLASS_MAP))).indexOf(value) !== -1;
      }
    }
  },
  computed: {
    buttonSizeClass: function buttonSizeClass() {
      if (LEGACY_CLASS_MAP.hasOwnProperty(this.buttonSize)) {
        return LEGACY_CLASS_MAP[this.buttonSize];
      }

      return this.buttonSize;
    }
  }
};

/***/ })

}]);
//# sourceMappingURL=ceres-14.js.map