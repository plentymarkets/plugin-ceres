"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[24],{

/***/ "./resources/js/src/app/components/customer/ResetPasswordForm.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ResetPasswordForm.vue ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ResetPasswordForm_vue_vue_type_template_id_771fa8e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ResetPasswordForm.vue?vue&type=template&id=771fa8e2& */ "./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=template&id=771fa8e2&");
/* harmony import */ var _ResetPasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResetPasswordForm.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ResetPasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ResetPasswordForm_vue_vue_type_template_id_771fa8e2___WEBPACK_IMPORTED_MODULE_0__.render,
  _ResetPasswordForm_vue_vue_type_template_id_771fa8e2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/ResetPasswordForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_ValidationService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/ValidationService */ "./resources/js/src/app/services/ValidationService.js");
/* harmony import */ var _services_UrlService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/UrlService */ "./resources/js/src/app/services/UrlService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

    name: "reset-password-form",

    props: {
        contactId:
        {
            type: Number,
            required: true
        },
        hash:
        {
            type: String,
            required: true
        }
    },

    data()
    {
        return {
            passwordFirst: "",
            passwordSecond: "",
            isDisabled: false
        };
    },

    methods: {

        validatePassword()
        {

            _services_ValidationService__WEBPACK_IMPORTED_MODULE_0__["default"].validate(this.$refs.resetPasswordForm)
                .done(() =>
                {
                    this.saveNewPassword();
                })
                .fail(invalidFields =>
                {
                    _services_ValidationService__WEBPACK_IMPORTED_MODULE_0__["default"].markInvalidFields(invalidFields, "has-error");
                    const validation = !(0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.isNullOrUndefined)(invalidFields[0]) ? invalidFields[0].dataset.validate : null;

                    if (validation === "password")
                    {
                        _services_NotificationService__WEBPACK_IMPORTED_MODULE_4__["default"].error(
                            this.$translate("Ceres::Template.resetPwInvalidPassword")
                        );
                    }
                    else if (validation === "ref")
                    {
                        _services_NotificationService__WEBPACK_IMPORTED_MODULE_4__["default"].error(
                            this.$translate("Ceres::Template.resetPwRepeatNewPassword")
                        );
                    }
                });
        },

        saveNewPassword()
        {
            this.isDisabled = true;

            _services_ApiService__WEBPACK_IMPORTED_MODULE_3__["default"].post("/rest/io/customer/password", { password: this.passwordFirst, password2: this.passwordSecond, contactId: this.contactId, hash: this.hash })
                .done(() =>
                {

                    (0,_services_UrlService__WEBPACK_IMPORTED_MODULE_1__.navigateTo)(window.location.origin);

                    _services_NotificationService__WEBPACK_IMPORTED_MODULE_4__["default"].success(
                        this.$translate("Ceres::Template.resetPwChangePasswordSuccessful")
                    ).closeAfter(3000);

                })
                .fail(() =>
                {
                    this.isDisabled = false;

                    _services_NotificationService__WEBPACK_IMPORTED_MODULE_4__["default"].error(
                        this.$translate("Ceres::Template.resetPwChangePasswordFailed")
                    ).closeAfter(5000);
                });
        }
    }

});


/***/ }),

/***/ "./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ResetPasswordForm.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPasswordForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=template&id=771fa8e2&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=template&id=771fa8e2& ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPasswordForm_vue_vue_type_template_id_771fa8e2___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPasswordForm_vue_vue_type_template_id_771fa8e2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ResetPasswordForm_vue_vue_type_template_id_771fa8e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ResetPasswordForm.vue?vue&type=template&id=771fa8e2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=template&id=771fa8e2&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=template&id=771fa8e2&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ResetPasswordForm.vue?vue&type=template&id=771fa8e2& ***!
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
  return _c(
    "form",
    {
      ref: "resetPasswordForm",
      staticClass: "w-100 clearfix",
      attrs: { method: "post" },
    },
    [
      _c(
        "div",
        {
          staticClass: "input-feedback-container",
          attrs: { "data-validate": "password" },
        },
        [
          _c(
            "div",
            { staticClass: "input-unit" },
            [
              _c("popper", {
                ref: "passwordHint",
                attrs: { trigger: "focus", placement: "bottom" },
                scopedSlots: _vm._u([
                  {
                    key: "handle",
                    fn: function () {
                      return [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.passwordFirst,
                              expression: "passwordFirst",
                            },
                          ],
                          attrs: {
                            type: "password",
                            name: "password",
                            autocomplete: "new-password",
                            id: _vm._uid + "password_first",
                          },
                          domProps: { value: _vm.passwordFirst },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.passwordFirst = $event.target.value
                            },
                          },
                        }),
                      ]
                    },
                    proxy: true,
                  },
                  {
                    key: "title",
                    fn: function () {
                      return [
                        _vm._v(
                          "\n                    " +
                            _vm._s(
                              _vm.$translate(
                                "Ceres::Template.resetPwPasswordHintTitle"
                              )
                            ) +
                            "\n                "
                        ),
                      ]
                    },
                    proxy: true,
                  },
                  {
                    key: "content",
                    fn: function () {
                      return [
                        _c("ul", { staticClass: "pl-3" }, [
                          _c("li", [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.resetPwPasswordHintLength"
                                )
                              )
                            ),
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.resetPwPasswordHintDigit"
                                )
                              )
                            ),
                          ]),
                          _vm._v(" "),
                          _c("li", [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.resetPwPasswordHintChar"
                                )
                              )
                            ),
                          ]),
                        ]),
                      ]
                    },
                    proxy: true,
                  },
                ]),
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: _vm._uid + "password_first" } }, [
                _vm._v(
                  _vm._s(_vm.$translate("Ceres::Template.resetPwNewPassword")) +
                    "*"
                ),
              ]),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "input-feedback-container",
          attrs: { "data-validate": "ref" },
        },
        [
          _c("div", { staticClass: "input-unit" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.passwordSecond,
                  expression: "passwordSecond",
                },
              ],
              attrs: {
                type: "password",
                name: "password",
                autocomplete: "new-password",
                id: _vm._uid + "password_second",
                "data-validate-ref": "#" + _vm._uid + "password_first",
              },
              domProps: { value: _vm.passwordSecond },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.passwordSecond = $event.target.value
                },
              },
            }),
            _vm._v(" "),
            _c("label", { attrs: { for: _vm._uid + "password_second" } }, [
              _vm._v(
                _vm._s(
                  _vm.$translate("Ceres::Template.resetPwRepeatPassword")
                ) + "*"
              ),
            ]),
          ]),
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-primary btn-appearance btn-large float-right",
          attrs: { disabled: _vm.isDisabled },
          on: {
            click: function ($event) {
              $event.preventDefault()
              return _vm.validatePassword($event)
            },
          },
        },
        [
          _c("span", [
            _vm._v(_vm._s(_vm.$translate("Ceres::Template.resetPwSave"))),
          ]),
          _vm._v(" "),
          _c("i", {
            staticClass: "fa fa-floppy-o",
            attrs: { "aria-hidden": "true" },
          }),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-24.js.map