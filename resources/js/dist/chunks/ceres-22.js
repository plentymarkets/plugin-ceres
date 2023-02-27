"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");



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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; },
/* harmony export */   "staticRenderFns": function() { return /* binding */ staticRenderFns; }
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("form", {
    staticClass: "clearfix",
    attrs: {
      method: "post"
    },
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.submit();
      }
    }
  }, [_c("div", {
    staticClass: "input-unit mt-3"
  }, [_c("label", {
    staticClass: "disabled",
    attrs: {
      for: "new-mail" + _vm._uid
    }
  }, [_vm._v(_vm._s(_vm.$translate("Ceres::Template.myAccountNewEmail")))]), _vm._v(" "), _c("input", {
    staticClass: "form-control",
    attrs: {
      type: "email",
      name: "email",
      id: "new-mail" + _vm._uid,
      disabled: ""
    },
    domProps: {
      value: _vm.newMail
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "input-unit"
  }, [_c("label", {
    attrs: {
      for: "password" + _vm._uid
    }
  }, [_vm._v(_vm._s(_vm.$translate("Ceres::Template.loginPassword")))]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.password,
      expression: "password"
    }],
    staticClass: "form-control",
    attrs: {
      type: "password",
      name: "password",
      autocomplete: "current-password",
      id: "password" + _vm._uid
    },
    domProps: {
      value: _vm.password
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.password = $event.target.value;
      }
    }
  })]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-primary btn-appearance float-right btn-medium btn-xs-max-width",
    attrs: {
      type: "submit",
      disabled: _vm.isDisabled
    }
  }, [_c("span", [_vm._v(_vm._s(_vm.$translate("Ceres::Template.myAccountChangeEmail")))]), _vm._v(" "), _c("icon", {
    attrs: {
      icon: "envelope",
      loading: _vm.isDisabled
    }
  })], 1)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/src/app/components/customer/ChangeEmailForm.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ChangeEmailForm.vue ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChangeEmailForm.vue?vue&type=template&id=0bc3dede& */ "./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede&");
/* harmony import */ var _ChangeEmailForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChangeEmailForm.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ChangeEmailForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__.render,
  _ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/ChangeEmailForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ChangeEmailForm.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede& ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ChangeEmailForm_vue_vue_type_template_id_0bc3dede___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ChangeEmailForm.vue?vue&type=template&id=0bc3dede& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/customer/ChangeEmailForm.vue?vue&type=template&id=0bc3dede&");


/***/ })

}]);
//# sourceMappingURL=ceres-22.js.map