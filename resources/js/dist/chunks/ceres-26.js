"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[26],{

/***/ "./resources/js/src/app/components/customer/login/GuestLogin.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/GuestLogin.vue ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GuestLogin_vue_vue_type_template_id_3b2359c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuestLogin.vue?vue&type=template&id=3b2359c6& */ "./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=template&id=3b2359c6&");
/* harmony import */ var _GuestLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GuestLogin.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GuestLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GuestLogin_vue_vue_type_template_id_3b2359c6___WEBPACK_IMPORTED_MODULE_0__.render,
  _GuestLogin_vue_vue_type_template_id_3b2359c6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/login/GuestLogin.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../mixins/buttonSizeProperty.mixin */ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js");
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var _services_AutoFocusService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/AutoFocusService */ "./resources/js/src/app/services/AutoFocusService.js");
/* harmony import */ var _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/ValidationService */ "./resources/js/src/app/services/ValidationService.js");
/* harmony import */ var _services_UrlService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/UrlService */ "./resources/js/src/app/services/UrlService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var _services_ModalService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/ModalService */ "./resources/js/src/app/services/ModalService.js");
//
//
//
//
//
//
//
//
//
//
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
    mixins: [_mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_0__.ButtonSizePropertyMixin],

    props: {
        backlink:
        {
            type: String
        },
        initialEmail:
        {
            type: String,
            default: ""
        }
    },

    data()
    {
        return {
            email: "",
            isDisabled: false
        };
    },

    created()
    {
        if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_5__.isNullOrUndefined)(this.initialEmail) && this.initialEmail.length > 0)
        {
            this.email = this.initialEmail;
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            const modal = _services_ModalService__WEBPACK_IMPORTED_MODULE_6__["default"].findModal(this.$parent.$refs.guestModal);

            // for old login view only (input in modal)
            if(!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_5__.isNullOrUndefined)(modal))
            {
                modal.on("hidden.bs.modal", () =>
                {
                    this.email = "";
                    _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__["default"].unmarkAllFields(this.$refs.form);
                });
            }

            if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_5__.isDefined)(modal))
            {
                modal.on("shown.bs.modal", () =>
                {
                    _services_AutoFocusService__WEBPACK_IMPORTED_MODULE_2__["default"].triggerAutoFocus(modal);
                });
            }
        });
    },

    methods:
    {
        validate()
        {
            _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__["default"].validate(this.$refs.form)
                .done(() =>
                {
                    this.authGuest();
                })
                .fail(invalidFields =>
                {
                    _services_ValidationService__WEBPACK_IMPORTED_MODULE_3__["default"].markInvalidFields(invalidFields, "error");
                });
        },

        authGuest()
        {
            this.isDisabled = true;

            _services_ApiService__WEBPACK_IMPORTED_MODULE_1__["default"].post("/rest/io/guest", { email: this.email })
                .done(() =>
                {
                    (0,_services_UrlService__WEBPACK_IMPORTED_MODULE_4__.navigateTo)(
                        (0,_helper_utils__WEBPACK_IMPORTED_MODULE_5__.isDefined)(this.backlink) && this.backlink.length ? decodeURIComponent(this.backlink) : window.location.origin + (App.urls.includeLanguage ? "/" + App.language : "")
                    );
                })
                .fail(() =>
                {
                    this.isDisabled = false;
                });
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_GuestLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GuestLogin.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestLogin_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=template&id=3b2359c6&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=template&id=3b2359c6& ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestLogin_vue_vue_type_template_id_3b2359c6___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestLogin_vue_vue_type_template_id_3b2359c6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GuestLogin_vue_vue_type_template_id_3b2359c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./GuestLogin.vue?vue&type=template&id=3b2359c6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=template&id=3b2359c6&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=template&id=3b2359c6&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/login/GuestLogin.vue?vue&type=template&id=3b2359c6& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", [
    _c(
      "form",
      {
        ref: "form",
        staticClass: "mb-3 login-pwd-reset",
        attrs: { method: "post" },
      },
      [
        _c(
          "div",
          { staticClass: "input-unit", attrs: { "data-validate": "mail" } },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.email,
                  expression: "email",
                },
              ],
              attrs: {
                type: "email",
                name: "email",
                autocomplete: "email",
                "data-testing": "guest-login-input",
                id: _vm._uid,
                "data-autofocus": "",
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
            _vm._v(" "),
            _c("label", { attrs: { for: _vm._uid } }, [
              _vm._v(
                _vm._s(_vm.$translate("Ceres::Template.loginEmail")) + "*"
              ),
            ]),
          ]
        ),
        _vm._v(" "),
        _c("span", { staticClass: "error-msg" }, [
          _vm._v(
            _vm._s(_vm.$translate("Ceres::Template.loginEnterConfirmEmail"))
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "text-right" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-primary btn-medium btn-appearance",
              class: _vm.buttonSizeClass,
              attrs: {
                disabled: _vm.isDisabled,
                "data-testing": "guest-login-button",
              },
              on: {
                click: function ($event) {
                  $event.preventDefault()
                  return _vm.validate($event)
                },
              },
            },
            [
              _vm._v(
                "\n                " +
                  _vm._s(_vm.$translate("Ceres::Template.loginNext")) +
                  "\n                "
              ),
              _c("icon", {
                attrs: { icon: "arrow-right", loading: _vm.isDisabled },
              }),
            ],
            1
          ),
        ]),
      ]
    ),
  ])
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
//# sourceMappingURL=ceres-26.js.map