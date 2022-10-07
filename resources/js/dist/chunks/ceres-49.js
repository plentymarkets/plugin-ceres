"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[49],{

/***/ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue":
/*!***********************************************************************************!*\
  !*** ./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74& */ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74&");
/* harmony import */ var _NewsletterUnsubscribeInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NewsletterUnsubscribeInput.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NewsletterUnsubscribeInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__.render,
  _NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
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

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var _services_ValidationService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/ValidationService */ "./resources/js/src/app/services/ValidationService.js");
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
/* harmony import */ var _services_UrlService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/UrlService */ "./resources/js/src/app/services/UrlService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
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









/* harmony default export */ __webpack_exports__["default"] = ({

    mixins: [_mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_5__.ButtonSizePropertyMixin],

    data()
    {
        return {
            email: "",
            isDisabled: false,
            honeypot: ""
        };
    },

    methods: {
        validateData()
        {
            this.isDisabled = true;

            _services_ValidationService__WEBPACK_IMPORTED_MODULE_1__["default"].validate($("#newsletter-unsubscribe-input-form_" + this._uid))
                .done(() =>
                {
                    this.save();
                })
                .fail(invalidFields =>
                {
                    _services_ValidationService__WEBPACK_IMPORTED_MODULE_1__["default"].markInvalidFields(invalidFields, "error");

                    this.isDisabled = false;
                });
        },

        save()
        {
            const urlParams = _services_UrlService__WEBPACK_IMPORTED_MODULE_3__["default"].getUrlParams(document.location.search);

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_4__.isUndefined)( urlParams.folderId ))
            {
                urlParams.folderId = 0;
            }

            _services_ApiService__WEBPACK_IMPORTED_MODULE_0__["default"].del("/rest/io/customer/newsletter/" + this.email, { "emailFolder": urlParams.folderId, "honeypot": this.honeypot })
                .done(() =>
                {
                    _services_NotificationService__WEBPACK_IMPORTED_MODULE_2__["default"].success(
                        this.$translate("Ceres::Template.newsletterOptOutSuccessMessage")
                    ).closeAfter(3000);
                    this.resetInputs();
                })
                .fail(() =>
                {
                    _services_NotificationService__WEBPACK_IMPORTED_MODULE_2__["default"].error(
                        this.$translate("Ceres::Template.newsletterOptOutErrorMessage")
                    ).closeAfter(5000);
                })
                .always(() =>
                {
                    this.isDisabled = false;
                });
        },

        resetInputs()
        {
            this.email = "";
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewsletterUnsubscribeInput.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74& ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NewsletterUnsubscribeInput_vue_vue_type_template_id_e2350d74___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/newsletter/NewsletterUnsubscribeInput.vue?vue&type=template&id=e2350d74& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
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
      attrs: {
        id: "newsletter-unsubscribe-input-form_" + _vm._uid,
        method: "post",
      },
      on: {
        submit: function ($event) {
          $event.preventDefault()
          return _vm.validateData($event)
        },
      },
    },
    [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-12" }, [
          _c(
            "div",
            {
              staticClass: "input-unit mt-3",
              attrs: { "data-validate": "mail" },
            },
            [
              _c("label", { attrs: { for: "email-input-id" } }, [
                _vm._v(
                  _vm._s(_vm.$translate("Ceres::Template.newsletterEmail"))
                ),
              ]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.email,
                    expression: "email",
                  },
                ],
                staticClass: "form-control",
                attrs: {
                  type: "email",
                  name: "email",
                  autocomplete: "email",
                  id: "email-input-id",
                  "data-testing": "unsub-nl-mail",
                },
                domProps: { value: _vm.email },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.email = $event.target.value
                  },
                },
              }),
            ]
          ),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.honeypot,
                expression: "honeypot",
              },
            ],
            staticClass: "honey",
            attrs: {
              type: "text",
              name: "username",
              autocomplete: "new-password",
              tabindex: "-1",
            },
            domProps: { value: _vm.honeypot },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.honeypot = $event.target.value
              },
            },
          }),
          _vm._v(" "),
          _c("span", { staticClass: "input-group-btn" }, [
            _c(
              "button",
              {
                staticClass:
                  "btn btn-primary btn-appearance float-right btn-medium btn-xs-max-width",
                class: _vm.buttonSizeClass,
                attrs: {
                  type: "submit",
                  disabled: _vm.isDisabled,
                  "data-testing": "unsub-nl-send",
                },
                on: { click: _vm.validateData },
              },
              [
                _c("icon", {
                  attrs: { icon: "paper-plane-o", loading: _vm.isDisabled },
                }),
                _vm._v(" "),
                _c("span", [
                  _vm._v(
                    _vm._s(
                      _vm.$translate(
                        "Ceres::Template.newsletterUnsubscribeButtonLabel"
                      )
                    )
                  ),
                ]),
              ],
              1
            ),
          ]),
        ]),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/mixins/buttonSizeProperty.mixin.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonSizePropertyMixin": function() { return /* binding */ ButtonSizePropertyMixin; }
/* harmony export */ });
const BUTTON_SIZES = ["btn-sm", "btn-lg"];

const LEGACY_CLASS_MAP = {
    "sm": "btn-sm",
    "md": "",
    "lg": "btn-lg"
};

const ButtonSizePropertyMixin =
{
    props: {
        buttonSize:
        {
            type: [String, null],
            default: null,
            validator: value =>
            {
                return [
                    "",
                    ...BUTTON_SIZES,
                    ...Object.keys(LEGACY_CLASS_MAP)
                ].indexOf(value) !== -1;
            }
        }
    },

    computed: {
        buttonSizeClass()
        {
            if (LEGACY_CLASS_MAP.hasOwnProperty(this.buttonSize))
            {
                return LEGACY_CLASS_MAP[this.buttonSize];
            }

            return this.buttonSize;
        }
    }
};


/***/ })

}]);
//# sourceMappingURL=ceres-49.js.map