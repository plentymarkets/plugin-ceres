(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.define-properties */ "./node_modules/core-js/modules/es.object.define-properties.js");
/* harmony import */ var core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_properties__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.define-property */ "./node_modules/core-js/modules/es.object.define-property.js");
/* harmony import */ var core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_define_property__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.keys */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var _services_ValidationService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../services/ValidationService */ "./resources/js/src/app/services/ValidationService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    showRegistration: {
      type: Boolean,
      default: true
    }
  },
  computed: _objectSpread({
    myAccountUrl: function myAccountUrl() {
      return App.urls.myAccount;
    },
    isLogin: function isLogin() {
      return App.templateType === "login";
    },
    isRegister: function isRegister() {
      return App.templateType === "register";
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_12__["mapGetters"])(["username", "isLoggedIn"])),
  created: function created() {
    var _this = this;

    _services_ApiService__WEBPACK_IMPORTED_MODULE_9__["default"].get("/rest/io/customer", {}, {
      keepOriginalResponse: true
    }).done(function (response) {
      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_11__["isDefined"])(response.data)) {
        _this.$store.commit("setUserData", response.data);
      }
    });
  },

  /**
   * Add the global event listener for login and logout
   */
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.addEventListeners();
    });
  },
  methods: {
    /**
     * Adds login/logout event listeners
     */
    addEventListeners: function addEventListeners() {
      var _this3 = this;

      _services_ApiService__WEBPACK_IMPORTED_MODULE_9__["default"].listen("AfterAccountAuthentication", function (userData) {
        _this3.$store.commit("setUserData", userData.accountContact);
      });
      _services_ApiService__WEBPACK_IMPORTED_MODULE_9__["default"].listen("AfterAccountContactLogout", function () {
        _this3.$store.commit("setUserData", null);
      });
    },
    unmarkInputFields: function unmarkInputFields() {
      _services_ValidationService__WEBPACK_IMPORTED_MODULE_10__["default"].unmarkAllFields($("#login"));
      _services_ValidationService__WEBPACK_IMPORTED_MODULE_10__["default"].unmarkAllFields($("#registration"));
    },
    createLoginModal: function createLoginModal() {
      this.$root.$data.renderLoginModal = true;
    },
    createRegisterModal: function createRegisterModal() {
      this.$root.$data.renderRegisterModal = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=template&id=166fadbe&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=template&id=166fadbe& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { id: "position-relative" } }, [
    _vm.isLoggedIn
      ? _c("div", { staticClass: "dropdown" }, [
          _c(
            "a",
            {
              staticClass: "dropdown-toggle",
              attrs: {
                href: "#",
                id: "accountMenuList",
                "data-toggle": "dropdown",
                "aria-haspopup": "true",
                "aria-expanded": "false",
                "data-boundary": "window"
              }
            },
            [
              _c("i", {
                staticClass: "fa fa-user mr-1 d-sm-none",
                attrs: { "aria-hidden": "true" }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "d-none d-sm-inline" }, [
                _vm._v(
                  _vm._s(
                    _vm.$translate("Ceres::Template.loginHello", {
                      username: _vm.username
                    })
                  )
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "account-menu dropdown-menu small m-0 p-0" },
            [
              _c(
                "div",
                {
                  staticClass: "list-group",
                  attrs: { "aria-labelledby": "accountMenuList" }
                },
                [
                  _c(
                    "a",
                    {
                      staticClass: "list-group-item small",
                      attrs: { href: _vm.myAccountUrl }
                    },
                    [
                      _c("i", { staticClass: "fa fa-user" }),
                      _vm._v(
                        " " +
                          _vm._s(
                            _vm.$translate("Ceres::Template.loginMyAccount")
                          )
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      directives: [{ name: "logout", rawName: "v-logout" }],
                      staticClass: "list-group-item small",
                      attrs: { href: "#" }
                    },
                    [
                      _c("i", { staticClass: "fa fa-sign-out" }),
                      _vm._v(
                        " " +
                          _vm._s(_vm.$translate("Ceres::Template.loginLogout"))
                      )
                    ]
                  )
                ]
              )
            ]
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.isLoggedIn
      ? _c("div", [
          _c(
            "a",
            {
              attrs: {
                href: _vm.isLogin ? "javascript:void(0)" : "#login",
                "data-toggle": _vm.isLogin ? false : "modal"
              },
              on: {
                click: function($event) {
                  _vm.createLoginModal()
                  _vm.unmarkInputFields()
                }
              }
            },
            [
              _c("i", {
                staticClass: "fa fa-user mr-1",
                attrs: { "aria-hidden": "true" }
              }),
              _vm._v(" "),
              _c("span", { staticClass: "d-none d-sm-inline" }, [
                _vm._v(_vm._s(_vm.$translate("Ceres::Template.login")))
              ])
            ]
          ),
          _vm._v(" "),
          _vm.showRegistration ? _c("span", { staticClass: "pipe" }) : _vm._e(),
          _vm._v(" "),
          _vm.showRegistration
            ? _c(
                "a",
                {
                  attrs: {
                    href: _vm.isRegister
                      ? "javascript:void(0)"
                      : "#registration",
                    "data-toggle": _vm.isRegister ? false : "modal"
                  },
                  on: {
                    click: function($event) {
                      _vm.createRegisterModal()
                      _vm.unmarkInputFields()
                    }
                  }
                },
                [
                  _c("i", {
                    staticClass: "fa fa-user-plus mr-1",
                    attrs: { "aria-hidden": "true" }
                  }),
                  _vm._v(" "),
                  _c("span", { staticClass: "d-none d-sm-inline" }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.loginRegister"))
                    )
                  ])
                ]
              )
            : _vm._e()
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/customer/login/UserLoginHandler.vue":
/*!*****************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/UserLoginHandler.vue ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UserLoginHandler_vue_vue_type_template_id_166fadbe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserLoginHandler.vue?vue&type=template&id=166fadbe& */ "./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=template&id=166fadbe&");
/* harmony import */ var _UserLoginHandler_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserLoginHandler.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UserLoginHandler_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UserLoginHandler_vue_vue_type_template_id_166fadbe___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UserLoginHandler_vue_vue_type_template_id_166fadbe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/login/UserLoginHandler.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserLoginHandler_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/babel-loader/lib!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserLoginHandler.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_UserLoginHandler_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=template&id=166fadbe&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=template&id=166fadbe& ***!
  \************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserLoginHandler_vue_vue_type_template_id_166fadbe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib??vue-loader-options!./UserLoginHandler.vue?vue&type=template&id=166fadbe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/login/UserLoginHandler.vue?vue&type=template&id=166fadbe&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserLoginHandler_vue_vue_type_template_id_166fadbe___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserLoginHandler_vue_vue_type_template_id_166fadbe___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-31.js.map