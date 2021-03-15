(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[42],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.string.search.js */ "./node_modules/core-js/modules/es.string.search.js");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/ValidationService */ "./resources/js/src/app/services/ValidationService.js");
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
/* harmony import */ var _services_UrlService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/UrlService */ "./resources/js/src/app/services/UrlService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var _mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../mixins/buttonSizeProperty.mixin */ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js");


//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_7__["ButtonSizePropertyMixin"]],
  data: function data() {
    return {
      email: "",
      isDisabled: false,
      honeypot: ""
    };
  },
  methods: {
    validateData: function validateData() {
      var _this = this;

      this.isDisabled = true;
      _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__["default"].validate($("#newsletter-unsubscribe-input-form_" + this._uid)).done(function () {
        _this.save();
      }).fail(function (invalidFields) {
        _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__["default"].markInvalidFields(invalidFields, "error");
        _this.isDisabled = false;
      });
    },
    save: function save() {
      var _this2 = this;

      var urlParams = _services_UrlService__WEBPACK_IMPORTED_MODULE_5__["default"].getUrlParams(document.location.search);

      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_6__["isUndefined"])(urlParams.folderId)) {
        urlParams.folderId = 0;
      }

      _services_ApiService__WEBPACK_IMPORTED_MODULE_2__["default"].del("/rest/io/customer/newsletter/" + this.email, {
        "emailFolder": urlParams.folderId,
        "honeypot": this.honeypot
      }).done(function () {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_4__["default"].success(_this2.$translate("Ceres::Template.newsletterOptOutSuccessMessage")).closeAfter(3000);

        _this2.resetInputs();
      }).fail(function () {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_4__["default"].error(_this2.$translate("Ceres::Template.newsletterOptOutErrorMessage")).closeAfter(5000);
      }).always(function () {
        _this2.isDisabled = false;
      });
    },
    resetInputs: function resetInputs() {
      this.email = "";
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
      attrs: {
        id: "newsletter-unsubscribe-input-form_" + _vm._uid,
        method: "post"
      },
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.validateData($event)
        }
      }
    },
    [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12" }, [
          _c(
            "div",
            {
              staticClass: "input-unit mt-3",
              attrs: { "data-validate": "mail" }
            },
            [
              _c("label", { attrs: { for: "email-input-id" } }, [
                _vm._v(
                  _vm._s(_vm.$translate("Ceres::Template.newsletterEmail"))
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
                staticClass: "form-control",
                attrs: {
                  type: "email",
                  name: "email",
                  autocomplete: "email",
                  id: "email-input-id"
                },
                domProps: { value: _vm.email },
                on: {
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
          _c("span", { staticClass: "input-group-btn" }, [
            _c(
              "button",
              {
                staticClass:
                  "btn btn-primary btn-appearance float-right btn-medium btn-xs-max-width",
                class: _vm.buttonSizeClass,
                attrs: { type: "submit", disabled: _vm.isDisabled },
                on: { click: _vm.validateData }
              },
              [
                _c("icon", {
                  attrs: { icon: "paper-plane-o", loading: _vm.isDisabled }
                }),
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    _vm._s(
                      _vm.$translate(
                        "Ceres::Template.newsletterUnsubscribeButtonLabel"
                      )
                    )
                  )
                ])
              ],
              1
            )
          ])
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue":
/*!***********************************************************************************!*\
  !*** ./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74& */ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74&");
/* harmony import */ var _NewsletterUnsubscribeInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewsletterUnsubscribeInput.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewsletterUnsubscribeInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewsletterUnsubscribeInput.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-42.js.map