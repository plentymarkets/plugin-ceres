exports.ids = [22];
exports.modules = {

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");

//
//
//
//
//
//
//
//
//
//
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
    contactId: {
      type: Number,
      required: true
    },
    hash: {
      type: String,
      required: true
    },
    newMail: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      password: "",
      isDisabled: false
    };
  },
  methods: {
    /**
     * Send the login data
     */
    submit: function submit() {
      var _this = this;

      this.isDisabled = true;
      _services_ApiService__WEBPACK_IMPORTED_MODULE_2__["default"].put("/rest/io/customer/mail/" + this.contactId, {
        password: this.password,
        hash: this.hash
      }).done(function (response) {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_1__["default"].success(_this.$translate("Ceres::Template.myAccountChangeEmailSuccessful")).closeAfter(3000);
        window.location.assign(window.location.origin);
      }).fail(function () {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_1__["default"].error(_this.$translate("Ceres::Template.myAccountChangeEmailFailed")).closeAfter(10000);
      }).always(function () {
        _this.isDisabled = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede& ***!
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
    "form",
    {
      staticClass: "clearfix",
      attrs: { method: "post" },
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.submit()
        }
      }
    },
    [
      _vm._ssrNode(
        '<div class="input-unit mt-3"><label' +
          _vm._ssrAttr("for", "new-mail" + _vm._uid) +
          ' class="disabled">' +
          _vm._ssrEscape(
            _vm._s(_vm.$translate("Ceres::Template.myAccountNewEmail"))
          ) +
          '</label> <input type="email" name="email"' +
          _vm._ssrAttr("id", "new-mail" + _vm._uid) +
          ' disabled="disabled"' +
          _vm._ssrAttr("value", _vm.newMail) +
          ' class="form-control"></div> <div class="input-unit"><label' +
          _vm._ssrAttr("for", "password" + _vm._uid) +
          ">" +
          _vm._ssrEscape(
            _vm._s(_vm.$translate("Ceres::Template.loginPassword"))
          ) +
          '</label> <input type="password" name="password" autocomplete="current-password"' +
          _vm._ssrAttr("id", "password" + _vm._uid) +
          _vm._ssrAttr("value", _vm.password) +
          ' class="form-control"></div> '
      ),
      _vm._ssrNode(
        '<button type="submit"' +
          _vm._ssrAttr("disabled", _vm.isDisabled) +
          ' class="btn btn-primary btn-appearance float-right btn-medium btn-xs-max-width">',
        "</button>",
        [
          _vm._ssrNode(
            "<span>" +
              _vm._ssrEscape(
                _vm._s(_vm.$translate("Ceres::Template.myAccountChangeEmail"))
              ) +
              "</span> "
          ),
          _c("icon", { attrs: { icon: "envelope", loading: _vm.isDisabled } })
        ],
        2
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/customer/ChangeEmailForm.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ChangeEmailForm.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChangeEmailForm.vue?vue&type=template&id=0bc3dede& */ "./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede&");
/* harmony import */ var _ChangeEmailForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChangeEmailForm.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ChangeEmailForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  "730d6ada"
  
)

component.options.__file = "resources/js/src/app/components/customer/ChangeEmailForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ChangeEmailForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ChangeEmailForm.vue?vue&type=template&id=0bc3dede& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

};;
//# sourceMappingURL=ceres-server-22.js.map