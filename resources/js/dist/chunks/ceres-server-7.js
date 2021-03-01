exports.ids = [7];
exports.modules = {

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
/* harmony import */ var core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
/* harmony import */ var core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
/* harmony import */ var core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptor_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
/* harmony import */ var core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_get_own_property_descriptors_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helper_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../helper/get */ "./resources/js/src/app/helper/get.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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



/* harmony default export */ __webpack_exports__["default"] = ({
  name: "single-item-set-component",
  props: {
    itemId: {
      type: Number,
      required: !App.isShopBuilder
    },
    initialVariationId: Number,
    attributes: Array,
    variations: Array,
    afterKey: Object
  },
  provide: function provide() {
    return {
      itemId: App.isShopBuilder ? this.previewItemId : this.itemId
    };
  },
  computed: _objectSpread({
    variationId: function variationId() {
      return this.variation && this.variation.variation.id;
    }
  }, Object(vuex__WEBPACK_IMPORTED_MODULE_9__["mapState"])({
    variation: function variation(state) {
      var itemModule = state.items[this.itemId];
      this.ready();
      return itemModule && itemModule.variation.documents[0].data;
    },
    isSetLoading: function isSetLoading(state) {
      return state.items.isSetLoading;
    },
    previewItemId: function previewItemId(state) {
      return state.items.previewItemId;
    }
  })),
  methods: {
    ready: function ready() {
      this.$store.dispatch("".concat(this.itemId, "/variationSelect/setVariationSelect"), {
        itemId: this.itemId,
        attributes: this.attributes,
        variations: this.variations,
        initialVariationId: this.initialVariationId,
        isPleaseSelectOption: true,
        afterKey: this.afterKey
      }); // function should only be executed once

      this.ready = function () {};
    },
    getDataField: function getDataField(field) {
      return Object(_helper_get__WEBPACK_IMPORTED_MODULE_7__["get"])(this.variation, field);
    },
    getFilteredDataField: function getFilteredDataField(field, filter) {
      if (!Object(_helper_utils__WEBPACK_IMPORTED_MODULE_8__["isNullOrUndefined"])(this.$options.filters[filter])) {
        return this.$options.filters[filter](this.getDataField(field));
      }

      return this.getDataField(field);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=template&id=014d5eb0&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=template&id=014d5eb0& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
      (!_vm.isSetLoading && _vm.variation) || _vm.$ceres.isShopBuilder
        ? _vm._t("default", null, {
            itemId: _vm.itemId,
            variationId: _vm.variationId,
            variation: _vm.variation,
            getDataField: _vm.getDataField,
            getFilteredDataField: _vm.getFilteredDataField
          })
        : _vm.isSetLoading
        ? _c("loading-animation", { staticClass: "prop-3-1" })
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/app/components/item/SingleItemSetComponent.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SingleItemSetComponent.vue ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SingleItemSetComponent_vue_vue_type_template_id_014d5eb0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SingleItemSetComponent.vue?vue&type=template&id=014d5eb0& */ "./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=template&id=014d5eb0&");
/* harmony import */ var _SingleItemSetComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingleItemSetComponent.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SingleItemSetComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SingleItemSetComponent_vue_vue_type_template_id_014d5eb0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SingleItemSetComponent_vue_vue_type_template_id_014d5eb0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  "a712546a"
  
)

component.options.__file = "resources/js/src/app/components/item/SingleItemSetComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemSetComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SingleItemSetComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemSetComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=template&id=014d5eb0&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=template&id=014d5eb0& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemSetComponent_vue_vue_type_template_id_014d5eb0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib??vue-loader-options!./SingleItemSetComponent.vue?vue&type=template&id=014d5eb0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/app/components/item/SingleItemSetComponent.vue?vue&type=template&id=014d5eb0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemSetComponent_vue_vue_type_template_id_014d5eb0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SingleItemSetComponent_vue_vue_type_template_id_014d5eb0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/src/app/helper/get.js":
/*!********************************************!*\
  !*** ./resources/js/src/app/helper/get.js ***!
  \********************************************/
/*! exports provided: get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.find.js */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
/* harmony import */ var core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./resources/js/src/app/helper/utils.js");




function get(object, path) {
  var fieldExp = /{\s*\S+\s*,\s*\S+\s*}|\w+/gm;
  var key;

  while (!Object(_utils__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(object) && (key = fieldExp.exec(path)) !== null) {
    if (key.index === fieldExp.lastIndex) {
      fieldExp.lastIndex++;
    }

    object = readField(object, key[0]);
  }

  return object;
}

function readField(object, field) {
  if (Object(_utils__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(object)) {
    return null;
  }

  var match = /^{\s*(\S+)\s*,\s*(\S+)\s*}$/.exec(field);

  if (!Object(_utils__WEBPACK_IMPORTED_MODULE_3__["isNullOrUndefined"])(match)) {
    var searchKey = match[1];
    var searchValue = match[2];
    return Array.prototype.slice.call(object).find(function (entry) {
      return get(entry, searchKey) + "" === searchValue;
    });
  }

  return object[field];
}

/***/ })

};;
//# sourceMappingURL=ceres-server-7.js.map