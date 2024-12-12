(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "EuResponsibleDetails",
  props: {
    manufacturer: {
      type: Object,
      required: true
    },
    concatenatedNames: {
      type: String,
      default: ''
    }
  },
  computed: {
    isEuResponsibleTabShown: function isEuResponsibleTabShown() {
      return this.manufacturer.responsibleEmail !== "" || this.manufacturer.responsibleHouseNo !== "" || this.manufacturer.responsibleName !== "" || this.manufacturer.responsiblePhoneNo !== "" || this.manufacturer.responsiblePostCode !== "" || this.manufacturer.responsibleStreet !== "" || this.manufacturer.responsibleTown !== "" || this.manufacturer.responsibleContactUrl !== "" || this.manufacturer.responsibleCountry !== 0;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EuResponsibleDetails.vue */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue");
//
//
//
//
//
//
//
//
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
  name: "item-eu-responsible-data-list",
  components: {
    EuResponsibleDetails: _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    itemComponents: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
/* harmony import */ var core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.object.values.js */ "./node_modules/core-js/modules/es.object.values.js");
/* harmony import */ var core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_values_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ItemManufacturerDataList_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ItemManufacturerDataList.vue */ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue");
/* harmony import */ var _ItemEuResponsibleDataList_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ItemEuResponsibleDataList.vue */ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue");
/* harmony import */ var _ManufacturerDetails_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ManufacturerDetails.vue */ "./resources/js/src/app/components/item/ManufacturerDetails.vue");
/* harmony import */ var _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./EuResponsibleDetails.vue */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue");
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




/* harmony default export */ __webpack_exports__["default"] = ({
  name: "item-manufacturer",
  components: {
    ItemManufacturerDataList: _ItemManufacturerDataList_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    ItemEuResponsibleDataList: _ItemEuResponsibleDataList_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    ManufacturerDetails: _ManufacturerDetails_vue__WEBPACK_IMPORTED_MODULE_11__["default"],
    EuResponsibleDetails: _EuResponsibleDetails_vue__WEBPACK_IMPORTED_MODULE_12__["default"]
  },
  props: {
    selectionType: String
  },
  inject: {
    itemId: {
      default: null
    }
  },
  computed: {
    simpleItemManufacturer: function simpleItemManufacturer() {
      if (!this.isItemSet && !this.isBundle) {
        return this.$store.getters["".concat(this.itemId, "/currentItemVariation")].item.manufacturer;
      }
    },
    currentVariation: function currentVariation() {
      return this.$store.getters["".concat(this.itemId, "/currentItemVariation")];
    },
    isBundle: function isBundle() {
      return this.$store.getters["".concat(this.itemId, "/currentItemVariation")].variation.bundleType === 'bundle';
    },
    bundleComponents: function bundleComponents() {
      var bundleComponents = this.$store.getters["".concat(this.itemId, "/currentItemVariation")].bundleComponents || [];
      var items = bundleComponents.map(function (component) {
        return {
          manufacturerId: component.data.item.manufacturerId,
          manufacturer: component.data.item.manufacturer,
          texts: component.data.texts
        };
      });
      return this.transformComponents(items);
    },
    isItemSet: function isItemSet() {
      return this.$store.getters["".concat(this.itemId, "/currentItemVariation")].item.itemType === 'set';
    },
    setComponents: function setComponents() {
      var items = this.$store.getters["".concat(this.itemId, "/currentItemVariation")].setComponents || [];
      return this.transformComponents(items);
    }
  },
  methods: {
    transformComponents: function transformComponents(components) {
      var manufacturerMap = {};
      components.forEach(function (item) {
        var _item$texts;

        var manufacturerId = item.manufacturerId;
        var itemName = ((_item$texts = item.texts) === null || _item$texts === void 0 ? void 0 : _item$texts.name1) || '';
        var manufacturer = item.manufacturer;

        if (!manufacturerMap[manufacturerId]) {
          manufacturerMap[manufacturerId] = {
            manufacturerId: manufacturerId,
            manufacturer: manufacturer,
            concatenatedNames: []
          };
        }

        manufacturerMap[manufacturerId].concatenatedNames.push(itemName);
      });
      return Object.values(manufacturerMap).map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          concatenatedNames: item.concatenatedNames.join(', ')
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManufacturerDetails_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManufacturerDetails.vue */ "./resources/js/src/app/components/item/ManufacturerDetails.vue");
//
//
//
//
//
//
//
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
  name: "item-manufacturer-data-list",
  components: {
    ManufacturerDetails: _ManufacturerDetails_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    itemComponents: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
/* harmony import */ var core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name_js__WEBPACK_IMPORTED_MODULE_0__);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "ManufacturerDetails",
  props: {
    manufacturer: {
      type: Object,
      required: true
    },
    concatenatedNames: {
      type: String,
      default: ''
    }
  },
  computed: {
    isManufacturerTabShown: function isManufacturerTabShown() {
      return this.manufacturer.url !== "" || this.manufacturer.street !== "" || this.manufacturer.houseNo !== "" || this.manufacturer.postcode !== "" || this.manufacturer.town !== "" || this.manufacturer.countryId !== 0 || this.manufacturer.phoneNumber !== "" || this.manufacturer.faxNumber !== "" || this.manufacturer.email !== "" || this.manufacturer.legalName !== "" || this.manufacturer.contactUrl !== "" || this.manufacturer.name !== "" || this.manufacturer.externalName !== "";
    }
  }
});

/***/ }),

/***/ "./node_modules/core-js/internals/object-to-array.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-array.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var propertyIsEnumerable = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js").f;

// `Object.{ entries, values }` methods implementation
var createMethod = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.object.values.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.values.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var $values = __webpack_require__(/*! ../internals/object-to-array */ "./node_modules/core-js/internals/object-to-array.js").values;

// `Object.values` method
// https://tc39.es/ecma262/#sec-object.values
$({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196& ***!
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
    "div",
    [
      _vm.manufacturer && _vm.isEuResponsibleTabShown
        ? [
            _vm.concatenatedNames
              ? _c("div", { staticClass: "mb-2" }, [
                  _c("b", [_vm._v(_vm._s(_vm.concatenatedNames))])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleName))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleStreet))]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleHouseNo))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [
                _vm._v(_vm._s(_vm.manufacturer.responsiblePostCode))
              ]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleTown))]),
              _vm._v(" "),
              _vm.manufacturer.responsibleCountryObject
                ? _c("span", [
                    _vm._v(
                      "\n      " +
                        _vm._s(_vm.manufacturer.responsibleCountryObject.name) +
                        "\n    "
                    )
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsibleEmail))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.responsiblePhoneNo))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [
                _vm._v(_vm._s(_vm.manufacturer.responsibleContactUrl))
              ])
            ])
          ]
        : [
            _vm._v(
              "\n    " +
                _vm._s(
                  _vm.$translate(
                    "Ceres::Template.itemEuResponsibleNoInformation"
                  )
                ) +
                "\n  "
            )
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
      _c("h4", [
        _vm._v(
          _vm._s(_vm.$translate("Ceres::Template.itemEuResponsiblePersonTitle"))
        )
      ]),
      _vm._v(" "),
      _vm.itemComponents.length > 0
        ? [
            _vm._l(_vm.itemComponents, function(component) {
              return [
                _c("eu-responsible-details", {
                  attrs: {
                    manufacturer: component.manufacturer,
                    "concatenated-names": component.concatenatedNames
                  }
                }),
                _vm._v(" "),
                _c("hr")
              ]
            })
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444& ***!
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
    "div",
    [
      _vm.isItemSet
        ? [
            _vm.selectionType === "manufacturer"
              ? [
                  _c("item-manufacturer-data-list", {
                    attrs: { "item-components": _vm.setComponents }
                  })
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm.selectionType === "eu-responsible"
              ? [
                  _c("item-eu-responsible-data-list", {
                    attrs: { "item-components": _vm.setComponents }
                  })
                ]
              : _vm._e()
          ]
        : _vm.isBundle
        ? [
            _vm.selectionType === "manufacturer"
              ? [
                  _c("item-manufacturer-data-list", {
                    attrs: { "item-components": _vm.bundleComponents }
                  })
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm.selectionType === "eu-responsible"
              ? [
                  _c("item-eu-responsible-data-list", {
                    attrs: { "item-components": _vm.bundleComponents }
                  })
                ]
              : _vm._e()
          ]
        : [
            _vm.selectionType === "manufacturer" && _vm.simpleItemManufacturer
              ? _c("manufacturer-details", {
                  attrs: { manufacturer: _vm.simpleItemManufacturer }
                })
              : _vm.selectionType === "eu-responsible" &&
                _vm.simpleItemManufacturer
              ? _c("eu-responsible-details", {
                  attrs: { manufacturer: _vm.simpleItemManufacturer }
                })
              : _vm._e()
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
      _c("h4", [
        _vm._v(
          _vm._s(_vm.$translate("Ceres::Template.itemManufacturerDetailsTitle"))
        )
      ]),
      _vm._v(" "),
      _vm.itemComponents.length > 0
        ? [
            _vm._l(_vm.itemComponents, function(component) {
              return [
                _c("manufacturer-details", {
                  attrs: {
                    manufacturer: component.manufacturer,
                    "concatenated-names": component.concatenatedNames
                  }
                }),
                _vm._v(" "),
                _c("hr")
              ]
            })
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47& ***!
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
    [
      _vm.manufacturer && _vm.isManufacturerTabShown
        ? [
            _vm.concatenatedNames
              ? _c("div", { staticClass: "mb-2" }, [
                  _c("b", [_vm._v(_vm._s(_vm.concatenatedNames))])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.manufacturer.name
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [_vm._v(_vm._s(_vm.manufacturer.name))])
                ])
              : _vm.manufacturer.externalName
              ? _c("div", { staticClass: "p-0" }, [
                  _c("span", [_vm._v(_vm._s(_vm.manufacturer.externalName))])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.legalName))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.street))]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.houseNo))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.postcode))]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.town))]),
              _vm._v(" "),
              _vm.manufacturer.countryObject
                ? _c("span", [
                    _vm._v(_vm._s(_vm.manufacturer.countryObject.name))
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.email))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.url))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.phoneNumber))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.faxNumber))])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "p-0" }, [
              _c("span", [_vm._v(_vm._s(_vm.manufacturer.contactUrl))])
            ])
          ]
        : [
            _vm._v(
              "\n    " +
                _vm._s(
                  _vm.$translate(
                    "Ceres::Template.itemManufacturerNoInformation"
                  )
                ) +
                "\n  "
            )
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/EuResponsibleDetails.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/src/app/components/item/EuResponsibleDetails.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EuResponsibleDetails.vue?vue&type=template&id=74bdf196& */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196&");
/* harmony import */ var _EuResponsibleDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EuResponsibleDetails.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _EuResponsibleDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/EuResponsibleDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EuResponsibleDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./EuResponsibleDetails.vue?vue&type=template&id=74bdf196& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/EuResponsibleDetails.vue?vue&type=template&id=74bdf196&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EuResponsibleDetails_vue_vue_type_template_id_74bdf196___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e& */ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e&");
/* harmony import */ var _ItemEuResponsibleDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemEuResponsibleDataList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemEuResponsibleDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemEuResponsibleDataList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemEuResponsibleDataList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e&":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e& ***!
  \***********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemEuResponsibleDataList.vue?vue&type=template&id=68892e1e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemEuResponsibleDataList_vue_vue_type_template_id_68892e1e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturer.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturer.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemManufacturer_vue_vue_type_template_id_b140e444___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemManufacturer.vue?vue&type=template&id=b140e444& */ "./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444&");
/* harmony import */ var _ItemManufacturer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemManufacturer.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemManufacturer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemManufacturer_vue_vue_type_template_id_b140e444___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemManufacturer_vue_vue_type_template_id_b140e444___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemManufacturer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_template_id_b140e444___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturer.vue?vue&type=template&id=b140e444& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturer.vue?vue&type=template&id=b140e444&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_template_id_b140e444___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturer_vue_vue_type_template_id_b140e444___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturerDataList.vue ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItemManufacturerDataList.vue?vue&type=template&id=c4011134& */ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134&");
/* harmony import */ var _ItemManufacturerDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ItemManufacturerDataList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ItemManufacturerDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ItemManufacturerDataList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturerDataList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134& ***!
  \**********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ItemManufacturerDataList.vue?vue&type=template&id=c4011134& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ItemManufacturerDataList.vue?vue&type=template&id=c4011134&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ItemManufacturerDataList_vue_vue_type_template_id_c4011134___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/components/item/ManufacturerDetails.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/src/app/components/item/ManufacturerDetails.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ManufacturerDetails.vue?vue&type=template&id=145dfd47& */ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47&");
/* harmony import */ var _ManufacturerDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ManufacturerDetails.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ManufacturerDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/ManufacturerDetails.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManufacturerDetails.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./ManufacturerDetails.vue?vue&type=template&id=145dfd47& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/ManufacturerDetails.vue?vue&type=template&id=145dfd47&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ManufacturerDetails_vue_vue_type_template_id_145dfd47___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=ceres-4.js.map