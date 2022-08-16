"use strict";
(self["webpackChunkCeres"] = self["webpackChunkCeres"] || []).push([[18],{

/***/ "./resources/js/src/app/components/basket/list/SetComponentItem.vue":
/*!**************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/SetComponentItem.vue ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SetComponentItem_vue_vue_type_template_id_6813ea08___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SetComponentItem.vue?vue&type=template&id=6813ea08& */ "./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=template&id=6813ea08&");
/* harmony import */ var _SetComponentItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SetComponentItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _SetComponentItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SetComponentItem_vue_vue_type_template_id_6813ea08___WEBPACK_IMPORTED_MODULE_0__.render,
  _SetComponentItem_vue_vue_type_template_id_6813ea08___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/basket/list/SetComponentItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _item_OrderPropertyValueList_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../item/OrderPropertyValueList.vue */ "./resources/js/src/app/components/item/OrderPropertyValueList.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: "set-component-item",

    components: {
        OrderPropertyValueList: _item_OrderPropertyValueList_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
    },
    
    props: {
        variation: Object,
        quantity: Number,
        orderProperties: Array,
        rebate: Number
    },
    computed: {
        itemImage()
        {
            const itemImages = this.$options.filters.itemImages(this.variation.images, "urlPreview");

            return this.$options.filters.itemImage(itemImages);
        },

        altText()
        {
            const images = this.$options.filters.itemImages(this.variation.images, "urlPreview");

            return this.$options.filters.itemImageAlternativeText(images) || this.itemName;
        },

        itemName()
        {
            return this.$options.filters.itemName(this.variation);
        },

        mappedBasketItem()
        {
            // bring given data in basket item structure
            return {
                variation:
                {
                    data: this.variation
                },
                basketItemOrderParams: this.orderProperties
            };
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueList.vue":
/*!*************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueList.vue ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderPropertyValueList.vue?vue&type=template&id=0f3f4786& */ "./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786&");
/* harmony import */ var _OrderPropertyValueList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderPropertyValueList.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderPropertyValueList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__.render,
  _OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/OrderPropertyValueList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./resources/js/src/app/helper/utils.js");
/* harmony import */ var _OrderPropertyValueListItem_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderPropertyValueListItem.vue */ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue");
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
    name: "order-property-value-list",

    components:
    {
        OrderPropertyValueListItem: _OrderPropertyValueListItem_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
    },

    props:
    {
        basketItem:
        {
            required: true,
            type: Object
        }
    },

    computed:
    {
        shownProperties()
        {
            const shownProperties = [];

            this.basketItem.variation.data.properties.forEach(property =>
            {
                const filledProperty = this.basketItem.basketItemOrderParams.find(prop =>
                {
                    return parseInt(prop.propertyId) === property.propertyId;
                });

                if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isDefined)(filledProperty))
                {
                    if (filledProperty.type === "selection")
                    {
                        property.property.value = property.property.selectionValues[filledProperty.value].name;
                    }
                    else
                    {
                        property.property.value = filledProperty.value;
                    }
                }

                if((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isDefined)(filledProperty) || this.isPropertyWithAdditionalCosts(property))
                {
                    shownProperties.push(property);
                }
            });

            return shownProperties;
        }
    },

    methods:
    {
        isPropertyWithAdditionalCosts(property)
        {
            return property.property &&
                property.property.isShownAtCheckout &&
                property.property.isShownAsAdditionalCosts &&
                !property.property.isOderProperty
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue":
/*!*****************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueListItem.vue ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OrderPropertyValueListItem.vue?vue&type=template&id=905d838e& */ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e&");
/* harmony import */ var _OrderPropertyValueListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OrderPropertyValueListItem.vue?vue&type=script&lang=js& */ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _OrderPropertyValueListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__.render,
  _OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/app/components/item/OrderPropertyValueListItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_OrderPropertyHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/OrderPropertyHelper */ "./resources/js/src/app/helper/OrderPropertyHelper.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    name: "order-property-value-list-item",

    props:
    {
        property:
        {
            required: true,
            type: Object
        }
    },

    computed:
    {
        surcharge()
        {
            return this.$options.filters.propertySurcharge([this.property], this.property.propertyId);
        },

        isAdditionalCost()
        {
            return (0,_helper_OrderPropertyHelper__WEBPACK_IMPORTED_MODULE_0__.isAdditionalCosts)(this.property);
        },

        isTaxless()
        {
            return !(0,_helper_OrderPropertyHelper__WEBPACK_IMPORTED_MODULE_0__.hasVat)(this.property) && App.useVariationOrderProperties;
        },

        showColon()
        {
            return this.property && this.property.property.value && this.property.property.valueType !== "empty";
        }
    }
});


/***/ }),

/***/ "./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_SetComponentItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SetComponentItem.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_SetComponentItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=template&id=6813ea08&":
/*!*********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=template&id=6813ea08& ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SetComponentItem_vue_vue_type_template_id_6813ea08___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SetComponentItem_vue_vue_type_template_id_6813ea08___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SetComponentItem_vue_vue_type_template_id_6813ea08___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SetComponentItem.vue?vue&type=template&id=6813ea08& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=template&id=6813ea08&");


/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyValueList.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786&":
/*!********************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786& ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueList_vue_vue_type_template_id_0f3f4786___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyValueList.vue?vue&type=template&id=0f3f4786& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786&");


/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyValueListItem.vue?vue&type=script&lang=js& */ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=script&lang=js&");
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e& ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   "staticRenderFns": function() { return /* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderPropertyValueListItem_vue_vue_type_template_id_905d838e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./OrderPropertyValueListItem.vue?vue&type=template&id=905d838e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=template&id=6813ea08&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/basket/list/SetComponentItem.vue?vue&type=template&id=6813ea08& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "d-flex mb-2" }, [
    _c("span", { staticClass: "text-muted" }, [
      _vm._v(_vm._s(_vm.quantity) + "x"),
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "image-container mx-1" },
      [
        _vm.itemImage
          ? _c("lazy-img", {
              attrs: {
                "picture-class": "d-block mw-100 mh-100",
                "image-url": _vm.itemImage,
                alt: _vm.altText,
                title: _vm.itemName,
              },
            })
          : _vm._e(),
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      [
        _c(
          "a",
          {
            staticClass:
              "item-name text-primary text-appearance font-weight-bold text-break",
            attrs: { href: _vm._f("itemURL")(_vm.variation) },
          },
          [_vm._v("\n            " + _vm._s(_vm.itemName) + "\n        ")]
        ),
        _vm._v(" "),
        _vm._l(_vm.variation.attributes, function (attribute) {
          return _c("div", { staticClass: "small" }, [
            _c("strong", [
              _vm._v(_vm._s(attribute.attribute.names.name) + ": "),
            ]),
            _vm._v(" "),
            _c("span", [_vm._v(_vm._s(attribute.value.names.name))]),
          ])
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "text-muted small" },
          [
            _vm._l(_vm.variation.variationProperties, function (propertyGroup) {
              return _vm._l(propertyGroup.properties, function (property) {
                return _c("div", [
                  propertyGroup.name
                    ? _c("strong", [_vm._v(_vm._s(propertyGroup.name) + ": ")])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("span", [_vm._v(_vm._s(property.names.name))]),
                  _vm._v(" "),
                  property.cast == "file"
                    ? _c("span", [
                        _c("a", {
                          attrs: {
                            href: _vm._f("propertyFileUrl")(
                              property.values.value
                            ),
                            target: "_blank",
                          },
                          domProps: {
                            innerHTML: _vm._s(property.values.value),
                          },
                        }),
                      ])
                    : _c("span", {
                        domProps: { innerHTML: _vm._s(property.values.value) },
                      }),
                ])
              })
            }),
          ],
          2
        ),
        _vm._v(" "),
        _c("order-property-value-list", {
          attrs: { "basket-item": _vm.mappedBasketItem },
        }),
      ],
      2
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueList.vue?vue&type=template&id=0f3f4786& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
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
  return _vm.shownProperties && _vm.shownProperties.length
    ? _c("div", { staticClass: "small" }, [
        _c("div", { staticClass: "font-weight-bold my-1" }, [
          _vm._v(
            _vm._s(_vm.$translate("Ceres::Template.basketAdditionalCosts")) +
              ":"
          ),
        ]),
        _vm._v(" "),
        _c(
          "ul",
          {
            staticClass: "ml-1 pl-3",
            attrs: { "data-testing": "order-property-list" },
          },
          _vm._l(_vm.shownProperties, function (property) {
            return _c("order-property-value-list-item", {
              key: property.propertyId,
              attrs: { property: property },
            })
          }),
          1
        ),
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/src/app/components/item/OrderPropertyValueListItem.vue?vue&type=template&id=905d838e& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
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
  return _c("li", [
    _c("span", { staticClass: "d-block" }, [
      _c(
        "strong",
        { class: { colon: _vm.showColon } },
        [
          _vm._v(
            "\n            " +
              _vm._s(_vm.property.property.names.name) +
              " \n            "
          ),
          _vm.surcharge > 0
            ? [
                _vm.isAdditionalCost || _vm.isTaxless
                  ? [
                      _vm._v(
                        "\n                    (" +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketPlusAbbr")
                          ) +
                          " " +
                          _vm._s(_vm._f("currency")(_vm.surcharge)) +
                          ")\n                "
                      ),
                    ]
                  : [
                      _vm._v(
                        "\n                    (" +
                          _vm._s(
                            _vm.$translate("Ceres::Template.basketIncludeAbbr")
                          ) +
                          " " +
                          _vm._s(_vm._f("currency")(_vm.surcharge)) +
                          ")\n                "
                      ),
                    ],
              ]
            : _vm._e(),
        ],
        2
      ),
      _vm._v(" "),
      _c("span", [
        _vm.property.property.valueType === "file"
          ? _c("span", [
              _c(
                "a",
                {
                  attrs: {
                    href: _vm._f("fileUploadPath")(_vm.property.property.value),
                    target: "_blank",
                  },
                },
                [
                  _c("i", {
                    staticClass: "fa fa-external-link",
                    attrs: { "aria-hidden": "true" },
                  }),
                  _vm._v(
                    "\n                    " +
                      _vm._s(_vm._f("fileName")(_vm.property.property.value)) +
                      "\n                "
                  ),
                ]
              ),
            ])
          : _vm.property.property.valueType !== "empty"
          ? _c("span", [_vm._v(_vm._s(_vm.property.property.value))])
          : _vm._e(),
      ]),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);
//# sourceMappingURL=ceres-18.js.map