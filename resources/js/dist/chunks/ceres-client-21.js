(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_0__);

//
//
//
//
//
var ADDRESS_EMAIL_TYPE_ID = 5;
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "mail-changed-info",
  props: {
    userMail: {
      type: String,
      required: true
    }
  },
  computed: {
    showMailChanged: function showMailChanged() {
      return !!this.billingAddressMail && this.billingAddressMail !== this.userMail;
    },
    billingAddressMail: function billingAddressMail() {
      var _this$$store$state$ad, _this$$store$state$ad2;

      var mail = "";
      (_this$$store$state$ad = this.$store.state.address.billingAddress) === null || _this$$store$state$ad === void 0 ? void 0 : (_this$$store$state$ad2 = _this$$store$state$ad.options) === null || _this$$store$state$ad2 === void 0 ? void 0 : _this$$store$state$ad2.forEach(function (option) {
        if (option.typeId === ADDRESS_EMAIL_TYPE_ID) {
          mail = option.value;
        }
      });
      return mail;
    },
    isGuest: function isGuest() {
      return !this.$store.getters.isLoggedIn;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
  return _vm.showMailChanged && !_vm.isGuest
    ? _c("div", { staticClass: "mail-changed-info alert alert-info w-100" }, [
        _vm._v(
          "\n    " +
            _vm._s(
              _vm.$translate("Ceres::Template.checkoutChangedMail", {
                newMail: _vm.billingAddressMail,
                currMail: _vm.userMail
              })
            ) +
            "\n"
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/basket/MailChangedInfo.vue":
/*!********************************************************************!*\
  !*** ./resources/js/src/app/components/basket/MailChangedInfo.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MailChangedInfo.vue?vue&type=template&id=2e21aa14& */ "./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14&");
/* harmony import */ var _MailChangedInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MailChangedInfo.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MailChangedInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/basket/MailChangedInfo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./MailChangedInfo.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./MailChangedInfo.vue?vue&type=template&id=2e21aa14& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-21.js.map