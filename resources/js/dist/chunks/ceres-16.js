"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[16],{

/***/ "./resources/js/src/app/components/basket/MailChangedInfo.vue":
/*!********************************************************************!*\
  !*** ./resources/js/src/app/components/basket/MailChangedInfo.vue ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MailChangedInfo.vue?vue&type=template&id=2e21aa14& */ "./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14&");
/* harmony import */ var _MailChangedInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MailChangedInfo.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MailChangedInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__.render,
  _MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
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

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
//
//
//
//
//

const ADDRESS_EMAIL_TYPE_ID = 5;

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "mail-changed-info",

    props:
    {
        userMail:
        {
            type: String,
            required: true
        }
    },
    
    computed:
    {
        showMailChanged()
        {
            return !!this.billingAddressMail && this.billingAddressMail !== this.userMail;
        },

        billingAddressMail()
        {
            let mail = ""

            this.$store.state.address.billingAddress?.options?.forEach(option =>
            {
                if (option.typeId === ADDRESS_EMAIL_TYPE_ID)
                {
                    mail = option.value;
                }
            });

            return mail;
        },

        isGuest()
        {
            return !this.$store.getters.isLoggedIn;
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MailChangedInfo.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14& ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MailChangedInfo_vue_vue_type_template_id_2e21aa14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MailChangedInfo.vue?vue&type=template&id=2e21aa14& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/MailChangedInfo.vue?vue&type=template&id=2e21aa14& ***!
  \******************************************************************************************************************************************************************************************************************************************/
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
  return _vm.showMailChanged && !_vm.isGuest
    ? _c("div", { staticClass: "mail-changed-info alert alert-info w-100" }, [
        _vm._v(
          "\n    " +
            _vm._s(
              _vm.$translate("Ceres::Template.checkoutChangedMail", {
                newMail: _vm.billingAddressMail,
                currMail: _vm.userMail,
              })
            ) +
            "\n"
        ),
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-16.js.map