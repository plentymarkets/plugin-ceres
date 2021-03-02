exports.ids = [25];
exports.modules = {

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
  return _c(
    "div",
    { staticClass: "container-max mt-5" },
    [
      _vm._ssrNode('<div class="row mb-5">', "</div>", [
        _vm._ssrNode(
          '<div class="col-sm-10 offset-sm-1 col-md-6 offset-md-3">',
          "</div>",
          [
            _vm._ssrNode(
              "<div>",
              "</div>",
              [
                _vm._ssrNode(
                  '<h1 class="login-view-title mb-5">' +
                    _vm._ssrEscape(
                      _vm._s(_vm.$translate("Ceres::Template.login"))
                    ) +
                    "</h1> "
                ),
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
              2
            ),
            _vm._ssrNode(
              ' <hr> <div class="row"><div' +
                _vm._ssrClass(
                  "col-sm-{% if 'my-account' not in backlink %}6{% else %}12{% endif %}",
                  {
                    "col-sm-6": !_vm.myAccountInBacklink,
                    "col-sm-12": _vm.myAccountInBacklink
                  }
                ) +
                "><a" +
                _vm._ssrAttr("href", _vm.registrationUrl) +
                ' class="btn btn-primary btn-block mb-3"><i aria-hidden="true" class="fa fa-user-plus"></i>' +
                _vm._ssrEscape(
                  "\n                        " +
                    _vm._s(_vm.$translate("Ceres::Template.loginRegister")) +
                    "\n                    "
                ) +
                "</a></div> " +
                (!_vm.myAccountInBacklink
                  ? '<div class="col-sm-6"><button class="btn btn-primary btn-block mb-3"><i aria-hidden="true" class="fa fa-shopping-bag"></i>' +
                    _vm._ssrEscape(
                      "\n                        " +
                        _vm._s(
                          _vm.$translate("Ceres::Template.loginOrderAsGuest")
                        ) +
                        "\n                    "
                    ) +
                    "</button></div>"
                  : "<!---->") +
                "</div> "
            ),
            _vm._t("additional-content-after-buttons")
          ],
          2
        )
      ]),
      _vm._ssrNode(" "),
      _vm._ssrNode(
        '<div tabindex="-1" role="dialog" class="modal fade">',
        "</div>",
        [
          _vm._ssrNode('<div class="modal-dialog">', "</div>", [
            _vm._ssrNode(
              '<div class="modal-content">',
              "</div>",
              [
                _vm._ssrNode(
                  '<div class="modal-header"><div class="modal-title h3">' +
                    _vm._ssrEscape(
                      _vm._s(
                        _vm.$translate("Ceres::Template.loginOrderAsGuest")
                      )
                    ) +
                    '</div> <button type="button" data-testing="guest-login-modal" data-dismiss="modal" aria-hidden="true" class="close">×</button></div> '
                ),
                _vm._ssrNode(
                  '<div class="modal-body">',
                  "</div>",
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
              ],
              2
            )
          ])
        ]
      )
    ],
    2
  )
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
  "58214da4"
  
)

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

};;
//# sourceMappingURL=ceres-server-25.js.map