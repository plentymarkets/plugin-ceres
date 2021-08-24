(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _SalutationSelect_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SalutationSelect.vue */ "./resources/js/src/app/components/customer/SalutationSelect.vue");
/* harmony import */ var _customer_CountrySelect_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../customer/CountrySelect.vue */ "./resources/js/src/app/components/customer/CountrySelect.vue");
/* harmony import */ var _VatId_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./VatId.vue */ "./resources/js/src/app/components/customer/VatId.vue");










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
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: "address-input-group",
  components: {
    SalutationSelect: _SalutationSelect_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    CountrySelect: _customer_CountrySelect_vue__WEBPACK_IMPORTED_MODULE_11__["default"],
    VatId: _VatId_vue__WEBPACK_IMPORTED_MODULE_12__["default"]
  },
  props: {
    defaultCountry: {
      type: String,
      default: "DE"
    },
    addressType: String,
    modalType: String,
    template: String,
    value: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    optionalAddressFields: {
      type: Object,
      default: function _default() {
        return {
          de: [],
          uk: []
        };
      }
    },
    requiredAddressFields: {
      type: Object,
      default: function _default() {
        return {
          de: [],
          uk: []
        };
      }
    },
    defaultSalutation: {
      type: String,
      default: App.config.addresses.defaultSalutation
    }
  },
  computed: _objectSpread({
    isMyAccount: function isMyAccount() {
      return App.templateType === "my-account";
    },
    isPickupStation: function isPickupStation() {
      return this.value && this.value.address1 === "PACKSTATION" && this.isParcelBoxAvailable;
    },
    isPostOffice: function isPostOffice() {
      return this.value && this.value.address1 === "POSTFILIALE" && this.isPostOfficeAvailable;
    },
    isParcelOrOfficeAvailable: function isParcelOrOfficeAvailable() {
      return (this.isParcelBoxAvailable || this.isPostOfficeAvailable) && this.selectedCountry && this.selectedCountry.isoCode2 === "DE" && this.addressType === "2";
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_9__["mapState"])({
    isParcelBoxAvailable: function isParcelBoxAvailable(state) {
      return state.checkout.shipping.isParcelBoxAvailable;
    },
    isPostOfficeAvailable: function isPostOfficeAvailable(state) {
      return state.checkout.shipping.isPostOfficeAvailable;
    }
  })),
  data: function data() {
    return {
      stateList: [],
      countryLocaleList: ["DE", "GB"],
      localeToShow: this.defaultCountry,
      selectedCountry: null
    };
  },
  methods: {
    /**
     * Update the address input group to show.
     * @param shippingCountry
     */
    onSelectedCountryChanged: function onSelectedCountryChanged(shippingCountry) {
      this.selectedCountry = shippingCountry;

      if (this.countryLocaleList.indexOf(shippingCountry.isoCode2) >= 0) {
        this.localeToShow = shippingCountry.isoCode2;
      } else {
        this.localeToShow = this.defaultCountry;
      }

      this.emitInputEvent("countryId", shippingCountry.id);

      if (this.isPickupStation || this.isPostOffice) {
        this.togglePickupStation(false);
      }
    },
    togglePickupStation: function togglePickupStation(showPickupStation) {
      var emitInputs = {
        address1: "",
        address2: "",
        address3: "",
        showPickupStation: showPickupStation
      };

      if (showPickupStation) {
        emitInputs.address1 = this.isParcelBoxAvailable ? "PACKSTATION" : "POSTFILIALE";
      }

      for (var input in emitInputs) {
        this.emitInputEvent(input, emitInputs[input]);
      }
    },

    /**
     * @param {string} field
     * @param {number} value
     */
    emitInputEvent: function emitInputEvent(field, value) {
      this.$emit("input", {
        field: field,
        value: value
      });
    },
    isInOptionalFields: function isInOptionalFields(locale, key) {
      return this.optionalAddressFields[locale].includes(key);
    },
    isInRequiredFields: function isInRequiredFields(locale, key) {
      return this.requiredAddressFields && this.requiredAddressFields[locale] && this.requiredAddressFields[locale].includes(key);
    },
    transformTranslation: function transformTranslation(translationKey, locale, addressKey) {
      var translation = this.$translate(translationKey);
      var isRequired = this.isInRequiredFields(locale, addressKey);
      return translation + (isRequired ? "*" : "");
    },
    areNameFieldsShown: function areNameFieldsShown(locale, keyPrefix) {
      var isSalutationActive = this.isInOptionalFields(locale, "".concat(keyPrefix, ".salutation"));
      var isContactPersonActive = this.isInOptionalFields(locale, "".concat(keyPrefix, ".contactPerson"));
      var isName1Active = this.isInOptionalFields(locale, "".concat(keyPrefix, ".name1"));
      var isSelectedSalutationCompany = this.value.gender === "company";
      var condition1 = isSalutationActive && isContactPersonActive && isSelectedSalutationCompany;
      var condition2 = !isSalutationActive && isName1Active && isContactPersonActive;
      return !(condition1 || condition2);
    },
    areNameFieldsRequired: function areNameFieldsRequired(locale, keyPrefix) {
      var isSalutationActive = this.isInOptionalFields(locale, "".concat(keyPrefix, ".salutation"));
      var isName1Active = this.isInOptionalFields(locale, "".concat(keyPrefix, ".name1"));
      var isContactPersonRequired = this.isInRequiredFields(locale, "".concat(keyPrefix, ".contactPerson"));
      var isSelectedSalutationCompany = this.value.gender === "company";
      var condition1 = isSalutationActive && !isSelectedSalutationCompany;
      var condition2 = isSalutationActive && isSelectedSalutationCompany && isContactPersonRequired;
      var condition3 = !isSalutationActive && isName1Active && isContactPersonRequired;
      var condition4 = !isSalutationActive && !isName1Active;
      return condition1 || condition2 || condition3 || condition4;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _services_TranslationService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/TranslationService */ "./resources/js/src/app/services/TranslationService.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "country-select",
  props: {
    selectedCountryId: Number,
    selectedStateId: Number,
    addressType: {
      type: String,
      required: true
    },
    optionalAddressFields: {
      type: Object,
      default: function _default() {}
    },
    requiredAddressFields: {
      type: Object,
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      stateList: [],
      selectedCountry: {}
    };
  },
  computed: _objectSpread({
    addressKeyPrefix: function addressKeyPrefix() {
      return this.addressType === "1" ? "billing_address." : "delivery_address.";
    },
    optionalFields: function optionalFields() {
      var iso = this.selectedCountry.isoCode2.toLowerCase();

      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_12__["isNullOrUndefined"])(this.optionalAddressFields[iso])) {
        return this.optionalAddressFields.de;
      }

      return this.optionalAddressFields[iso];
    },
    requiredFields: function requiredFields() {
      var iso = this.selectedCountry.isoCode2.toLowerCase();

      if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_12__["isNullOrUndefined"])(this.requiredAddressFields[iso])) {
        return this.requiredAddressFields.de;
      }

      return this.requiredAddressFields[iso];
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_13__["mapState"])({
    shippingCountryId: function shippingCountryId(state) {
      return state.localization.shippingCountryId;
    },
    countryList: function countryList(state) {
      return state.localization.shippingCountries;
    }
  })),

  /**
   * Get the shipping countries
   */
  created: function created() {
    this.updateSelectedCountry();
  },
  methods: {
    /**
     * Method to fire when the country has changed
     */
    countryChanged: function countryChanged(value) {
      this.$emit("country-changed", this.getCountryById(parseInt(value)));
      this.$emit("state-changed", null);
    },

    /**
     * @param {*} value
     */
    stateChanged: function stateChanged(value) {
      this.$emit("state-changed", parseInt(value));
    },

    /**
     * @param countryId
     * @returns {*}
     */
    getCountryById: function getCountryById(countryId) {
      return this.countryList.find(function (country) {
        if (country.id === countryId) {
          return country;
        }

        return null;
      });
    },
    updateSelectedCountry: function updateSelectedCountry() {
      var countryId = this.selectedCountryId || this.shippingCountryId;
      this.selectedCountry = this.getCountryById(countryId);

      if (this.selectedCountry) {
        this.stateList = this.selectedCountry.states || [];
      }

      this.countryChanged(countryId);
    },
    isInOptionalFields: function isInOptionalFields(key) {
      return this.optionalFields.includes(this.addressKeyPrefix + key);
    },
    isInRequiredFields: function isInRequiredFields(key) {
      return this.requiredFields.includes(this.addressKeyPrefix + key);
    },
    transformTranslation: function transformTranslation(translationKey, addressKey) {
      var translation = _services_TranslationService__WEBPACK_IMPORTED_MODULE_11__["default"].translate(translationKey);
      var isRequired = this.isInRequiredFields(addressKey);
      return translation + (isRequired ? "*" : "");
    }
  },
  watch: {
    selectedCountryId: function selectedCountryId() {
      this.updateSelectedCountry();
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

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.parse-int.js */ "./node_modules/core-js/modules/es.parse-int.js");
/* harmony import */ var core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.string.includes.js */ "./node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");







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
  name: "salutation-select",
  props: {
    addressData: {
      type: Object,
      required: true
    },
    addressType: {
      type: [Number, String],
      default: 1
    },
    enabledAddressFields: {
      type: Object,
      default: function _default() {
        return [];
      }
    },
    defaultSalutation: {
      type: String,
      default: App.config.addresses.defaultSalutation
    }
  },
  data: function data() {
    return {
      salutations: [{
        key: "male",
        name: "addressSalutationMale"
      }, {
        key: "female",
        name: "addressSalutationFemale"
      }, {
        key: "diverse",
        name: "addressSalutationDiverse"
      }, {
        key: "company",
        name: "addressSalutationCompany"
      }]
    };
  },
  computed: {
    currentSalutation: function currentSalutation() {
      var _this = this;

      var countryId = parseInt(this.addressData.countryId) || 1;
      var addressKey = parseInt(this.addressType) === 1 ? "billing_address" : "delivery_address";
      var countryKey = countryId === 12 ? "gb" : "de";
      var salutations = this.salutations.map(function (salutation) {
        return {
          key: salutation.key,
          name: _this.$translate("Ceres::Template." + salutation.name)
        };
      });

      if (this.enabledAddressFields[countryKey].includes("".concat(addressKey, ".name1"))) {
        return salutations;
      }

      return salutations.filter(function (salutation) {
        return salutation.key !== "company";
      });
    }
  },

  /**
   * Get the shipping countries
   */
  created: function created() {
    this.$options.template = this.template;
    var selectedSalutation = this.defaultSalutation;

    if (Object(_helper_utils__WEBPACK_IMPORTED_MODULE_7__["isNullOrUndefined"])(selectedSalutation)) {
      selectedSalutation = this.currentSalutation[0].key;
    }

    this.emitInputEvent(selectedSalutation);
  },
  methods: {
    emitInputEvent: function emitInputEvent(value) {
      var isNewGenderPersonal = this.getIsGenderPersonal(value);
      var isOldGenderPersonal = this.getIsGenderPersonal(this.addressData.gender);
      this.$emit("input", {
        field: "gender",
        value: value
      }); // just reset the input fields, when switching the gender between a personal one and company

      if (isNewGenderPersonal !== isOldGenderPersonal) {
        this.$emit("input", {
          field: "name1",
          value: ""
        });
        this.$emit("input", {
          field: "name2",
          value: ""
        });
        this.$emit("input", {
          field: "name3",
          value: ""
        });
        this.$emit("input", {
          field: "vatNumber",
          value: ""
        });
        this.$emit("input", {
          field: "contactPerson",
          value: ""
        });
      }
    },
    checkGenderCompany: function checkGenderCompany(gender) {
      if (gender === "company") {
        return this.addressData.name1 !== null || this.addressData.name1 !== "";
      }

      return true;
    },
    getIsGenderPersonal: function getIsGenderPersonal(gender) {
      return ["male", "female", "diverse"].includes(gender);
    }
  },
  watch: {
    currentSalutation: function currentSalutation(newVal, oldVal) {
      if (newVal !== oldVal) {
        var selectedSalutation = this.addressData.gender; // cleanse the current selected salutation, if it's not longer included in the choice

        if (!newVal.map(function (salutation) {
          return salutation.key;
        }).includes(selectedSalutation)) {
          this.emitInputEvent(newVal[0].key);
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.string.starts-with.js */ "./node_modules/core-js/modules/es.string.starts-with.js");
/* harmony import */ var core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with_js__WEBPACK_IMPORTED_MODULE_4__);





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
  name: "vat-id",
  props: {
    selectedCountryId: Number,
    value: String,
    isRequired: Boolean,
    showInput: Boolean
  },
  data: function data() {
    return {
      vatNumber: "",
      vatPrefix: "",
      isPrefixValid: false
    };
  },
  computed: {
    vatCodes: function vatCodes() {
      var _this$selectedCountry, _this$selectedCountry2, _this$selectedCountry3;

      this.vatPrefix = (_this$selectedCountry = this.selectedCountry) !== null && _this$selectedCountry !== void 0 && _this$selectedCountry.vatCodes && (_this$selectedCountry2 = this.selectedCountry) !== null && _this$selectedCountry2 !== void 0 && _this$selectedCountry2.vatCodes[0] ? this.selectedCountry.vatCodes[0] : "";
      return (_this$selectedCountry3 = this.selectedCountry) !== null && _this$selectedCountry3 !== void 0 && _this$selectedCountry3.vatCodes ? this.selectedCountry.vatCodes : [];
    },
    isEU: function isEU() {
      var _this$vatCodes;

      return ((_this$vatCodes = this.vatCodes) === null || _this$vatCodes === void 0 ? void 0 : _this$vatCodes.length) > 0;
    },
    selectedCountry: function selectedCountry() {
      var _this = this;

      return this.$store.state.localization.shippingCountries.find(function (country) {
        return country.id === _this.selectedCountryId;
      });
    }
  },
  watch: {
    value: function value(newValue) {
      this.setValues(newValue);
    },
    showInput: function showInput() {
      if (!this.showInput) {
        this.deleteValue();
      }
    },
    vatNumber: function vatNumber() {
      this.emitChange();
    },
    vatPrefix: function vatPrefix() {
      this.emitChange();
    }
  },
  created: function created() {
    this.setValues(this.value);
  },
  methods: {
    transformTranslation: function transformTranslation(translationKey) {
      var translation = this.$translate(translationKey);
      return translation + (this.isRequired ? "*" : "");
    },
    deleteValue: function deleteValue() {
      var _this$selectedCountry4, _this$selectedCountry5;

      this.vatNumber = "";
      this.vatPrefix = (_this$selectedCountry4 = this.selectedCountry) !== null && _this$selectedCountry4 !== void 0 && _this$selectedCountry4.vatCodes && (_this$selectedCountry5 = this.selectedCountry) !== null && _this$selectedCountry5 !== void 0 && _this$selectedCountry5.vatCodes[0] ? this.selectedCountry.vatCodes[0] : "";
    },
    emitChange: function emitChange() {
      var value = !!this.vatNumber ? this.vatPrefix + this.vatNumber : "";
      this.$emit('input', value);
    },
    setValues: function setValues(value) {
      var vatPrefix = this.getVatPrefix(value);
      this.isPrefixValid = !!vatPrefix;

      if (this.isPrefixValid) {
        this.vatPrefix = vatPrefix;
        this.vatNumber = value.slice(vatPrefix.length);
      } else {
        this.vatNumber = value;
      }
    },

    /**
     * @param value
     * @returns {string} - Returns the best matching vat code
     */
    getVatPrefix: function getVatPrefix(value) {
      var _this$vatCodes2;

      var result = "";
      (_this$vatCodes2 = this.vatCodes) === null || _this$vatCodes2 === void 0 ? void 0 : _this$vatCodes2.forEach(function (vatCode) {
        if (value.startsWith(vatCode) && vatCode.length > result.length) {
          result = vatCode;
        }
      });
      return result;
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=1e4a3dec&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=1e4a3dec& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "row" },
    [
      _vm.value.showPickupStation &&
      _vm.selectedCountry.isoCode2 === "DE" &&
      _vm.addressType === "2"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.salutation')"
                            }
                          ],
                          staticClass: "input-unit"
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields
                            },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "de",
                                      "delivery_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("de", "delivery_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("de", "delivery_address.name1") &&
                  !_vm.isInOptionalFields("de", "delivery_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-model": "name1",
                            "data-validate": "text"
                          }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-testing": "packing-station-de-company"
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _vm.isInOptionalFields("de", "delivery_address.title")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.title"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.title')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "title" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "title",
                                id: "txtTitle" + _vm._uid
                              },
                              domProps: { value: _vm.value.title },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "title",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTitle" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTitle",
                                        "de",
                                        "delivery_address.title"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.areNameFieldsShown("de", "delivery_address")
                    ? [
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('de', 'delivery_address')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name2" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "firstName",
                                  id: "txtFirstName" + _vm._uid,
                                  "data-testing": "packing-station-de-firstname"
                                },
                                domProps: { value: _vm.value.name2 },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "name2",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtFirstName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressFirstName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e()
                                ],
                                2
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('de', 'delivery_address')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name3" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtLastName" + _vm._uid,
                                  "data-testing": "packing-station-de-lastname"
                                },
                                domProps: { value: _vm.value.name3 },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "name3",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtLastName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressLastName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e()
                                ],
                                2
                              )
                            ]
                          )
                        ])
                      ]
                    : _c("div", { staticClass: "col-12 col-sm-8" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.contactPerson"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.contactPerson')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "contactPerson" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "lastName",
                                id: "txtContactPerson" + _vm._uid
                              },
                              domProps: { value: _vm.value.contactPerson },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "contactPerson",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtContactPerson" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressContactPerson",
                                        "de",
                                        "delivery_address.contactPerson"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("de", "delivery_address.name4")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.name4"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.name4')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "name4" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "decorateName",
                                id: "txtAdditionalName" + _vm._uid
                              },
                              domProps: { value: _vm.value.name4 },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "name4",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                attrs: { for: "txtAdditionalName" + _vm._uid }
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressAdditionalName",
                                        "de",
                                        "delivery_address.name4"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("de", "delivery_address.phoneNumber")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.phoneNumber"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.phoneNumber')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "telephone" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "telephone",
                                id: "txtTelephone" + _vm._uid
                              },
                              domProps: { value: _vm.value.telephone },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "telephone",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTelephone" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTelephone",
                                        "de",
                                        "delivery_address.phoneNumber"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e()
                ],
                2
              )
            ]),
            _vm._v(" "),
            _vm.isParcelOrOfficeAvailable
              ? _c("div", { staticClass: "col-12" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-12" }, [
                      _c("input", {
                        attrs: {
                          type: "checkbox",
                          name: "togglePickup",
                          id: "showPickup" + _vm._uid
                        },
                        domProps: { checked: _vm.value.showPickupStation },
                        on: {
                          change: function($event) {
                            return _vm.togglePickupStation(
                              $event.target.checked
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "showPickup" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.addressToPickupStation"
                            )
                          )
                        )
                      ])
                    ])
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-12 col-sm-8" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: { "data-validate": "", "data-model": "address1" }
                    },
                    [
                      _c(
                        "select",
                        {
                          staticClass: "custom-select",
                          attrs: { id: "address1" + _vm._uid },
                          domProps: { value: _vm.value.address1 },
                          on: {
                            change: function($event) {
                              return _vm.emitInputEvent(
                                "address1",
                                $event.target.value
                              )
                            }
                          }
                        },
                        [
                          _vm.isParcelBoxAvailable
                            ? _c(
                                "option",
                                {
                                  attrs: { value: "PACKSTATION" },
                                  domProps: { selected: _vm.isPickupStation }
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressPackingStation"
                                      )
                                    )
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.isPostOfficeAvailable
                            ? _c(
                                "option",
                                {
                                  attrs: { value: "POSTFILIALE" },
                                  domProps: { selected: _vm.isPostOffice }
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressPostOffice"
                                      )
                                    )
                                  )
                                ]
                              )
                            : _vm._e()
                        ]
                      ),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "'address1' + _uid" } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.addressPickupLocation"
                            )
                          )
                        )
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-12 col-sm-4" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "address2"
                      }
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "housenumber",
                          autocomplete: "address-line2",
                          id: "txtNumber" + _vm._uid
                        },
                        domProps: { value: _vm.value.address2 },
                        on: {
                          input: function($event) {
                            return _vm.emitInputEvent(
                              "address2",
                              $event.target.value
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _vm.isPickupStation
                        ? _c(
                            "label",
                            { attrs: { for: "txtNumber" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressPackingStationNumber"
                                  )
                                ) + "*"
                              )
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.isPostOffice
                        ? _c(
                            "label",
                            { attrs: { for: "txtNumber" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressPostOfficeNumber"
                                  )
                                ) + "*"
                              )
                            ]
                          )
                        : _vm._e()
                    ]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-12 col-sm-6" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "postNumber"
                      }
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "postnumber",
                          id: "postnumber" + _vm._uid,
                          "data-testing": "packing-station-de-postnumber"
                        },
                        domProps: { value: _vm.value.postNumber },
                        on: {
                          input: function($event) {
                            return _vm.emitInputEvent(
                              "postNumber",
                              $event.target.value
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "postnumber" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate("Ceres::Template.addressPostNummer")
                          ) + "*"
                        )
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _vm.isInOptionalFields("de", "delivery_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.address4')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress1" + _vm._uid
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress1" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress2",
                                      "de",
                                      "delivery_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "postalCode" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid,
                      "data-testing": "packing-station-de-postalcode"
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid,
                      "data-testing": "packing-station-de-town"
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" }
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields
                  },
                  on: {
                    "country-changed": function($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.email"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.email')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "mail",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "packing-station-de-email-input"
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "de",
                                  "delivery_address.email"
                                )
                              )
                            )
                          ])
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ])
          ]
        : _vm.localeToShow == "DE" && _vm.addressType === "1"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "billing_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "de",
                                "billing_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('de', 'billing_address.salutation')"
                            }
                          ],
                          staticClass: "input-unit"
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields,
                              "default-salutation": _vm.defaultSalutation
                            },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "de",
                                      "billing_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("de", "billing_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("de", "billing_address.name1") &&
                  !_vm.isInOptionalFields("de", "billing_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-validate": "text",
                            "data-model": "name1"
                          }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-autofocus": "",
                              "data-testing": "billing-address-de-company"
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-12 col-sm-6" },
                  [
                    _c("vat-id", {
                      attrs: {
                        "is-required": _vm.isInRequiredFields(
                          "de",
                          "billing_address.vatNumber"
                        ),
                        "selected-country-id": _vm.value.countryId,
                        value: _vm.value.vatNumber || "",
                        "show-input":
                          (_vm.isInOptionalFields(
                            "de",
                            "billing_address.salutation"
                          ) &&
                            _vm.value.gender === "company" &&
                            _vm.isInOptionalFields(
                              "de",
                              "billing_address.vatNumber"
                            )) ||
                          (!_vm.isInOptionalFields(
                            "de",
                            "billing_address.salutation"
                          ) &&
                            _vm.isInOptionalFields(
                              "de",
                              "billing_address.name1"
                            ) &&
                            _vm.isInOptionalFields(
                              "de",
                              "billing_address.vatNumber"
                            ))
                      },
                      on: {
                        input: function($event) {
                          return _vm.emitInputEvent("vatNumber", $event)
                        }
                      }
                    })
                  ],
                  1
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12",
                attrs: { "data-testing": "billing-address-de-name-inputs" }
              },
              [
                _c(
                  "div",
                  { staticClass: "row" },
                  [
                    _vm.isInOptionalFields("de", "billing_address.title")
                      ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.isInRequiredFields(
                                    "de",
                                    "billing_address.title"
                                  ),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.title')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "title" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "title",
                                  id: "txtTitle" + _vm._uid,
                                  "data-autofocus": "",
                                  "data-testing": "billing-address-de-title"
                                },
                                domProps: { value: _vm.value.title },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "title",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtTitle" + _vm._uid } },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressTitle",
                                          "de",
                                          "billing_address.title"
                                        )
                                      ) +
                                      "\n                        "
                                  )
                                ]
                              )
                            ]
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.areNameFieldsShown("de", "billing_address")
                      ? [
                          _c("div", { staticClass: "col-12 col-sm-4" }, [
                            _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "validate",
                                    rawName: "v-validate:text",
                                    value: _vm.areNameFieldsRequired(
                                      "de",
                                      "billing_address"
                                    ),
                                    expression:
                                      "areNameFieldsRequired('de', 'billing_address')",
                                    arg: "text"
                                  }
                                ],
                                staticClass: "input-unit",
                                attrs: { "data-model": "name2" }
                              },
                              [
                                _c("input", {
                                  attrs: {
                                    type: "text",
                                    name: "firstName",
                                    id: "txtFirstName" + _vm._uid,
                                    "data-autofocus": "",
                                    "data-testing":
                                      "billing-address-de-firstname"
                                  },
                                  domProps: { value: _vm.value.name2 },
                                  on: {
                                    input: function($event) {
                                      return _vm.emitInputEvent(
                                        "name2",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "label",
                                  { attrs: { for: "txtFirstName" + _vm._uid } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.addressFirstName"
                                        )
                                      )
                                    ),
                                    _vm.areNameFieldsRequired(
                                      "de",
                                      "billing_address"
                                    )
                                      ? [_vm._v("*")]
                                      : _vm._e()
                                  ],
                                  2
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-12 col-sm-4" }, [
                            _c(
                              "div",
                              {
                                directives: [
                                  {
                                    name: "validate",
                                    rawName: "v-validate:text",
                                    value: _vm.areNameFieldsRequired(
                                      "de",
                                      "billing_address"
                                    ),
                                    expression:
                                      "areNameFieldsRequired('de', 'billing_address')",
                                    arg: "text"
                                  }
                                ],
                                staticClass: "input-unit",
                                attrs: { "data-model": "name3" }
                              },
                              [
                                _c("input", {
                                  attrs: {
                                    type: "text",
                                    name: "lastName",
                                    id: "txtLastName" + _vm._uid,
                                    "data-testing":
                                      "billing-address-de-lastname"
                                  },
                                  domProps: { value: _vm.value.name3 },
                                  on: {
                                    input: function($event) {
                                      return _vm.emitInputEvent(
                                        "name3",
                                        $event.target.value
                                      )
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "label",
                                  { attrs: { for: "txtLastName" + _vm._uid } },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.$translate(
                                          "Ceres::Template.addressLastName"
                                        )
                                      )
                                    ),
                                    _vm.areNameFieldsRequired(
                                      "de",
                                      "billing_address"
                                    )
                                      ? [_vm._v("*")]
                                      : _vm._e()
                                  ],
                                  2
                                )
                              ]
                            )
                          ])
                        ]
                      : _c("div", { staticClass: "col-12 col-sm-8" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.isInRequiredFields(
                                    "de",
                                    "billing_address.contactPerson"
                                  ),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.contactPerson')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "contactPerson" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtContactPerson" + _vm._uid
                                },
                                domProps: { value: _vm.value.contactPerson },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "contactPerson",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                {
                                  attrs: { for: "txtContactPerson" + _vm._uid }
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressContactPerson",
                                          "de",
                                          "billing_address.contactPerson"
                                        )
                                      ) +
                                      "\n                        "
                                  )
                                ]
                              )
                            ]
                          )
                        ]),
                    _vm._v(" "),
                    _vm.isInOptionalFields("de", "billing_address.name4")
                      ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.isInRequiredFields(
                                    "de",
                                    "billing_address.name4"
                                  ),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.name4')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name4" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "decorateName",
                                  id: "txtAdditionalName" + _vm._uid
                                },
                                domProps: { value: _vm.value.name4 },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "name4",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                {
                                  attrs: { for: "txtAdditionalName" + _vm._uid }
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressAdditionalName",
                                          "de",
                                          "billing_address.name4"
                                        )
                                      ) +
                                      "\n                        "
                                  )
                                ]
                              )
                            ]
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.isInOptionalFields("de", "billing_address.birthday")
                      ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:date",
                                  value:
                                    _vm.isInRequiredFields(
                                      "de",
                                      "billing_address.birthday"
                                    ) ||
                                    (!!_vm.value.birthday &&
                                      !!_vm.value.birthday.length),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.birthday') || !!value.birthday && !!value.birthday.length",
                                  arg: "date"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "birthday" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "date",
                                  min: "1901-12-14",
                                  max: new Date().toISOString().split("T")[0],
                                  name: "birthday",
                                  placeholder: _vm.$translate(
                                    "Ceres::Template.addressBirthdatePlaceholder"
                                  ),
                                  id: "txtBirthdate" + _vm._uid
                                },
                                domProps: { value: _vm.value.birthday },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "birthday",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtBirthdate" + _vm._uid } },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressBirthdate",
                                          "de",
                                          "billing_address.birthday"
                                        )
                                      ) +
                                      "\n                        "
                                  )
                                ]
                              )
                            ]
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.isInOptionalFields("de", "billing_address.phoneNumber")
                      ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.isInRequiredFields(
                                    "de",
                                    "billing_address.phoneNumber"
                                  ),
                                  expression:
                                    "isInRequiredFields('de', 'billing_address.phoneNumber')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "telephone" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "telephone",
                                  id: "txtTelephone" + _vm._uid
                                },
                                domProps: { value: _vm.value.telephone },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "telephone",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtTelephone" + _vm._uid } },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(
                                        _vm.transformTranslation(
                                          "Ceres::Template.addressTelephone",
                                          "de",
                                          "billing_address.phoneNumber"
                                        )
                                      ) +
                                      "\n                        "
                                  )
                                ]
                              )
                            ]
                          )
                        ])
                      : _vm._e()
                  ],
                  2
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12",
                attrs: { "data-testing": "billing-address-de-street-inputs" }
              },
              [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-12 col-sm-8" }, [
                    _c(
                      "div",
                      {
                        staticClass: "input-unit",
                        attrs: {
                          "data-validate": "text",
                          "data-model": "address1"
                        }
                      },
                      [
                        _c("input", {
                          attrs: {
                            type: "text",
                            name: "street",
                            autocomplete: "address-line1",
                            id: "txtStreet" + _vm._uid,
                            "data-testing": "billing-address-de-street"
                          },
                          domProps: { value: _vm.value.address1 },
                          on: {
                            input: function($event) {
                              return _vm.emitInputEvent(
                                "address1",
                                $event.target.value
                              )
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "label",
                          { attrs: { for: "txtStreet" + _vm._uid } },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.$translate("Ceres::Template.addressStreet")
                              ) + "*"
                            )
                          ]
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-12 col-sm-4" }, [
                    _c(
                      "div",
                      {
                        staticClass: "input-unit",
                        attrs: {
                          "data-validate": "text",
                          "data-model": "address2"
                        }
                      },
                      [
                        _c("input", {
                          attrs: {
                            type: "text",
                            name: "housenumber",
                            autocomplete: "address-line2",
                            id: "txtNumber" + _vm._uid,
                            "data-testing": "billing-address-de-house-number"
                          },
                          domProps: { value: _vm.value.address2 },
                          on: {
                            input: function($event) {
                              return _vm.emitInputEvent(
                                "address2",
                                $event.target.value
                              )
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "label",
                          { attrs: { for: "txtNumber" + _vm._uid } },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.$translate("Ceres::Template.addressNumber")
                              ) + "*"
                            )
                          ]
                        )
                      ]
                    )
                  ])
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "billing_address.address3")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "billing_address.address3"
                              ),
                              expression:
                                "isInRequiredFields('de', 'billing_address.address3')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address3" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress0" + _vm._uid
                            },
                            domProps: { value: _vm.value.address3 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address3",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress1",
                                      "de",
                                      "billing_address.address3"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.isInOptionalFields("de", "billing_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "billing_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('de', 'billing_address.address4')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress1" + _vm._uid
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress1" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress2",
                                      "de",
                                      "billing_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "postalCode" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid,
                      "data-testing": "billing-address-de-zip"
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid,
                      "data-testing": "billing-address-de-town"
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" }
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields
                  },
                  on: {
                    "country-changed": function($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "billing_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "billing_address.email"
                              ),
                              expression:
                                "isInRequiredFields('de', 'billing_address.email')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "mail",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "billing-address-de-email-input"
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "de",
                                  "billing_address.email"
                                )
                              )
                            )
                          ])
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ])
          ]
        : _vm.localeToShow == "GB" && _vm.addressType === "1"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "billing_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "billing_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'billing_address.salutation')"
                            }
                          ],
                          staticClass: "input-unit"
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields
                            },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "gb",
                                      "billing_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("gb", "billing_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("gb", "billing_address.name1") &&
                  !_vm.isInOptionalFields("gb", "billing_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-validate": "text",
                            "data-model": "name1"
                          }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-autofocus": ""
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-12 col-sm-6" },
                  [
                    _c("vat-id", {
                      attrs: {
                        "is-required": _vm.isInRequiredFields(
                          "gb",
                          "billing_address.vatNumber"
                        ),
                        "selected-country-id": _vm.value.countryId,
                        value: _vm.value.vatNumber || "",
                        "show-input":
                          (_vm.isInOptionalFields(
                            "gb",
                            "billing_address.salutation"
                          ) &&
                            _vm.value.gender === "company" &&
                            _vm.isInOptionalFields(
                              "gb",
                              "billing_address.vatNumber"
                            )) ||
                          (!_vm.isInOptionalFields(
                            "gb",
                            "billing_address.salutation"
                          ) &&
                            _vm.isInOptionalFields(
                              "gb",
                              "billing_address.name1"
                            ) &&
                            _vm.isInOptionalFields(
                              "gb",
                              "billing_address.vatNumber"
                            ))
                      },
                      on: {
                        input: function($event) {
                          return _vm.emitInputEvent("vatNumber", $event)
                        }
                      }
                    })
                  ],
                  1
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _vm.isInOptionalFields("gb", "billing_address.title")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.title"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.title')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "title" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "title",
                                id: "txtTitle" + _vm._uid,
                                "data-autofocus": ""
                              },
                              domProps: { value: _vm.value.title },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "title",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTitle" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTitle",
                                        "gb",
                                        "billing_address.title"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.areNameFieldsShown("gb", "billing_address")
                    ? [
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "gb",
                                    "billing_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('gb', 'billing_address')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name2" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "firstName",
                                  id: "txtFirstName" + _vm._uid,
                                  "data-model": "name2",
                                  "data-autofocus": ""
                                },
                                domProps: { value: _vm.value.name2 },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "name2",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtFirstName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressFirstName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "gb",
                                    "billing_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e()
                                ],
                                2
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "gb",
                                    "billing_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('gb', 'billing_address')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name3" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtLastName" + _vm._uid,
                                  "data-model": "name3"
                                },
                                domProps: { value: _vm.value.name3 },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "name3",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtLastName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressLastName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "gb",
                                    "billing_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e()
                                ],
                                2
                              )
                            ]
                          )
                        ])
                      ]
                    : _c("div", { staticClass: "col-12 col-sm-8" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.contactPerson"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.contactPerson')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "contactPerson" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "lastName",
                                id: "txtContactPerson" + _vm._uid
                              },
                              domProps: { value: _vm.value.contactPerson },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "contactPerson",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtContactPerson" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressContactPerson",
                                        "gb",
                                        "billing_address.contactPerson"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "billing_address.name4")
                    ? _c("div", { staticClass: "col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.name4"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.name4')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "name4" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "decorateName",
                                id: "txtAdditionalName" + _vm._uid
                              },
                              domProps: { value: _vm.value.name4 },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "name4",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                attrs: { for: "txtAdditionalName" + _vm._uid }
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressGBNameAffix",
                                        "gb",
                                        "billing_address.name4"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "billing_address.birthday")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:date",
                                value:
                                  _vm.isInRequiredFields(
                                    "gb",
                                    "billing_address.birthday"
                                  ) ||
                                  (!!_vm.value.birthday &&
                                    !!_vm.value.birthday.length),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.birthday') || !!value.birthday && !!value.birthday.length",
                                arg: "date"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "birthday" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "date",
                                min: "1901-12-14",
                                max: new Date().toISOString().split("T")[0],
                                name: "birthday",
                                placeholder: _vm.$translate(
                                  "Ceres::Template.addressBirthdatePlaceholder"
                                ),
                                id: "txtBirthdate" + _vm._uid
                              },
                              domProps: { value: _vm.value.birthday },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "birthday",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtBirthdate" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressBirthdate",
                                        "gb",
                                        "billing_address.birthday"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "billing_address.phoneNumber")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.phoneNumber"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.phoneNumber')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "telephone" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "telephone",
                                id: "txtTelephone" + _vm._uid
                              },
                              domProps: { value: _vm.value.telephone },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "telephone",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTelephone" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTelephone",
                                        "gb",
                                        "billing_address.phoneNumber"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e()
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12",
                attrs: { "data-testing": "invoice-addresses-street-select-gb" }
              },
              [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-12 col-sm-12" }, [
                    _c(
                      "div",
                      {
                        staticClass: "input-unit",
                        attrs: {
                          "data-validate": "text",
                          "data-model": "address1"
                        }
                      },
                      [
                        _c("input", {
                          attrs: {
                            type: "text",
                            name: "street",
                            autocomplete: "address-line1",
                            id: "txtStreet" + _vm._uid
                          },
                          domProps: { value: _vm.value.address1 },
                          on: {
                            input: function($event) {
                              return _vm.emitInputEvent(
                                "address1",
                                $event.target.value
                              )
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c(
                          "label",
                          { attrs: { for: "txtStreet" + _vm._uid } },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.addressENAddressLine1"
                                )
                              ) + "*"
                            )
                          ]
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "billing_address.address2")
                    ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "billing_address.address2"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'billing_address.address2')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "address2" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "housenumber",
                                autocomplete: "address-line2",
                                id: "txtNumber" + _vm._uid
                              },
                              domProps: { value: _vm.value.address2 },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "address2",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtNumber" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressENAddressLine2",
                                        "gb",
                                        "billing_address.address2"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e()
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "billing_address.address3")
                  ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "billing_address.address3"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'billing_address.address3')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address3" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "buildingName",
                              id: "decorateAddress0" + _vm._uid
                            },
                            domProps: { value: _vm.value.address3 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address3",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine3",
                                      "gb",
                                      "billing_address.address3"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.isInOptionalFields("gb", "billing_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "billing_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'billing_address.address4')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "buildingName",
                              id: "decorateAddress0" + _vm._uid
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine4",
                                      "gb",
                                      "billing_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "postalCode" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" }
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields
                  },
                  on: {
                    "country-changed": function($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "billing_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "billing_address.email"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'billing_address.email')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "mail",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "billing-address-gb-email-input"
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "gb",
                                  "billing_address.email"
                                )
                              )
                            )
                          ])
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ])
          ]
        : _vm.localeToShow == "DE" && _vm.addressType === "2"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.salutation')"
                            }
                          ],
                          staticClass: "input-unit"
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields
                            },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "de",
                                      "delivery_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("de", "delivery_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("de", "delivery_address.name1") &&
                  !_vm.isInOptionalFields("de", "delivery_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-validate": "text",
                            "data-model": "name1"
                          }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-autofocus": ""
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-12 col-sm-6" },
                  [
                    _c("vat-id", {
                      attrs: {
                        "is-required": _vm.isInRequiredFields(
                          "de",
                          "delivery_address.vatNumber"
                        ),
                        "selected-country-id": _vm.value.countryId,
                        value: _vm.value.vatNumber || "",
                        "show-input":
                          (_vm.isInOptionalFields(
                            "de",
                            "delivery_address.salutation"
                          ) &&
                            _vm.value.gender === "company" &&
                            _vm.isInOptionalFields(
                              "de",
                              "delivery_address.vatNumber"
                            )) ||
                          (!_vm.isInOptionalFields(
                            "de",
                            "delivery_address.salutation"
                          ) &&
                            _vm.isInOptionalFields(
                              "de",
                              "delivery_address.name1"
                            ) &&
                            _vm.isInOptionalFields(
                              "de",
                              "delivery_address.vatNumber"
                            ))
                      },
                      on: {
                        input: function($event) {
                          return _vm.emitInputEvent("vatNumber", $event)
                        }
                      }
                    })
                  ],
                  1
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _vm.isInOptionalFields("de", "delivery_address.title")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.title"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.title')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "title" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "title",
                                id: "txtTitle" + _vm._uid,
                                "data-autofocus": ""
                              },
                              domProps: { value: _vm.value.title },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "title",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTitle" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTitle",
                                        "de",
                                        "delivery_address.title"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.areNameFieldsShown("de", "delivery_address")
                    ? [
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('de', 'delivery_address')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name2" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "firstName",
                                  id: "txtFirstName" + _vm._uid,
                                  "data-autofocus": "",
                                  "data-testing":
                                    "delivery-address-de-firstname"
                                },
                                domProps: { value: _vm.value.name2 },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "name2",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtFirstName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressFirstName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e()
                                ],
                                2
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('de', 'delivery_address')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name3" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtLastName" + _vm._uid,
                                  "data-testing": "delivery-address-de-lastname"
                                },
                                domProps: { value: _vm.value.name3 },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "name3",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtLastName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressLastName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "de",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e()
                                ],
                                2
                              )
                            ]
                          )
                        ])
                      ]
                    : _c("div", { staticClass: "col-12 col-sm-8" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.contactPerson"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.contactPerson')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "contactPerson" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "lastName",
                                id: "txtContactPerson" + _vm._uid
                              },
                              domProps: { value: _vm.value.contactPerson },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "contactPerson",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtContactPerson" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressContactPerson",
                                        "de",
                                        "delivery_address.contactPerson"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("de", "delivery_address.name4")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.name4"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.name4')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "name4" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "decorateName",
                                id: "txtAdditionalName" + _vm._uid
                              },
                              domProps: { value: _vm.value.name4 },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "name4",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                attrs: { for: "txtAdditionalName" + _vm._uid }
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressAdditionalName",
                                        "de",
                                        "delivery_address.name4"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("de", "delivery_address.phoneNumber")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "de",
                                  "delivery_address.phoneNumber"
                                ),
                                expression:
                                  "isInRequiredFields('de', 'delivery_address.phoneNumber')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "telephone" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "telephone",
                                id: "txtTelephone" + _vm._uid
                              },
                              domProps: { value: _vm.value.telephone },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "telephone",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTelephone" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTelephone",
                                        "de",
                                        "delivery_address.phoneNumber"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e()
                ],
                2
              )
            ]),
            _vm._v(" "),
            _vm.isParcelOrOfficeAvailable
              ? _c("div", { staticClass: "col-12" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-12" }, [
                      _c("input", {
                        attrs: {
                          type: "checkbox",
                          name: "togglePickup",
                          id: "showPickup" + _vm._uid
                        },
                        domProps: { checked: _vm.value.showPickupStation },
                        on: {
                          change: function($event) {
                            return _vm.togglePickupStation(
                              $event.target.checked
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "showPickup" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.addressToPickupStation"
                            )
                          )
                        )
                      ])
                    ])
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-12 col-sm-8" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "address1"
                      }
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "street",
                          autocomplete: "address-line1",
                          id: "txtStreet" + _vm._uid,
                          "data-testing": "delivery-address-de-street"
                        },
                        domProps: { value: _vm.value.address1 },
                        on: {
                          input: function($event) {
                            return _vm.emitInputEvent(
                              "address1",
                              $event.target.value
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "txtStreet" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate("Ceres::Template.addressStreet")
                          ) + "*"
                        )
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-12 col-sm-4" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "address2"
                      }
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "housenumber",
                          autocomplete: "address-line2",
                          id: "txtNumber" + _vm._uid,
                          "data-testing": "delivery-address-de-housenumber"
                        },
                        domProps: { value: _vm.value.address2 },
                        on: {
                          input: function($event) {
                            return _vm.emitInputEvent(
                              "address2",
                              $event.target.value
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "txtNumber" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate("Ceres::Template.addressNumber")
                          ) + "*"
                        )
                      ])
                    ]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.address3")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.address3"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.address3')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address3" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress0" + _vm._uid
                            },
                            domProps: { value: _vm.value.address3 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address3",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress1",
                                      "de",
                                      "delivery_address.address3"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.isInOptionalFields("de", "delivery_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.address4')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "decorateAddress",
                              id: "decorateAddress1" + _vm._uid
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress1" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressAdditionalAddress2",
                                      "de",
                                      "delivery_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "postalCode" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid,
                      "data-testing": "delivery-address-de-zip"
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid,
                      "data-testing": "delivery-address-de-town"
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" }
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields
                  },
                  on: {
                    "country-changed": function($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("de", "delivery_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "de",
                                "delivery_address.email"
                              ),
                              expression:
                                "isInRequiredFields('de', 'delivery_address.email')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "mail",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "delivery-address-de-email-input"
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "de",
                                  "delivery_address.email"
                                )
                              )
                            )
                          ])
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ])
          ]
        : _vm.localeToShow == "GB" && _vm.addressType === "2"
        ? [
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "delivery_address.salutation")
                  ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "delivery_address.salutation"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'delivery_address.salutation')"
                            }
                          ],
                          staticClass: "input-unit"
                        },
                        [
                          _c("salutation-select", {
                            attrs: {
                              id: "txtSalutation" + _vm._uid,
                              "address-type": _vm.addressType,
                              "address-data": _vm.value,
                              "enabled-address-fields":
                                _vm.optionalAddressFields
                            },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  $event.field,
                                  $event.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtSalutation" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressSalutation",
                                      "gb",
                                      "delivery_address.salutation"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                (_vm.isInOptionalFields("gb", "delivery_address.salutation") &&
                  _vm.value.gender === "company") ||
                (_vm.isInOptionalFields("gb", "delivery_address.name1") &&
                  !_vm.isInOptionalFields("gb", "delivery_address.salutation"))
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          staticClass: "input-unit",
                          attrs: {
                            "data-validate": "text",
                            "data-model": "name1"
                          }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "company",
                              id: "txtCompany" + _vm._uid,
                              "data-autofocus": ""
                            },
                            domProps: { value: _vm.value.name1 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "name1",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtCompany" + _vm._uid } },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.$translate(
                                    "Ceres::Template.addressCompany"
                                  )
                                ) + "*"
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "col-12 col-sm-6" },
                  [
                    _c("vat-id", {
                      attrs: {
                        "is-required": _vm.isInRequiredFields(
                          "gb",
                          "delivery_address.vatNumber"
                        ),
                        "selected-country-id": _vm.value.countryId,
                        value: _vm.value.vatNumber || "",
                        "show-input":
                          (_vm.isInOptionalFields(
                            "gb",
                            "delivery_address.salutation"
                          ) &&
                            _vm.value.gender === "company" &&
                            _vm.isInOptionalFields(
                              "gb",
                              "delivery_address.vatNumber"
                            )) ||
                          (!_vm.isInOptionalFields(
                            "gb",
                            "delivery_address.salutation"
                          ) &&
                            _vm.isInOptionalFields(
                              "gb",
                              "delivery_address.name1"
                            ) &&
                            _vm.isInOptionalFields(
                              "gb",
                              "delivery_address.vatNumber"
                            ))
                      },
                      on: {
                        input: function($event) {
                          return _vm.emitInputEvent("vatNumber", $event)
                        }
                      }
                    })
                  ],
                  1
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c(
                "div",
                { staticClass: "row" },
                [
                  _vm.isInOptionalFields("gb", "delivery_address.title")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "delivery_address.title"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'delivery_address.title')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "title" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "title",
                                id: "txtTitle" + _vm._uid,
                                "data-autofocus": ""
                              },
                              domProps: { value: _vm.value.title },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "title",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTitle" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTitle",
                                        "gb",
                                        "delivery_address.title"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.areNameFieldsShown("gb", "delivery_address")
                    ? [
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "gb",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('gb', 'delivery_address')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name2" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "firstName",
                                  id: "txtFirstName" + _vm._uid,
                                  "data-autofocus": ""
                                },
                                domProps: { value: _vm.value.name2 },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "name2",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtFirstName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressFirstName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "gb",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e()
                                ],
                                2
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 col-sm-4" }, [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "validate",
                                  rawName: "v-validate:text",
                                  value: _vm.areNameFieldsRequired(
                                    "gb",
                                    "delivery_address"
                                  ),
                                  expression:
                                    "areNameFieldsRequired('gb', 'delivery_address')",
                                  arg: "text"
                                }
                              ],
                              staticClass: "input-unit",
                              attrs: { "data-model": "name3" }
                            },
                            [
                              _c("input", {
                                attrs: {
                                  type: "text",
                                  name: "lastName",
                                  id: "txtLastName" + _vm._uid
                                },
                                domProps: { value: _vm.value.name3 },
                                on: {
                                  input: function($event) {
                                    return _vm.emitInputEvent(
                                      "name3",
                                      $event.target.value
                                    )
                                  }
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                { attrs: { for: "txtLastName" + _vm._uid } },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.$translate(
                                        "Ceres::Template.addressLastName"
                                      )
                                    )
                                  ),
                                  _vm.areNameFieldsRequired(
                                    "gb",
                                    "delivery_address"
                                  )
                                    ? [_vm._v("*")]
                                    : _vm._e()
                                ],
                                2
                              )
                            ]
                          )
                        ])
                      ]
                    : _c("div", { staticClass: "col-12 col-sm-8" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "delivery_address.contactPerson"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'delivery_address.contactPerson')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "contactPerson" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "lastName",
                                id: "txtContactPerson" + _vm._uid
                              },
                              domProps: { value: _vm.value.contactPerson },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "contactPerson",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtContactPerson" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressContactPerson",
                                        "gb",
                                        "delivery_address.contactPerson"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ]),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "delivery_address.name4")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "delivery_address.name4"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'delivery_address.name4')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "name4" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "decorateName",
                                id: "txtAdditionalName" + _vm._uid
                              },
                              domProps: { value: _vm.value.name4 },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "name4",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              {
                                attrs: { for: "txtAdditionalName" + _vm._uid }
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressGBNameAffix",
                                        "gb",
                                        "delivery_address.name4"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.isInOptionalFields("gb", "delivery_address.phoneNumber")
                    ? _c("div", { staticClass: "col-12 col-sm-4" }, [
                        _c(
                          "div",
                          {
                            directives: [
                              {
                                name: "validate",
                                rawName: "v-validate:text",
                                value: _vm.isInRequiredFields(
                                  "gb",
                                  "delivery_address.phoneNumber"
                                ),
                                expression:
                                  "isInRequiredFields('gb', 'delivery_address.phoneNumber')",
                                arg: "text"
                              }
                            ],
                            staticClass: "input-unit",
                            attrs: { "data-model": "telephone" }
                          },
                          [
                            _c("input", {
                              attrs: {
                                type: "text",
                                name: "telephone",
                                id: "txtTelephone" + _vm._uid
                              },
                              domProps: { value: _vm.value.telephone },
                              on: {
                                input: function($event) {
                                  return _vm.emitInputEvent(
                                    "telephone",
                                    $event.target.value
                                  )
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "label",
                              { attrs: { for: "txtTelephone" + _vm._uid } },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      _vm.transformTranslation(
                                        "Ceres::Template.addressTelephone",
                                        "gb",
                                        "delivery_address.phoneNumber"
                                      )
                                    ) +
                                    "\n                        "
                                )
                              ]
                            )
                          ]
                        )
                      ])
                    : _vm._e()
                ],
                2
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-12 col-sm-8" }, [
                  _c(
                    "div",
                    {
                      staticClass: "input-unit",
                      attrs: {
                        "data-validate": "text",
                        "data-model": "address1"
                      }
                    },
                    [
                      _c("input", {
                        attrs: {
                          type: "text",
                          name: "street",
                          autocomplete: "address-line1",
                          id: "txtStreet" + _vm._uid
                        },
                        domProps: { value: _vm.value.address1 },
                        on: {
                          input: function($event) {
                            return _vm.emitInputEvent(
                              "address1",
                              $event.target.value
                            )
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("label", { attrs: { for: "txtStreet" + _vm._uid } }, [
                        _vm._v(
                          _vm._s(
                            _vm.$translate(
                              "Ceres::Template.addressENAddressLine1"
                            )
                          ) + "*"
                        )
                      ])
                    ]
                  )
                ]),
                _vm._v(" "),
                _vm.isInOptionalFields("gb", "delivery_address.address2")
                  ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "delivery_address.address2"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'delivery_address.address2')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address2" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "housenumber",
                              autocomplete: "address-line2",
                              id: "txtNumber" + _vm._uid
                            },
                            domProps: { value: _vm.value.address2 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address2",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "txtNumber" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine2",
                                      "gb",
                                      "delivery_address.address2"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "delivery_address.address3")
                  ? _c("div", { staticClass: "col-12 col-sm-6" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "delivery_address.address3"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'delivery_address.address3')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address3" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "buildingName",
                              id: "decorateAddress0" + _vm._uid
                            },
                            domProps: { value: _vm.value.address3 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address3",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress0" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine3",
                                      "gb",
                                      "delivery_address.address3"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.isInOptionalFields("gb", "delivery_address.address4")
                  ? _c("div", { staticClass: "col-12 col-sm-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "delivery_address.address4"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'delivery_address.address4')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "address4" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "text",
                              name: "buildingName",
                              id: "decorateAddress1" + _vm._uid
                            },
                            domProps: { value: _vm.value.address4 },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "address4",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "label",
                            { attrs: { for: "decorateAddress1" + _vm._uid } },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.transformTranslation(
                                      "Ceres::Template.addressENAddressLine4",
                                      "gb",
                                      "delivery_address.address4"
                                    )
                                  ) +
                                  "\n                        "
                              )
                            ]
                          )
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "town" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "town",
                      id: "txtPlace" + _vm._uid
                    },
                    domProps: { value: _vm.value.town },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent("town", $event.target.value)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtPlace" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressPlace")) +
                        "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-12 col-sm-4" }, [
              _c(
                "div",
                {
                  staticClass: "input-unit",
                  attrs: { "data-validate": "text", "data-model": "postalCode" }
                },
                [
                  _c("input", {
                    attrs: {
                      type: "text",
                      name: "zip",
                      id: "txtZip" + _vm._uid
                    },
                    domProps: { value: _vm.value.postalCode },
                    on: {
                      input: function($event) {
                        return _vm.emitInputEvent(
                          "postalCode",
                          $event.target.value
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("label", { attrs: { for: "txtZip" + _vm._uid } }, [
                    _vm._v(
                      _vm._s(_vm.$translate("Ceres::Template.addressZip")) + "*"
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "col-12 col-sm-4",
                attrs: { "data-testing": "address-country-select" }
              },
              [
                _c("country-select", {
                  attrs: {
                    "selected-country-id": _vm.value.countryId,
                    "selected-state-id": _vm.value.stateId,
                    "address-type": _vm.addressType,
                    "optional-address-fields": _vm.optionalAddressFields,
                    "required-address-fields": _vm.requiredAddressFields
                  },
                  on: {
                    "country-changed": function($event) {
                      return _vm.onSelectedCountryChanged($event)
                    },
                    "state-changed": function($event) {
                      return _vm.emitInputEvent("stateId", $event)
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm._t("custom-address-fields"),
            _vm._v(" "),
            _c("div", { staticClass: "col-12" }, [
              _c("hr", { staticClass: "mt-0" }),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.isInOptionalFields("gb", "delivery_address.email")
                  ? _c("div", { staticClass: "col-12" }, [
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "validate",
                              rawName: "v-validate:text",
                              value: _vm.isInRequiredFields(
                                "gb",
                                "delivery_address.email"
                              ),
                              expression:
                                "isInRequiredFields('gb', 'delivery_address.email')",
                              arg: "text"
                            }
                          ],
                          staticClass: "input-unit",
                          attrs: { "data-model": "email" }
                        },
                        [
                          _c("input", {
                            attrs: {
                              type: "mail",
                              name: "email",
                              id: "email" + _vm._uid,
                              "data-testing": "delivery-address-gb-email-input"
                            },
                            domProps: { value: _vm.value.email },
                            on: {
                              input: function($event) {
                                return _vm.emitInputEvent(
                                  "email",
                                  $event.target.value
                                )
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", { attrs: { for: "email" + _vm._uid } }, [
                            _vm._v(
                              _vm._s(
                                _vm.transformTranslation(
                                  "Ceres::Template.addressMail",
                                  "gb",
                                  "delivery_address.email"
                                )
                              )
                            )
                          ])
                        ]
                      )
                    ])
                  : _vm._e()
              ])
            ])
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=7c39455a&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=7c39455a& ***!
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
  return _c(
    "div",
    [
      _c(
        "div",
        {
          staticClass: "input-unit",
          attrs: { "data-validate": "", "data-model": "countryId" }
        },
        [
          _c(
            "select",
            {
              staticClass: "custom-select",
              attrs: { id: "country-id-select" + _vm._uid },
              domProps: { value: _vm.selectedCountryId },
              on: {
                change: function($event) {
                  return _vm.countryChanged($event.target.value)
                }
              }
            },
            _vm._l(_vm.countryList, function(country) {
              return _c(
                "option",
                {
                  key: country.id,
                  domProps: {
                    value: country.id,
                    selected: country.id === _vm.selectedCountryId
                  }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(country.currLangName) +
                      "\n            "
                  )
                ]
              )
            }),
            0
          ),
          _vm._v(" "),
          _c("label", { attrs: { for: "country-id-select" + _vm._uid } }, [
            _vm._v(_vm._s(_vm.$translate("Ceres::Template.headerCountry")))
          ])
        ]
      ),
      _vm._v(" "),
      _vm.isInOptionalFields("stateId")
        ? [
            _vm.stateList && _vm.stateList.length > 0
              ? _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "validate",
                        rawName: "v-validate",
                        value: _vm.isInRequiredFields("stateId"),
                        expression: "isInRequiredFields('stateId')"
                      }
                    ],
                    staticClass: "input-unit",
                    attrs: { "data-model": "stateId" }
                  },
                  [
                    _c(
                      "select",
                      {
                        staticClass: "custom-select",
                        attrs: { id: "state-id-select" + _vm._uid },
                        domProps: { value: _vm.selectedStateId },
                        on: {
                          change: function($event) {
                            return _vm.stateChanged($event.target.value)
                          }
                        }
                      },
                      [
                        _c(
                          "option",
                          {
                            domProps: { selected: _vm.selectedStateId === null }
                          },
                          [
                            _vm._v(
                              _vm._s(
                                _vm.$translate(
                                  "Ceres::Template.addressPleaseSelect"
                                )
                              )
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _vm._l(_vm.stateList, function(state) {
                          return _c(
                            "option",
                            {
                              key: state.id,
                              domProps: {
                                value: state.id,
                                selected: state.id === _vm.selectedStateId
                              }
                            },
                            [
                              _vm._v(
                                "\n                    " +
                                  _vm._s(state.name) +
                                  "\n                "
                              )
                            ]
                          )
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c(
                      "label",
                      { attrs: { for: "state-id-select" + _vm._uid } },
                      [
                        _vm._v(
                          _vm._s(
                            _vm.transformTranslation(
                              "Ceres::Template.headerState",
                              "stateId"
                            )
                          )
                        )
                      ]
                    )
                  ]
                )
              : _vm._e()
          ]
        : _vm._e()
    ],
    2
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0e49b1a3&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0e49b1a3& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
    "select",
    {
      staticClass: "custom-select",
      attrs: { "data-testing": "salutation-select", "data-autofocus": "" },
      domProps: { value: _vm.addressData.gender },
      on: {
        change: function($event) {
          return _vm.emitInputEvent($event.target.value)
        }
      }
    },
    _vm._l(_vm.currentSalutation, function(salutation, index) {
      return _c(
        "option",
        {
          key: index,
          domProps: {
            value: salutation.key,
            selected:
              _vm.addressData.gender === salutation.key &&
              _vm.checkGenderCompany(salutation.key)
          }
        },
        [_vm._v("\n        " + _vm._s(salutation.name) + "\n    ")]
      )
    }),
    0
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=0df56745&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=0df56745& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
  return _vm.showInput
    ? _c(
        "div",
        {
          staticClass: "input-group flex-nowrap",
          attrs: { "data-model": "vatNumber" }
        },
        [
          _vm.isEU
            ? _c(
                "div",
                { staticClass: "input-unit w-auto input-group-prepend" },
                [
                  _vm.vatCodes.length === 1
                    ? _c(
                        "span",
                        {
                          staticClass: "input-group-text h-100 border-0",
                          attrs: { id: "basic-addon1" }
                        },
                        [_vm._v(_vm._s(_vm.vatCodes[0]))]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.vatCodes.length > 1
                    ? _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.vatPrefix,
                              expression: "vatPrefix"
                            }
                          ],
                          staticClass: "custom-select",
                          on: {
                            change: function($event) {
                              var $$selectedVal = Array.prototype.filter
                                .call($event.target.options, function(o) {
                                  return o.selected
                                })
                                .map(function(o) {
                                  var val = "_value" in o ? o._value : o.value
                                  return val
                                })
                              _vm.vatPrefix = $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            }
                          }
                        },
                        _vm._l(_vm.vatCodes, function(vatCode, index) {
                          return _c(
                            "option",
                            { key: index, domProps: { value: vatCode } },
                            [_vm._v(_vm._s(vatCode))]
                          )
                        }),
                        0
                      )
                    : _vm._e()
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "validate",
                  rawName: "v-validate:text",
                  value: _vm.isRequired,
                  expression: "isRequired",
                  arg: "text"
                }
              ],
              staticClass: "input-unit flex-fill w-auto"
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.vatNumber,
                    expression: "vatNumber"
                  }
                ],
                attrs: {
                  "aria-describedby": "basic-addon1",
                  type: "text",
                  name: "vatNumber",
                  id: "txtVatNumber" + _vm._uid,
                  "data-autofocus": "",
                  "data-testing": "vat-id"
                },
                domProps: { value: _vm.vatNumber },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.vatNumber = $event.target.value
                  }
                }
              }),
              _vm._v(" "),
              _c("label", { attrs: { for: "txtVatNumber" + _vm._uid } }, [
                _vm._v(
                  "\n            " +
                    _vm._s(
                      _vm.transformTranslation(
                        "Ceres::Template.addressVatNumber",
                        "de",
                        "billing_address.vatNumber"
                      )
                    ) +
                    "\n        "
                )
              ])
            ]
          )
        ]
      )
    : _vm._e()
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

/***/ "./resources/js/src/app/components/customer/AddressInputGroup.vue":
/*!************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/AddressInputGroup.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddressInputGroup_vue_vue_type_template_id_1e4a3dec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddressInputGroup.vue?vue&type=template&id=1e4a3dec& */ "./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=1e4a3dec&");
/* harmony import */ var _AddressInputGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddressInputGroup.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AddressInputGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddressInputGroup_vue_vue_type_template_id_1e4a3dec___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AddressInputGroup_vue_vue_type_template_id_1e4a3dec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/AddressInputGroup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddressInputGroup.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=1e4a3dec&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=1e4a3dec& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_template_id_1e4a3dec___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./AddressInputGroup.vue?vue&type=template&id=1e4a3dec& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/AddressInputGroup.vue?vue&type=template&id=1e4a3dec&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_template_id_1e4a3dec___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddressInputGroup_vue_vue_type_template_id_1e4a3dec___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/customer/CountrySelect.vue":
/*!********************************************************************!*\
  !*** ./resources/js/src/app/components/customer/CountrySelect.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountrySelect_vue_vue_type_template_id_7c39455a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CountrySelect.vue?vue&type=template&id=7c39455a& */ "./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=7c39455a&");
/* harmony import */ var _CountrySelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CountrySelect.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CountrySelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CountrySelect_vue_vue_type_template_id_7c39455a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CountrySelect_vue_vue_type_template_id_7c39455a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/CountrySelect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CountrySelect.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=7c39455a&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=7c39455a& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_template_id_7c39455a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./CountrySelect.vue?vue&type=template&id=7c39455a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/CountrySelect.vue?vue&type=template&id=7c39455a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_template_id_7c39455a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CountrySelect_vue_vue_type_template_id_7c39455a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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



/***/ }),

/***/ "./resources/js/src/app/components/customer/SalutationSelect.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/app/components/customer/SalutationSelect.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SalutationSelect_vue_vue_type_template_id_0e49b1a3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SalutationSelect.vue?vue&type=template&id=0e49b1a3& */ "./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0e49b1a3&");
/* harmony import */ var _SalutationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SalutationSelect.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SalutationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SalutationSelect_vue_vue_type_template_id_0e49b1a3___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SalutationSelect_vue_vue_type_template_id_0e49b1a3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/SalutationSelect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SalutationSelect.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0e49b1a3&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0e49b1a3& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_template_id_0e49b1a3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SalutationSelect.vue?vue&type=template&id=0e49b1a3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/SalutationSelect.vue?vue&type=template&id=0e49b1a3&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_template_id_0e49b1a3___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SalutationSelect_vue_vue_type_template_id_0e49b1a3___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/customer/VatId.vue":
/*!************************************************************!*\
  !*** ./resources/js/src/app/components/customer/VatId.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VatId_vue_vue_type_template_id_0df56745___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VatId.vue?vue&type=template&id=0df56745& */ "./resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=0df56745&");
/* harmony import */ var _VatId_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VatId.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VatId_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VatId_vue_vue_type_template_id_0df56745___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VatId_vue_vue_type_template_id_0df56745___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/customer/VatId.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VatId.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/VatId.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=0df56745&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=0df56745& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_template_id_0df56745___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./VatId.vue?vue&type=template&id=0df56745& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/customer/VatId.vue?vue&type=template&id=0df56745&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_template_id_0df56745___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VatId_vue_vue_type_template_id_0df56745___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/mixins/buttonSizeProperty.mixin.js":
/*!*****************************************************************!*\
  !*** ./resources/js/src/app/mixins/buttonSizeProperty.mixin.js ***!
  \*****************************************************************/
/*! exports provided: ButtonSizePropertyMixin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonSizePropertyMixin", function() { return ButtonSizePropertyMixin; });
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
/* harmony import */ var core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
/* harmony import */ var core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
/* harmony import */ var core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_iterator_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
/* harmony import */ var core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_iterator_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
/* harmony import */ var core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
/* harmony import */ var core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_iterator_js__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
/* harmony import */ var core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_from_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_12__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }














var BUTTON_SIZES = ["btn-sm", "btn-lg"];
var LEGACY_CLASS_MAP = {
  "sm": "btn-sm",
  "md": "",
  "lg": "btn-lg"
};
var ButtonSizePropertyMixin = {
  props: {
    buttonSize: {
      type: [String, null],
      default: null,
      validator: function validator(value) {
        return [""].concat(BUTTON_SIZES, _toConsumableArray(Object.keys(LEGACY_CLASS_MAP))).indexOf(value) !== -1;
      }
    }
  },
  computed: {
    buttonSizeClass: function buttonSizeClass() {
      if (LEGACY_CLASS_MAP.hasOwnProperty(this.buttonSize)) {
        return LEGACY_CLASS_MAP[this.buttonSize];
      }

      return this.buttonSize;
    }
  }
};

/***/ })

}]);
//# sourceMappingURL=ceres-client-2.js.map