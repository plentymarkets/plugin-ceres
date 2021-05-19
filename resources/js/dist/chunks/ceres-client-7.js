(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_0__);

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
  name: "accept-privacy-policy-check",
  props: {
    value: Boolean,
    showError: Boolean
  },
  computed: {
    labelHtml: function labelHtml() {
      var contactPrivacyPolicy = this.$translate("Ceres::Template.contactPrivacyPolicy", {
        "hyphen": "&shy;"
      });
      var html = "\n                <!----><a href=\"".concat(App.urls.privacyPolicy, "\" target=\"_blank\" class=\"text-appearance\">\n                    <span>").concat(contactPrivacyPolicy, "</span>\n                </a><!---->\n            ");
      return this.$translate("Ceres::Template.contactAcceptPrivacyPolicy", {
        policy: html
      });
    }
  },
  methods: {
    onValueChanged: function onValueChanged(value) {
      this.$emit("input", value);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/Registration.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/Registration.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.assign.js */ "./node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _services_ValidationService__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../services/ValidationService */ "./resources/js/src/app/services/ValidationService.js");
/* harmony import */ var _services_UrlService__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../services/UrlService */ "./resources/js/src/app/services/UrlService.js");
/* harmony import */ var _helper_executeReCaptcha__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../helper/executeReCaptcha */ "./resources/js/src/app/helper/executeReCaptcha.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var _mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../mixins/buttonSizeProperty.mixin */ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js");
/* harmony import */ var _AddressInputGroup_vue__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./AddressInputGroup.vue */ "./resources/js/src/app/components/customer/AddressInputGroup.vue");
/* harmony import */ var _services_ApiService__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../services/ApiService */ "./resources/js/src/app/services/ApiService.js");
/* harmony import */ var _services_NotificationService__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../services/NotificationService */ "./resources/js/src/app/services/NotificationService.js");
/* harmony import */ var _services_ModalService__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../services/ModalService */ "./resources/js/src/app/services/ModalService.js");
/* harmony import */ var _AcceptPrivacyPolicyCheck_vue__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./AcceptPrivacyPolicyCheck.vue */ "./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }















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
  name: "registration",
  components: {
    AddressInputGroup: _AddressInputGroup_vue__WEBPACK_IMPORTED_MODULE_19__["default"],
    AcceptPrivacyPolicyCheck: _AcceptPrivacyPolicyCheck_vue__WEBPACK_IMPORTED_MODULE_23__["default"]
  },
  mixins: [_mixins_buttonSizeProperty_mixin__WEBPACK_IMPORTED_MODULE_18__["ButtonSizePropertyMixin"]],
  props: {
    modalElement: String,
    guestMode: {
      type: Boolean,
      default: false
    },
    isSimpleRegistration: {
      type: Boolean,
      default: false
    },
    template: String,
    backlink: String,
    shownFields: Object,
    requiredFields: Object,
    defaultSalutation: {
      type: String,
      default: App.config.addresses.defaultSalutation
    }
  },
  data: function data() {
    return {
      password: "",
      passwordRepeat: "",
      username: "",
      billingAddress: {
        countryId: null,
        stateId: null,
        gender: this.defaultSalutation
      },
      isDisabled: false,
      privacyPolicyAccepted: false,
      privacyPolicyShowError: false,
      enableConfirmingPrivacyPolicy: App.config.global.registrationRequirePrivacyPolicyConfirmation,
      googleRecaptchaApiKey: App.config.global.googleRecaptchaApiKey,
      modalShown: false,
      honeypot: ""
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      if (_this.modalElement) {
        _this.initModalEventListeners();
      }
    });
  },
  methods: {
    /**
     * Validate the registration form
     */
    validateRegistration: function validateRegistration() {
      var _this2 = this;

      Object(_helper_executeReCaptcha__WEBPACK_IMPORTED_MODULE_16__["executeReCaptcha"])(this.$refs.registrationForm).then(function (recaptchaToken) {
        _services_ValidationService__WEBPACK_IMPORTED_MODULE_14__["default"].validate(_this2.$refs.registrationForm).done(function () {
          if (!_this2.enableConfirmingPrivacyPolicy || _this2.privacyPolicyAccepted) {
            _this2.sendRegistration(recaptchaToken);
          } else {
            _this2.privacyPolicyShowError = true;
            _services_NotificationService__WEBPACK_IMPORTED_MODULE_21__["default"].error(_this2.$translate("Ceres::Template.contactAcceptFormPrivacyPolicy", {
              hyphen: "&shy;"
            }));

            _this2.resetRecaptcha();
          }
        }).fail(function (invalidFields) {
          _this2.resetRecaptcha();

          if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_17__["isNullOrUndefined"])(_this2.$refs.passwordHint) && invalidFields.indexOf(_this2.$refs.passwordInput) >= 0) {
            _this2.$refs.passwordHint.showPopper();
          }

          var invalidFieldNames = _this2.getInvalidFieldNames(invalidFields);

          if (invalidFieldNames.length > 0) {
            _services_NotificationService__WEBPACK_IMPORTED_MODULE_21__["default"].error(_this2.$translate("Ceres::Template.checkoutCheckAddressFormFields", {
              fields: invalidFieldNames.join(", ")
            }));
          }

          _services_ValidationService__WEBPACK_IMPORTED_MODULE_14__["default"].markInvalidFields(invalidFields, "error");

          if (_this2.enableConfirmingPrivacyPolicy && !_this2.privacyPolicyAccepted) {
            _this2.privacyPolicyShowError = true;
            _services_NotificationService__WEBPACK_IMPORTED_MODULE_21__["default"].error(_this2.$translate("Ceres::Template.contactAcceptFormPrivacyPolicy", {
              hyphen: "&shy;"
            }));
          }
        });
      });
    },
    getInvalidFieldNames: function getInvalidFieldNames() {
      var invalidFields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var fieldNames = [];

      var _iterator = _createForOfIteratorHelper(invalidFields),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var field = _step.value;
          var fieldName = field.lastElementChild.innerHTML.trim();
          fieldName = fieldName.slice(-1) === "*" ? fieldName.slice(0, fieldName.length - 1) : fieldName;
          fieldNames.push(fieldName);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return fieldNames;
    },

    /**
     * Send the registration
     */
    sendRegistration: function sendRegistration(recaptchaToken) {
      var _this3 = this;

      var userObject = this.getUserObject();
      userObject.recaptcha = recaptchaToken;
      this.isDisabled = true;
      _services_ApiService__WEBPACK_IMPORTED_MODULE_20__["default"].post("/rest/io/customer", userObject).done(function (response) {
        _services_ApiService__WEBPACK_IMPORTED_MODULE_20__["default"].setToken(response);

        if (!response.code) {
          document.dispatchEvent(new CustomEvent("onSignUpSuccess", {
            detail: userObject
          }));
          _services_NotificationService__WEBPACK_IMPORTED_MODULE_21__["default"].success(_this3.$translate("Ceres::Template.regSuccessful")).closeAfter(3000);

          if (document.getElementById(_this3.modalElement) !== null) {
            _services_ModalService__WEBPACK_IMPORTED_MODULE_22__["default"].findModal(document.getElementById(_this3.modalElement)).hide();
          }

          if (_this3.backlink !== null && _this3.backlink) {
            Object(_services_UrlService__WEBPACK_IMPORTED_MODULE_15__["navigateTo"])(decodeURIComponent(_this3.backlink));
          } else {
            location.reload();
          }
        } else {
          _services_NotificationService__WEBPACK_IMPORTED_MODULE_21__["default"].error(_this3.$translate("Ceres::Template.regError")).closeAfter(10000);

          _this3.resetRecaptcha();
        }

        _this3.isDisabled = false;
      }).fail(function (error) {
        _services_NotificationService__WEBPACK_IMPORTED_MODULE_21__["default"].error(error.error).closeAfter(10000);

        _this3.resetRecaptcha();

        _this3.isDisabled = false;
      });
    },

    /** 
     * Resets recaptcha v2 to make it capable of executing again.
    */
    resetRecaptcha: function resetRecaptcha() {
      if (App.config.global.googleRecaptchaVersion === 2 && window.grecaptcha) {
        var recaptchaId = this.$refs.registrationForm.querySelector("[data-recaptcha]");
        window.grecaptcha.reset(recaptchaId);
      }
    },
    setAddressDataField: function setAddressDataField(_ref) {
      var field = _ref.field,
          value = _ref.value;
      this.billingAddress[field] = value;
      this.billingAddress = Object.assign({}, this.billingAddress);
    },

    /**
     * Handle the user object which is send to the server
     * @returns {{contact: {referrerId: number, typeId: number, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}, honeypot: string}|{contact: {referrerId: number, typeId: number, password: *, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}, honeypot: string}}
     */
    getUserObject: function getUserObject() {
      var userObject = {
        contact: {
          referrerId: 1,
          typeId: 1,
          options: {
            typeId: {
              typeId: 2,
              subTypeId: 4,
              value: this.username,
              priority: 0
            }
          }
        },
        honeypot: this.honeypot
      };

      if (!this.guestMode) {
        userObject.contact.password = this.password;
      }

      if (!this.isSimpleRegistration) {
        userObject.billingAddress = this.billingAddress;
      }

      return userObject;
    },
    privacyPolicyValueChanged: function privacyPolicyValueChanged(value) {
      this.privacyPolicyAccepted = value;

      if (value) {
        this.privacyPolicyShowError = false;
      }
    },
    initModalEventListeners: function initModalEventListeners() {
      var _this4 = this;

      var modal = _services_ModalService__WEBPACK_IMPORTED_MODULE_22__["default"].findModal(document.getElementById(this.modalElement));

      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_17__["isDefined"])(modal)) {
        modal.on("show.bs.modal", function () {
          _this4.modalShown = true;
        });
        modal.on("hide.bs.modal", function () {
          _this4.modalShown = false;
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=template&id=b37bfc36&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=template&id=b37bfc36& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "form-check", class: { error: _vm.showError } },
    [
      _c("input", {
        staticClass: "form-check-input",
        attrs: {
          type: "checkbox",
          id: "privacy-policy-accept" + _vm._uid,
          "data-testing": "privacy-policy-accept-register"
        },
        domProps: { checked: _vm.value },
        on: {
          change: function($event) {
            return _vm.onValueChanged($event.target.checked)
          }
        }
      }),
      _vm._v(" "),
      _c(
        "label",
        {
          staticClass: "form-check-label",
          attrs: { for: "privacy-policy-accept" + _vm._uid }
        },
        [
          _c("span", { domProps: { innerHTML: _vm._s(_vm.labelHtml) } }),
          _c("sup", [_vm._v("*")])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/Registration.vue?vue&type=template&id=660f5e28&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/Registration.vue?vue&type=template&id=660f5e28& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
      ref: "registrationForm",
      staticClass: "w-100",
      attrs: { autocomplete: "on", method: "post" },
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.validateRegistration()
        }
      }
    },
    [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-sm-12" }, [
          _c(
            "div",
            { staticClass: "input-unit", attrs: { "data-validate": "mail" } },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.username,
                    expression: "username"
                  }
                ],
                attrs: {
                  "data-testing": "mail-register",
                  type: "email",
                  name: "email",
                  autocomplete: "email",
                  id: "email" + _vm._uid,
                  "data-autofocus": ""
                },
                domProps: { value: _vm.username },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.username = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: "email" + _vm._uid } }, [
                _vm._v(_vm._s(_vm.$translate("Ceres::Template.regEmail")) + "*")
              ])
            ]
          )
        ]),
        _vm._v(" "),
        !_vm.guestMode
          ? _c("div", { staticClass: "col-sm-6" }, [
              _c(
                "div",
                {
                  ref: "passwordInput",
                  staticClass: "input-unit",
                  class: { "no-bottom media-xs-d": _vm.modalElement },
                  attrs: { "data-validate": "password" }
                },
                [
                  _c("popper", {
                    ref: "passwordHint",
                    attrs: { trigger: "focus", placement: "bottom" },
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "handle",
                          fn: function() {
                            return [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.password,
                                    expression: "password"
                                  }
                                ],
                                attrs: {
                                  "data-testing": "password-register",
                                  type: "password",
                                  name: "password",
                                  autocomplete: "new-password",
                                  id: "new-password-" + _vm._uid
                                },
                                domProps: { value: _vm.password },
                                on: {
                                  input: function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.password = $event.target.value
                                  }
                                }
                              })
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "title",
                          fn: function() {
                            return [
                              _c("div", [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.regPasswordHintTitle"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ])
                            ]
                          },
                          proxy: true
                        },
                        {
                          key: "content",
                          fn: function() {
                            return [
                              _c("ul", { staticClass: "pl-3" }, [
                                _c("li", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.regPasswordHintLength"
                                      )
                                    )
                                  )
                                ]),
                                _vm._v(" "),
                                _c("li", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.regPasswordHintDigit"
                                      )
                                    )
                                  )
                                ]),
                                _vm._v(" "),
                                _c("li", [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.regPasswordHintChar"
                                      )
                                    )
                                  )
                                ])
                              ])
                            ]
                          },
                          proxy: true
                        }
                      ],
                      null,
                      false,
                      303377206
                    )
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "new-password-" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.regPassword")) +
                        "*"
                    )
                  ])
                ],
                1
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        !_vm.guestMode
          ? _c("div", { staticClass: "col-sm-6 input-unit-group" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  class: { "no-bottom": _vm.modalElement },
                  attrs: { "data-validate": "ref" }
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.passwordRepeat,
                        expression: "passwordRepeat"
                      }
                    ],
                    attrs: {
                      type: "password",
                      name: "password-repeat",
                      autocomplete: "new-password",
                      id: "new-password-repeat-" + _vm._uid,
                      "data-validate-ref": "#new-password-" + _vm._uid,
                      "data-testing": "repeat-password-register"
                    },
                    domProps: { value: _vm.passwordRepeat },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.passwordRepeat = $event.target.value
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "label",
                    { attrs: { for: "new-password-repeat-" + _vm._uid } },
                    [
                      _vm._v(
                        _vm._s(
                          _vm.$translate("Ceres::Template.regRepeatPassword")
                        ) + "*"
                      )
                    ]
                  )
                ]
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.honeypot,
              expression: "honeypot"
            }
          ],
          staticClass: "honey",
          attrs: {
            type: "text",
            name: "username",
            autocomplete: "new-password",
            tabindex: "-1"
          },
          domProps: { value: _vm.honeypot },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.honeypot = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-12" },
          [
            !_vm.isSimpleRegistration
              ? _c("address-input-group", {
                  attrs: {
                    template: "#vue-address-input-group",
                    "address-type": "1",
                    value: _vm.billingAddress,
                    "optional-address-fields": _vm.shownFields,
                    "required-address-fields": _vm.requiredFields,
                    "default-salutation": _vm.defaultSalutation
                  },
                  on: {
                    input: function($event) {
                      return _vm.setAddressDataField($event)
                    }
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "custom-address-fields",
                        fn: function() {
                          return [_vm._t("custom-address-fields")]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    true
                  )
                })
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _vm.enableConfirmingPrivacyPolicy
          ? _c(
              "div",
              { staticClass: "col-12" },
              [
                _c("accept-privacy-policy-check", {
                  staticClass: "mt-3 mb-0",
                  attrs: { "show-error": _vm.privacyPolicyShowError },
                  on: {
                    input: function($event) {
                      return _vm.privacyPolicyValueChanged($event)
                    }
                  },
                  model: {
                    value: _vm.privacyPolicyAccepted,
                    callback: function($$v) {
                      _vm.privacyPolicyAccepted = $$v
                    },
                    expression: "privacyPolicyAccepted"
                  }
                })
              ],
              1
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "border-top mt-2 text-right" },
        [
          _vm._t("extend-overlay-buttons"),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-appearance btn-primary btn-medium mt-3",
              class: _vm.buttonSizeClass,
              attrs: {
                disabled: _vm.isDisabled,
                "data-testing": "register-submit"
              }
            },
            [
              _vm._v(
                "\n            " +
                  _vm._s(_vm.$translate("Ceres::Template.regRegister")) +
                  "\n            "
              ),
              _c("icon", {
                staticClass: "default-float",
                attrs: { icon: "user-plus", loading: _vm.isDisabled }
              })
            ],
            1
          )
        ],
        2
      ),
      _vm._v(" "),
      !!_vm.googleRecaptchaApiKey &&
      (_vm.modalShown || !_vm.isSimpleRegistration)
        ? _c("recaptcha")
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AcceptPrivacyPolicyCheck_vue_vue_type_template_id_b37bfc36___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AcceptPrivacyPolicyCheck.vue?vue&type=template&id=b37bfc36& */ "./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=template&id=b37bfc36&");
/* harmony import */ var _AcceptPrivacyPolicyCheck_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AcceptPrivacyPolicyCheck.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AcceptPrivacyPolicyCheck_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AcceptPrivacyPolicyCheck_vue_vue_type_template_id_b37bfc36___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AcceptPrivacyPolicyCheck_vue_vue_type_template_id_b37bfc36___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AcceptPrivacyPolicyCheck_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AcceptPrivacyPolicyCheck.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AcceptPrivacyPolicyCheck_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=template&id=b37bfc36&":
/*!**************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=template&id=b37bfc36& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AcceptPrivacyPolicyCheck_vue_vue_type_template_id_b37bfc36___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AcceptPrivacyPolicyCheck.vue?vue&type=template&id=b37bfc36& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/AcceptPrivacyPolicyCheck.vue?vue&type=template&id=b37bfc36&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AcceptPrivacyPolicyCheck_vue_vue_type_template_id_b37bfc36___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AcceptPrivacyPolicyCheck_vue_vue_type_template_id_b37bfc36___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/customer/Registration.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/app/components/customer/Registration.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Registration_vue_vue_type_template_id_660f5e28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Registration.vue?vue&type=template&id=660f5e28& */ "./resources/js/src/app/components/customer/Registration.vue?vue&type=template&id=660f5e28&");
/* harmony import */ var _Registration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Registration.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/Registration.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Registration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Registration_vue_vue_type_template_id_660f5e28___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Registration_vue_vue_type_template_id_660f5e28___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/Registration.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/Registration.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/Registration.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Registration.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/Registration.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/Registration.vue?vue&type=template&id=660f5e28&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/Registration.vue?vue&type=template&id=660f5e28& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_template_id_660f5e28___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./Registration.vue?vue&type=template&id=660f5e28& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/Registration.vue?vue&type=template&id=660f5e28&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_template_id_660f5e28___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Registration_vue_vue_type_template_id_660f5e28___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-client-7.js.map