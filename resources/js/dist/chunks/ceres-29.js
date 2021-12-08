(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_ModalService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/ModalService */ "./resources/js/src/app/services/ModalService.js");


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    backlink: {
      type: String,
      default: ""
    },
    guestEmail: {
      type: String
    }
  },
  computed: {
    registrationUrl: function registrationUrl() {
      if (this.backlink !== "") {
        return App.urls.registration + "?backlink=" + this.sanitizedBacklink;
      }

      return App.urls.registration;
    },
    sanitizedBacklink: function sanitizedBacklink() {
      return encodeURI(this.backlink);
    },
    myAccountInBacklink: function myAccountInBacklink() {
      return this.backlink.includes(App.urls.myAccount);
    }
  },
  methods: {
    openGuestModal: function openGuestModal() {
      _services_ModalService__WEBPACK_IMPORTED_MODULE_2__["default"].findModal(this.$refs.guestModal).show();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=template&id=06b1fb2e&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=template&id=06b1fb2e& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "container-max mt-5" }, [
    _c("div", { staticClass: "row mb-5" }, [
      _c(
        "div",
        { staticClass: "col-sm-10 offset-sm-1 col-md-6 offset-md-3" },
        [
          _c(
            "div",
            [
              _c("h1", { staticClass: "login-view-title mb-5" }, [
                _vm._v(_vm._s(_vm.$translate("Ceres::Template.login")))
              ]),
              _vm._v(" "),
              _c("login", {
                attrs: {
                  backlink: _vm.sanitizedBacklink,
                  "has-to-forward": true
                },
                scopedSlots: _vm._u(
                  [
                    {
                      key: "extend-overlay-buttons",
                      fn: function() {
                        return [_vm._t("extend-overlay-buttons")]
                      },
                      proxy: true
                    }
                  ],
                  null,
                  true
                )
              })
            ],
            1
          ),
          _vm._v(" "),
          _c("hr"),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c(
              "div",
              {
                staticClass:
                  "col-sm-{% if 'my-account' not in backlink %}6{% else %}12{% endif %}",
                class: {
                  "col-sm-6": !_vm.myAccountInBacklink,
                  "col-sm-12": _vm.myAccountInBacklink
                }
              },
              [
                _c(
                  "a",
                  {
                    staticClass: "btn btn-primary btn-block mb-3",
                    attrs: { href: _vm.registrationUrl }
                  },
                  [
                    _c("i", {
                      staticClass: "fa fa-user-plus",
                      attrs: { "aria-hidden": "true" }
                    }),
                    _vm._v(
                      "\n                        " +
                        _vm._s(
                          _vm.$translate("Ceres::Template.loginRegister")
                        ) +
                        "\n                    "
                    )
                  ]
                )
              ]
            ),
            _vm._v(" "),
            !_vm.myAccountInBacklink
              ? _c("div", { staticClass: "col-sm-6" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary btn-block mb-3",
                      on: {
                        click: function($event) {
                          return _vm.openGuestModal()
                        }
                      }
                    },
                    [
                      _c("i", {
                        staticClass: "fa fa-shopping-bag",
                        attrs: { "aria-hidden": "true" }
                      }),
                      _vm._v(
                        "\n                        " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.loginOrderAsGuest")
                          ) +
                          "\n                    "
                      )
                    ]
                  )
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _vm._t("additional-content-after-buttons")
        ],
        2
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        ref: "guestModal",
        staticClass: "modal fade",
        attrs: { tabindex: "-1", role: "dialog" }
      },
      [
        _c("div", { staticClass: "modal-dialog" }, [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _c("div", { staticClass: "modal-title h3" }, [
                _vm._v(
                  _vm._s(_vm.$translate("Ceres::Template.loginOrderAsGuest"))
                )
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "close",
                  attrs: {
                    type: "button",
                    "data-testing": "guest-login-modal",
                    "data-dismiss": "modal",
                    "aria-hidden": "true",
                    "aria-label": _vm.$translate("Ceres::Template.closeIcon")
                  }
                },
                [_vm._v("×")]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "modal-body" },
              [
                _c("guest-login", {
                  attrs: {
                    backlink: _vm.sanitizedBacklink,
                    "initial-email": _vm.guestEmail
                  }
                })
              ],
              1
            )
          ])
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/customer/login/LoginView.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/LoginView.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoginView_vue_vue_type_template_id_06b1fb2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginView.vue?vue&type=template&id=06b1fb2e& */ "./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=template&id=06b1fb2e&");
/* harmony import */ var _LoginView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginView.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LoginView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LoginView_vue_vue_type_template_id_06b1fb2e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoginView_vue_vue_type_template_id_06b1fb2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/login/LoginView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=template&id=06b1fb2e&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=template&id=06b1fb2e& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginView_vue_vue_type_template_id_06b1fb2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginView.vue?vue&type=template&id=06b1fb2e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/LoginView.vue?vue&type=template&id=06b1fb2e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginView_vue_vue_type_template_id_06b1fb2e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginView_vue_vue_type_template_id_06b1fb2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-29.js.map