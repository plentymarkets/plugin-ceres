(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);


//
//
//
//
var gRecaptchaApiLoaded;
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "recaptcha",
  data: function data() {
    return {
      version: App.config.global.googleRecaptchaVersion,
      apiKey: App.config.global.googleRecaptchaApiKey
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.createScript().then(function () {
        return _this.initializeV3();
      });
    });
  },
  methods: {
    createScript: function createScript() {
      var _this2 = this;

      if (!this.apiKey) {
        return Promise.resolve();
      }

      if (!gRecaptchaApiLoaded) {
        gRecaptchaApiLoaded = new Promise(function (resolve, reject) {
          var script = document.createElement("script");
          var scriptSource;

          if (_this2.version === 3) {
            scriptSource = "https://www.google.com/recaptcha/api.js?render=".concat(_this2.apiKey);
          } else {
            scriptSource = "https://www.google.com/recaptcha/api.js";
          }

          script.type = "text/javascript";
          script.id = "google-recaptcha-api";
          script.src = scriptSource;
          script.addEventListener("load", function () {
            return resolve(script);
          }, false);
          script.addEventListener("error", function () {
            return reject(script);
          }, false);
          document.body.appendChild(script);
        });
      }

      return gRecaptchaApiLoaded;
    },
    initializeV3: function initializeV3() {
      var _this3 = this;

      if (window.grecaptcha) {
        window.grecaptcha.ready(function () {
          if (_this3.version !== 3) {
            _this3.$el.dataset.recaptcha = window.grecaptcha.render(_this3.$el, {
              sitekey: _this3.apiKey,
              size: "invisible",
              badge: "bottomright",
              callback: _this3.recaptchaCallback.bind(_this3)
            });
          }
        });
      }
    },
    recaptchaCallback: function recaptchaCallback(response) {
      this.$el.querySelector("[name=\"g-recaptcha-response\"]").dispatchEvent(new CustomEvent("recaptcha-response", {
        response: response
      }));
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=template&id=4424f830&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=template&id=4424f830& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { attrs: { "data-recaptcha": "" } })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/customer/ReCaptcha.vue":
/*!****************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ReCaptcha.vue ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReCaptcha_vue_vue_type_template_id_4424f830___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReCaptcha.vue?vue&type=template&id=4424f830& */ "./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=template&id=4424f830&");
/* harmony import */ var _ReCaptcha_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReCaptcha.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ReCaptcha_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReCaptcha_vue_vue_type_template_id_4424f830___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReCaptcha_vue_vue_type_template_id_4424f830___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/ReCaptcha.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReCaptcha_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ReCaptcha.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReCaptcha_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=template&id=4424f830&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=template&id=4424f830& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReCaptcha_vue_vue_type_template_id_4424f830___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ReCaptcha.vue?vue&type=template&id=4424f830& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/ReCaptcha.vue?vue&type=template&id=4424f830&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReCaptcha_vue_vue_type_template_id_4424f830___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReCaptcha_vue_vue_type_template_id_4424f830___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-26.js.map